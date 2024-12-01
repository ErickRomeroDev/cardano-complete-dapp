import { type DeployedBBoardAPI, BBoardAPI, type BBoardProviders } from "./api";
import { type ContractAddress } from "@midnight-ntwrk/compact-runtime";
import {
  BehaviorSubject,
  type Observable,
  concatMap,
  filter,
  firstValueFrom,
  interval,
  map,
  of,
  take,
  tap,
  throwError,
  timeout,
  catchError,
} from "rxjs";
import { pipe as fnPipe } from "fp-ts/function";
import {
  type DAppConnectorAPI,
  type DAppConnectorWalletAPI,
  type ServiceUriConfig,
} from "@midnight-ntwrk/dapp-connector-api";
import { FetchZkConfigProvider } from "@midnight-ntwrk/midnight-js-fetch-zk-config-provider";
import { httpClientProofProvider } from "@midnight-ntwrk/midnight-js-http-client-proof-provider";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import {
  type BalancedTransaction,
  type UnbalancedTransaction,
  createBalancedTx,
} from "@midnight-ntwrk/midnight-js-types";
import {
  type CoinInfo,
  Transaction,
  type TransactionId,
} from "@midnight-ntwrk/ledger";
import { Transaction as ZswapTransaction } from "@midnight-ntwrk/zswap";
import semver from "semver";
import {
  getLedgerNetworkId,
  getZswapNetworkId,
} from "@midnight-ntwrk/midnight-js-network-id";

export interface InProgressBoardDeployment {
  readonly status: "in-progress";
}

export interface DeployedBoardDeployment {
  readonly status: "deployed"; 
  readonly api: DeployedBBoardAPI;
}

export interface FailedBoardDeployment {
  readonly status: "failed";
  readonly error: Error;
}

export type BoardDeployment =
  | InProgressBoardDeployment
  | DeployedBoardDeployment
  | FailedBoardDeployment;

export interface DeployedBoardAPIProvider {  
  readonly boardDeployments$: Observable<BoardDeployment>;
 
  readonly resolve: (
    contractAddress?: ContractAddress,    
  ) => Promise<Observable<BoardDeployment>>;
}

export class BrowserDeployedBoardManager implements DeployedBoardAPIProvider {
  boardDeployments$: BehaviorSubject<BoardDeployment>;
  #initializedProviders: Promise<BBoardProviders> | undefined;

  constructor() {
    this.boardDeployments$ = new BehaviorSubject<BoardDeployment>({
      status: "in-progress",
    });
  }

  /** @inheritdoc */
  async resolve(contractAddress?: ContractAddress) {
    if (contractAddress) {
      return await this.joinDeployment(this.boardDeployments$, contractAddress);
    } else {
      return await this.deployDeployment(this.boardDeployments$);
    } 
  }

  private getProviders(): Promise<BBoardProviders> {
    return (
      this.#initializedProviders ??
      (this.#initializedProviders = initializeProviders())
    );
  }

  private async deployDeployment(
    deployment: BehaviorSubject<BoardDeployment>    
  ): Promise<Observable<BoardDeployment>> {
    try {
      const providers = await this.getProviders();
      const api = await BBoardAPI.deploy(providers);

      deployment.next({
        status: "deployed",
        api,
      });
      return deployment;
    } catch (error: unknown) {
      deployment.next({
        status: "failed",
        error: error instanceof Error ? error : new Error(String(error)),
      });
      return deployment;
    }
  }

  private async joinDeployment(
    deployment: BehaviorSubject<BoardDeployment>,
    contractAddress: ContractAddress
  ): Promise<Observable<BoardDeployment>> {
    try {
      const providers = await this.getProviders();
      const api = await BBoardAPI.join(providers, contractAddress);

      deployment.next({
        status: "deployed",
        api,
      });
      return deployment;
    } catch (error: unknown) {
      deployment.next({
        status: "failed",
        error: error instanceof Error ? error : new Error(String(error)),
      });
      return deployment;
    }
  }
}

/** @internal */
const initializeProviders = async (): Promise<BBoardProviders> => {
  const { levelPrivateStateProvider } = await import(
    "@midnight-ntwrk/midnight-js-level-private-state-provider"
  );  

  const { wallet, uris } = await connectToWallet();
  const walletState = await wallet.state();

  return {
    privateStateProvider: levelPrivateStateProvider({
      privateStateStoreName: "bboard-private-state2",
    }),
    zkConfigProvider: new FetchZkConfigProvider(
      window.location.origin,
      fetch.bind(window)
    ),
    proofProvider: httpClientProofProvider(uris.proverServerUri),
    publicDataProvider: indexerPublicDataProvider(
      uris.indexerUri,
      uris.indexerWsUri
    ),
    walletProvider: {
      coinPublicKey: walletState.coinPublicKey,
      balanceTx(
        tx: UnbalancedTransaction,
        newCoins: CoinInfo[]
      ): Promise<BalancedTransaction> {
        return wallet
          .balanceTransaction(
            ZswapTransaction.deserialize(
              tx.serialize(getLedgerNetworkId()),
              getZswapNetworkId()
            ),
            newCoins
          )
          .then((tx) => wallet.proveTransaction(tx))
          .then((zswapTx) =>
            Transaction.deserialize(
              zswapTx.serialize(getZswapNetworkId()),
              getLedgerNetworkId()
            )
          )
          .then(createBalancedTx);
      },
    },
    midnightProvider: {
      submitTx(tx: BalancedTransaction): Promise<TransactionId> {
        return wallet.submitTransaction(tx);
      },
    },
  };
};

/** @internal */
const connectToWallet = (): Promise<{
  wallet: DAppConnectorWalletAPI;
  uris: ServiceUriConfig;
}> => {
  const COMPATIBLE_CONNECTOR_API_VERSION = "1.x";

  return firstValueFrom(
    fnPipe(
      interval(100),
      map(() => window.midnight?.mnLace),
      tap((connectorAPI) => {}),
      filter(
        (connectorAPI): connectorAPI is DAppConnectorAPI => !!connectorAPI
      ),
      concatMap((connectorAPI) =>
        semver.satisfies(
          connectorAPI.apiVersion,
          COMPATIBLE_CONNECTOR_API_VERSION
        )
          ? of(connectorAPI)
          : throwError(() => {
              return new Error(
                `Incompatible version of Midnight Lace wallet found. Require '${COMPATIBLE_CONNECTOR_API_VERSION}', got '${connectorAPI.apiVersion}'.`
              );
            })
      ),
      tap((connectorAPI) => {}),
      take(1),
      timeout({
        first: 1_000,
        with: () =>
          throwError(() => {
            return new Error(
              "Could not find Midnight Lace wallet. Extension installed?"
            );
          }),
      }),
      concatMap(async (connectorAPI) => {
        const isEnabled = await connectorAPI.isEnabled();

        return connectorAPI;
      }),
      timeout({
        first: 5_000,
        with: () =>
          throwError(() => {
            return new Error(
              "Midnight Lace wallet has failed to respond. Extension enabled?"
            );
          }),
      }),
      concatMap(async (connectorAPI) => ({
        walletConnectorAPI: await connectorAPI.enable(),
        connectorAPI,
      })),
      catchError((error, apis) =>
        error
          ? throwError(() => {
              return new Error("Application is not authorized");
            })
          : apis
      ),
      concatMap(async ({ walletConnectorAPI, connectorAPI }) => {
        const uris = await connectorAPI.serviceUriConfig();

        return { wallet: walletConnectorAPI, uris };
      })
    )
  );
};
