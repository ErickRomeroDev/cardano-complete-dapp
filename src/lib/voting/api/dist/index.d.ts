import { type ContractAddress } from '@midnight-ntwrk/compact-runtime';
import { type Logger } from 'pino';
import type { BBoardDerivedState, BBoardProviders, DeployedBBoardContract } from './common-types.js';
import { type Observable } from 'rxjs';
export interface DeployedBBoardAPI {
    readonly deployedContractAddress: ContractAddress;
    readonly state$: Observable<BBoardDerivedState>;
    add_authority: (pk: Uint8Array) => Promise<void>;
    increment1: () => Promise<void>;
    increment2: () => Promise<void>;
    increment3: () => Promise<void>;
}
export declare class BBoardAPI implements DeployedBBoardAPI {
    readonly deployedContract: DeployedBBoardContract;
    private readonly logger?;
    /** @internal */
    private constructor();
    readonly deployedContractAddress: ContractAddress;
    readonly state$: Observable<BBoardDerivedState>;
    add_authority(pk: Uint8Array): Promise<void>;
    increment1(): Promise<void>;
    increment2(): Promise<void>;
    increment3(): Promise<void>;
    static deploy(providers: BBoardProviders, logger?: Logger): Promise<BBoardAPI>;
    static join(providers: BBoardProviders, contractAddress: ContractAddress, logger?: Logger): Promise<BBoardAPI>;
    private static getPrivateState;
}
export * as utils from './utils/index.js';
export * from './common-types.js';
