import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<T> = {
  find_auth_path(context: __compactRuntime.WitnessContext<Ledger, T>,
                 pk: Uint8Array): [T, { leaf: Uint8Array,
                                        path: { sibling: { field: bigint },
                                                goes_left: boolean
                                              }[]
                                      }];
  secret_key(context: __compactRuntime.WitnessContext<Ledger, T>): [T, Uint8Array];
}

export type ImpureCircuits<T> = {
  add_authority(context: __compactRuntime.CircuitContext<T>, pk: Uint8Array): __compactRuntime.CircuitResults<T, void>;
  increment1(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, void>;
  increment2(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, void>;
  increment3(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, void>;
}

export type PureCircuits = {
  public_key(sk: Uint8Array): Uint8Array;
  nullifier(sk: Uint8Array): Uint8Array;
}

export type Circuits<T> = {
  add_authority(context: __compactRuntime.CircuitContext<T>, pk: Uint8Array): __compactRuntime.CircuitResults<T, void>;
  increment1(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, void>;
  increment2(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, void>;
  increment3(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, void>;
  public_key(context: __compactRuntime.CircuitContext<T>, sk: Uint8Array): __compactRuntime.CircuitResults<T, Uint8Array>;
  nullifier(context: __compactRuntime.CircuitContext<T>, sk: Uint8Array): __compactRuntime.CircuitResults<T, Uint8Array>;
}

export type Ledger = {
  authorizedCommitments: {
    isFull(): boolean;
    checkRoot(rt: { field: bigint }): boolean;
    root(): __compactRuntime.MerkleTreeDigest;
    firstFree(): bigint;
    pathForLeaf(index: bigint, leaf: Uint8Array): __compactRuntime.MerkleTreePath<Uint8Array>;
    findPathForLeaf(leaf: Uint8Array): __compactRuntime.MerkleTreePath<Uint8Array> | undefined;
    history(): Iterator<__compactRuntime.MerkleTreeDigest>
  };
  authorizedNullifiers: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  readonly restrictedCounter1: bigint;
  readonly restrictedCounter2: bigint;
  readonly restrictedCounter3: bigint;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
