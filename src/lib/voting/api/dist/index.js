import { Contract, createBBoardPrivateState, ledger, pureCircuits, witnesses, } from '@midnight-ntwrk/bboard-contract';
import * as utils from './utils/index.js';
import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { combineLatest, map, from } from 'rxjs';
const bboardContractInstance = new Contract(witnesses);
export class BBoardAPI {
    deployedContract;
    logger;
    /** @internal */
    constructor(deployedContract, providers, logger) {
        this.deployedContract = deployedContract;
        this.logger = logger;
        this.deployedContractAddress = deployedContract.deployTxData.public.contractAddress;
        this.state$ = combineLatest([
            // Combine public (ledger) state with...
            providers.publicDataProvider
                .contractStateObservable(this.deployedContractAddress, { type: 'latest' })
                .pipe(map((contractState) => ledger(contractState.data))),
            from(providers.privateStateProvider.get('bboardPrivateState')),
        ], (ledgerState, privateState) => {
            const hashedSecretKey = pureCircuits.public_key(privateState.secretKey);
            const nullifySecretKey = pureCircuits.nullifier(privateState.secretKey);
            return {
                restrictedCounter1: ledgerState.restrictedCounter1,
                restrictedCounter2: ledgerState.restrictedCounter2,
                restrictedCounter3: ledgerState.restrictedCounter3,
            };
        });
    }
    deployedContractAddress;
    state$;
    async add_authority(pk) {
        const txData = await this.deployedContract.callTx.add_authority(pk);
    }
    async increment1() {
        const txData = await this.deployedContract.callTx.increment1();
    }
    async increment2() {
        const txData = await this.deployedContract.callTx.increment2();
    }
    async increment3() {
        const txData = await this.deployedContract.callTx.increment3();
    }
    static async deploy(providers, logger) {
        logger?.info('deployContract');
        const deployedBBoardContract = await deployContract(providers, {
            privateStateKey: 'bboardPrivateState',
            contract: bboardContractInstance,
            initialPrivateState: await BBoardAPI.getPrivateState(providers),
        });
        logger?.trace({
            contractDeployed: {
                finalizedDeployTxData: deployedBBoardContract.deployTxData.public,
            },
        });
        return new BBoardAPI(deployedBBoardContract, providers, logger);
    }
    static async join(providers, contractAddress, logger) {
        logger?.info({
            joinContract: {
                contractAddress,
            },
        });
        const deployedBBoardContract = await findDeployedContract(providers, {
            contractAddress,
            contract: bboardContractInstance,
            privateStateKey: 'bboardPrivateState',
            initialPrivateState: await BBoardAPI.getPrivateState(providers),
        });
        logger?.trace({
            contractJoined: {
                finalizedDeployTxData: deployedBBoardContract.deployTxData.public,
            },
        });
        return new BBoardAPI(deployedBBoardContract, providers, logger);
    }
    static async getPrivateState(providers) {
        const existingPrivateState = await providers.privateStateProvider.get('bboardPrivateState');
        return existingPrivateState ?? createBBoardPrivateState(utils.randomBytes(32));
    }
}
export * as utils from './utils/index.js';
export * from './common-types.js';
//# sourceMappingURL=index.js.map