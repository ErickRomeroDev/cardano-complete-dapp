'use strict';
const __compactRuntime = require('@midnight-ntwrk/compact-runtime');
const expectedRuntimeVersionString = '0.7.0';
const expectedRuntimeVersion = expectedRuntimeVersionString.split('-')[0].split('.').map(Number);
const actualRuntimeVersion = __compactRuntime.versionString.split('-')[0].split('.').map(Number);
if (expectedRuntimeVersion[0] != actualRuntimeVersion[0]
     || (actualRuntimeVersion[0] == 0 && expectedRuntimeVersion[1] != actualRuntimeVersion[1])
     || expectedRuntimeVersion[1] > actualRuntimeVersion[1]
     || (expectedRuntimeVersion[1] == actualRuntimeVersion[1] && expectedRuntimeVersion[2] > actualRuntimeVersion[2]))
   throw new __compactRuntime.CompactError(`Version mismatch: compiled code expects ${expectedRuntimeVersionString}, runtime is ${__compactRuntime.versionString}`);
{ const MAX_FIELD = 102211695604070082112571065507755096754575920209623522239390234855480569854275933742834077002685857629445612735086326265689167708028928n;
  if (__compactRuntime.MAX_FIELD !== MAX_FIELD)
     throw new __compactRuntime.CompactError(`compiler thinks maximum field value is ${MAX_FIELD}; run time thinks it is ${__compactRuntime.MAX_FIELD}`)
}

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = new __compactRuntime.CompactTypeField();

class _MerkleTreeDigest_0 {
  alignment() {
    return _descriptor_1.alignment();
  }
  fromValue(value) {
    return {
      field: _descriptor_1.fromValue(value)
    }
  }
  toValue(value) {
    return _descriptor_1.toValue(value.field);
  }
}

const _descriptor_2 = new _MerkleTreeDigest_0();

const _descriptor_3 = new __compactRuntime.CompactTypeBoolean();

const _descriptor_4 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

class _MerkleTreePathEntry_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_3.alignment());
  }
  fromValue(value) {
    return {
      sibling: _descriptor_2.fromValue(value),
      goes_left: _descriptor_3.fromValue(value)
    }
  }
  toValue(value) {
    return _descriptor_2.toValue(value.sibling).concat(_descriptor_3.toValue(value.goes_left));
  }
}

const _descriptor_5 = new _MerkleTreePathEntry_0();

const _descriptor_6 = new __compactRuntime.CompactTypeVector(10, _descriptor_5);

class _MerkleTreePath_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_6.alignment());
  }
  fromValue(value) {
    return {
      leaf: _descriptor_0.fromValue(value),
      path: _descriptor_6.fromValue(value)
    }
  }
  toValue(value) {
    return _descriptor_0.toValue(value.leaf).concat(_descriptor_6.toValue(value.path));
  }
}

const _descriptor_7 = new _MerkleTreePath_0();

const _descriptor_8 = new __compactRuntime.CompactTypeVector(2, _descriptor_0);

const _descriptor_9 = new __compactRuntime.CompactTypeVector(2, _descriptor_1);

const _descriptor_10 = new __compactRuntime.CompactTypeBytes(6);

class _LeafPreimage_0 {
  alignment() {
    return _descriptor_10.alignment().concat(_descriptor_0.alignment());
  }
  fromValue(value) {
    return {
      domain_sep: _descriptor_10.fromValue(value),
      data: _descriptor_0.fromValue(value)
    }
  }
  toValue(value) {
    return _descriptor_10.toValue(value.domain_sep).concat(_descriptor_0.toValue(value.data));
  }
}

const _descriptor_11 = new _LeafPreimage_0();

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value) {
    return {
      bytes: _descriptor_0.fromValue(value)
    }
  }
  toValue(value) {
    return _descriptor_0.toValue(value.bytes);
  }
}

const _descriptor_12 = new _ContractAddress_0();

const _descriptor_13 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_14 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

class Contract {
  witnesses;
  constructor(...args) {
    if (args.length !== 1)
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args.length}`);
    const witnesses = args[0];
    if (typeof(witnesses) !== 'object')
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    if (typeof(witnesses.find_auth_path) !== 'function')
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named find_auth_path');
    if (typeof(witnesses.secret_key) !== 'function')
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named secret_key');
    this.witnesses = witnesses;
    this.circuits = {
      add_authority: (...args_0) => {
        if (args_0.length !== 2)
          throw new __compactRuntime.CompactError(`add_authority: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
        const contextOrig = args_0[0];
        const pk = args_0[1];
        if (!(typeof(contextOrig) === 'object' && contextOrig.originalState != undefined && contextOrig.transactionContext != undefined))
          __compactRuntime.type_error('add_authority',
                                      'argument 1 (as invoked from Typescript)',
                                      'src/bboard.compact line 12, char 1',
                                      'CircuitContext',
                                      contextOrig)
        if (!(pk.buffer instanceof ArrayBuffer && pk.BYTES_PER_ELEMENT === 1 && pk.length === 32))
          __compactRuntime.type_error('add_authority',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'src/bboard.compact line 12, char 1',
                                      'Bytes<32>',
                                      pk)
        const context = { ...contextOrig };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(pk),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result = this.#_add_authority_0(context, partialProofData, pk);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result, context: context, proofData: partialProofData };
      },
      increment1: (...args_0) => {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`increment1: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
        const contextOrig = args_0[0];
        if (!(typeof(contextOrig) === 'object' && contextOrig.originalState != undefined && contextOrig.transactionContext != undefined))
          __compactRuntime.type_error('increment1',
                                      'argument 1 (as invoked from Typescript)',
                                      'src/bboard.compact line 16, char 1',
                                      'CircuitContext',
                                      contextOrig)
        const context = { ...contextOrig };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result = this.#_increment1_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result, context: context, proofData: partialProofData };
      },
      increment2: (...args_0) => {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`increment2: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
        const contextOrig = args_0[0];
        if (!(typeof(contextOrig) === 'object' && contextOrig.originalState != undefined && contextOrig.transactionContext != undefined))
          __compactRuntime.type_error('increment2',
                                      'argument 1 (as invoked from Typescript)',
                                      'src/bboard.compact line 27, char 1',
                                      'CircuitContext',
                                      contextOrig)
        const context = { ...contextOrig };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result = this.#_increment2_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result, context: context, proofData: partialProofData };
      },
      increment3: (...args_0) => {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`increment3: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
        const contextOrig = args_0[0];
        if (!(typeof(contextOrig) === 'object' && contextOrig.originalState != undefined && contextOrig.transactionContext != undefined))
          __compactRuntime.type_error('increment3',
                                      'argument 1 (as invoked from Typescript)',
                                      'src/bboard.compact line 38, char 1',
                                      'CircuitContext',
                                      contextOrig)
        const context = { ...contextOrig };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result = this.#_increment3_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result, context: context, proofData: partialProofData };
      },
      public_key: (...args_0) => {
        if (args_0.length !== 2)
          throw new __compactRuntime.CompactError(`public_key: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
        const contextOrig = args_0[0];
        const sk = args_0[1];
        if (!(typeof(contextOrig) === 'object' && contextOrig.originalState != undefined && contextOrig.transactionContext != undefined))
          __compactRuntime.type_error('public_key',
                                      'argument 1 (as invoked from Typescript)',
                                      'src/bboard.compact line 49, char 1',
                                      'CircuitContext',
                                      contextOrig)
        if (!(sk.buffer instanceof ArrayBuffer && sk.BYTES_PER_ELEMENT === 1 && sk.length === 32))
          __compactRuntime.type_error('public_key',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'src/bboard.compact line 49, char 1',
                                      'Bytes<32>',
                                      sk)
        const context = { ...contextOrig };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(sk),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result = this.#_public_key_0(context, partialProofData, sk);
        partialProofData.output = { value: _descriptor_0.toValue(result), alignment: _descriptor_0.alignment() };
        return { result: result, context: context, proofData: partialProofData };
      },
      nullifier: (...args_0) => {
        if (args_0.length !== 2)
          throw new __compactRuntime.CompactError(`nullifier: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
        const contextOrig = args_0[0];
        const sk = args_0[1];
        if (!(typeof(contextOrig) === 'object' && contextOrig.originalState != undefined && contextOrig.transactionContext != undefined))
          __compactRuntime.type_error('nullifier',
                                      'argument 1 (as invoked from Typescript)',
                                      'src/bboard.compact line 53, char 1',
                                      'CircuitContext',
                                      contextOrig)
        if (!(sk.buffer instanceof ArrayBuffer && sk.BYTES_PER_ELEMENT === 1 && sk.length === 32))
          __compactRuntime.type_error('nullifier',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'src/bboard.compact line 53, char 1',
                                      'Bytes<32>',
                                      sk)
        const context = { ...contextOrig };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(sk),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result = this.#_nullifier_0(context, partialProofData, sk);
        partialProofData.output = { value: _descriptor_0.toValue(result), alignment: _descriptor_0.alignment() };
        return { result: result, context: context, proofData: partialProofData };
      }
    };
    this.impureCircuits = {
      add_authority: this.circuits.add_authority,
      increment1: this.circuits.increment1,
      increment2: this.circuits.increment2,
      increment3: this.circuits.increment3
    };
  }
  initialState(...args) {
    if (args.length !== 1)
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args.length}`);
    const constructorContext = args[0];
    if (typeof(constructorContext) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state = new __compactRuntime.ContractState();
    let stateValue = __compactRuntime.StateValue.newArray();
    stateValue = stateValue.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue = stateValue.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue = stateValue.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue = stateValue.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue = stateValue.arrayPush(__compactRuntime.StateValue.newNull());
    state.data = stateValue;
    state.setOperation('add_authority', new __compactRuntime.ContractOperation());
    state.setOperation('increment1', new __compactRuntime.ContractOperation());
    state.setOperation('increment2', new __compactRuntime.ContractOperation());
    state.setOperation('increment3', new __compactRuntime.ContractOperation());
    const context = {
      originalState: state,
      currentPrivateState: constructorContext.initialPrivateState,
      currentZswapLocalState: constructorContext.initialZswapLocalState,
      transactionContext: new __compactRuntime.QueryContext(state.data, __compactRuntime.dummyContractAddress())
    };
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(0n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newArray()
                                        .arrayPush(__compactRuntime.StateValue.newBoundedMerkleTree(
                                                     new __compactRuntime.StateBoundedMerkleTree(10)
                                                   )).arrayPush(__compactRuntime.StateValue.newCell({ value: _descriptor_13.toValue(0n),
                                                                                                      alignment: _descriptor_13.alignment() })).arrayPush(__compactRuntime.StateValue.newMap(
                                                                                                                                                            new __compactRuntime.StateMap()
                                                                                                                                                          ))
                                        .encode() } },
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }
                                    ] } },
                     { dup: { n: 2 } },
                     { idx: { cached: false,
                              pushPath: false,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }
                                    ] } },
                     'root',
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: true, n: 2 } },
                     { ins: { cached: false, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(1n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(2n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_13.toValue(0n),
                                                                            alignment: _descriptor_13.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(3n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_13.toValue(0n),
                                                                            alignment: _descriptor_13.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(4n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_13.toValue(0n),
                                                                            alignment: _descriptor_13.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }
                    ])
    state.data = context.transactionContext.state;
    return {
      currentContractState: state,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  #_transient_hash_0(context, partialProofData, value) {
    const result = __compactRuntime.transientHash(_descriptor_9, value);
    return result;
  }
  #_persistent_hash_0(context, partialProofData, value) {
    const result = __compactRuntime.persistentHash(_descriptor_11, value);
    return result;
  }
  #_persistent_hash_1(context, partialProofData, value) {
    const result = __compactRuntime.persistentHash(_descriptor_8, value);
    return result;
  }
  #_degrade_to_transient_0(context, partialProofData, x) {
    const result = __compactRuntime.degradeToTransient(x);
    return result;
  }
  #_merkle_tree_path_root_0(context, partialProofData, path) {
    return { field:
               this.#_folder_0(context,
                               partialProofData,
                               (...args) =>
                                 this.#_merkle_tree_path_entry_root_0(...args),
                               this.#_degrade_to_transient_0(context,
                                                             partialProofData,
                                                             this.#_persistent_hash_0(context,
                                                                                      partialProofData,
                                                                                      { domain_sep:
                                                                                          new Uint8Array([109, 100, 110, 58, 108, 104]),
                                                                                        data:
                                                                                          path.leaf })),
                               path.path) };
  }
  #_merkle_tree_path_entry_root_0(context,
                                  partialProofData,
                                  recursive_digest,
                                  entry)
  {
    const left = entry.goes_left? recursive_digest : entry.sibling.field;
    const right = entry.goes_left? entry.sibling.field : recursive_digest;
    return this.#_transient_hash_0(context, partialProofData, [left, right]);
  }
  #_find_auth_path_0(context, partialProofData, pk) {
    const witnessContext = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState, result] = this.witnesses.find_auth_path(witnessContext,
                                                                     pk);
    context.currentPrivateState = nextPrivateState;
    if (!(typeof(result) === 'object' && result.leaf.buffer instanceof ArrayBuffer && result.leaf.BYTES_PER_ELEMENT === 1 && result.leaf.length === 32 && Array.isArray(result.path) && result.path.length === 10 && result.path.every((t) => typeof(t) === 'object' && typeof(t.sibling) === 'object' && typeof(t.sibling.field) === 'bigint' && t.sibling.field >= 0 && t.sibling.field <= __compactRuntime.MAX_FIELD && typeof(t.goes_left) === 'boolean')))
      __compactRuntime.type_error('find_auth_path',
                                  'return value',
                                  'src/bboard.compact line 3, char 1',
                                  'struct MerkleTreePath<leaf: Bytes<32>, path: Vector<10, struct MerkleTreePathEntry<sibling: struct MerkleTreeDigest<field: Field>, goes_left: Boolean>>>',
                                  result)
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_7.toValue(result),
      alignment: _descriptor_7.alignment()
    });
    return result;
  }
  #_secret_key_0(context, partialProofData) {
    const witnessContext = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState, result] = this.witnesses.secret_key(witnessContext);
    context.currentPrivateState = nextPrivateState;
    if (!(result.buffer instanceof ArrayBuffer && result.BYTES_PER_ELEMENT === 1 && result.length === 32))
      __compactRuntime.type_error('secret_key',
                                  'return value',
                                  'src/bboard.compact line 4, char 1',
                                  'Bytes<32>',
                                  result)
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result),
      alignment: _descriptor_0.alignment()
    });
    return result;
  }
  #_add_authority_0(context, partialProofData, pk) {
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }
                                    ] } },
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }
                                    ] } },
                     { dup: { n: 2 } },
                     { idx: { cached: false,
                              pushPath: false,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }
                                    ] } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell(__compactRuntime.leafHash(
                                                                            { value: _descriptor_0.toValue(pk),
                                                                              alignment: _descriptor_0.alignment() }
                                                                          )).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } },
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }
                                    ] } },
                     { addi: { immediate: 1 } },
                     { ins: { cached: true, n: 1 } },
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }
                                    ] } },
                     { dup: { n: 2 } },
                     { idx: { cached: false,
                              pushPath: false,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }
                                    ] } },
                     'root',
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }
                    ]);
  }
  #_increment1_0(context, partialProofData) {
    const sk = this.#_secret_key_0(context, partialProofData);
    const auth_path = this.#_find_auth_path_0(context,
                                              partialProofData,
                                              this.#_public_key_0(context,
                                                                  partialProofData,
                                                                  sk));
    let tmp;
    __compactRuntime.assert((tmp = this.#_merkle_tree_path_root_0(context,
                                                                  partialProofData,
                                                                  auth_path),
                             _descriptor_3.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(0n),
                                                                                                 alignment: _descriptor_14.alignment() } }
                                                                                     ] } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(2n),
                                                                                                 alignment: _descriptor_14.alignment() } }
                                                                                     ] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp),
                                                                                                                             alignment: _descriptor_2.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }
                                                                     ]).value)),
                            'not authorized');
    const nul = this.#_nullifier_0(context, partialProofData, sk);
    __compactRuntime.assert(!_descriptor_3.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(1n),
                                                                                                 alignment: _descriptor_14.alignment() } }
                                                                                     ] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nul),
                                                                                                                             alignment: _descriptor_0.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }
                                                                     ]).value),
                            'already incremented');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nul),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    const tmp_0 = 1n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }
                                    ] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_4.toValue(tmp_0),
                                              alignment: _descriptor_4.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 1 } }
                    ]);
  }
  #_increment2_0(context, partialProofData) {
    const sk = this.#_secret_key_0(context, partialProofData);
    const auth_path = this.#_find_auth_path_0(context,
                                              partialProofData,
                                              this.#_public_key_0(context,
                                                                  partialProofData,
                                                                  sk));
    let tmp;
    __compactRuntime.assert((tmp = this.#_merkle_tree_path_root_0(context,
                                                                  partialProofData,
                                                                  auth_path),
                             _descriptor_3.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(0n),
                                                                                                 alignment: _descriptor_14.alignment() } }
                                                                                     ] } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(2n),
                                                                                                 alignment: _descriptor_14.alignment() } }
                                                                                     ] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp),
                                                                                                                             alignment: _descriptor_2.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }
                                                                     ]).value)),
                            'not authorized');
    const nul = this.#_nullifier_0(context, partialProofData, sk);
    __compactRuntime.assert(!_descriptor_3.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(1n),
                                                                                                 alignment: _descriptor_14.alignment() } }
                                                                                     ] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nul),
                                                                                                                             alignment: _descriptor_0.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }
                                                                     ]).value),
                            'already incremented');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nul),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    const tmp_0 = 1n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(3n),
                                                alignment: _descriptor_14.alignment() } }
                                    ] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_4.toValue(tmp_0),
                                              alignment: _descriptor_4.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 1 } }
                    ]);
  }
  #_increment3_0(context, partialProofData) {
    const sk = this.#_secret_key_0(context, partialProofData);
    const auth_path = this.#_find_auth_path_0(context,
                                              partialProofData,
                                              this.#_public_key_0(context,
                                                                  partialProofData,
                                                                  sk));
    let tmp;
    __compactRuntime.assert((tmp = this.#_merkle_tree_path_root_0(context,
                                                                  partialProofData,
                                                                  auth_path),
                             _descriptor_3.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(0n),
                                                                                                 alignment: _descriptor_14.alignment() } }
                                                                                     ] } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(2n),
                                                                                                 alignment: _descriptor_14.alignment() } }
                                                                                     ] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp),
                                                                                                                             alignment: _descriptor_2.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }
                                                                     ]).value)),
                            'not authorized');
    const nul = this.#_nullifier_0(context, partialProofData, sk);
    __compactRuntime.assert(!_descriptor_3.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(1n),
                                                                                                 alignment: _descriptor_14.alignment() } }
                                                                                     ] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nul),
                                                                                                                             alignment: _descriptor_0.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }
                                                                     ]).value),
                            'already incremented');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nul),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    const tmp_0 = 1n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(4n),
                                                alignment: _descriptor_14.alignment() } }
                                    ] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_4.toValue(tmp_0),
                                              alignment: _descriptor_4.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 1 } }
                    ]);
  }
  #_public_key_0(context, partialProofData, sk) {
    return this.#_persistent_hash_1(context,
                                    partialProofData,
                                    [new Uint8Array([99, 111, 109, 109, 105, 116, 109, 101, 110, 116, 45, 100, 111, 109, 97, 105, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                     sk]);
  }
  #_nullifier_0(context, partialProofData, sk) {
    return this.#_persistent_hash_1(context,
                                    partialProofData,
                                    [new Uint8Array([110, 117, 108, 108, 105, 102, 105, 101, 114, 45, 100, 111, 109, 97, 105, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                     sk]);
  }
  #_folder_0(context, partialProofData, f, x, a0)
  {
    for (let i = 0; i < 10; i++) x = f(context, partialProofData, x, a0[i]);
    return x;
  }
  static _query(context, partialProofData, prog) {
    var res;
    try {
      res = context.transactionContext.query(prog, __compactRuntime.CostModel.dummyCostModel());
    } catch (err) {
      throw new __compactRuntime.CompactError(err.toString());
    }
    context.transactionContext = res.context;
    var reads = res.events.filter((e) => e.tag === 'read');
    var i = 0;
    partialProofData.publicTranscript = partialProofData.publicTranscript.concat(prog.map((op) => {
      if(typeof(op) === 'object' && 'popeq' in op) {
        return { popeq: {
          ...op.popeq,
          result: reads[i++].content,
        } };
      } else {
        return op;
      }
    }));
    if(res.events.length == 1 && res.events[0].tag === 'read') {
      return res.events[0].content;
    } else {
      return res.events;
    }
  }
}
function ledger(state) {
  const context = {
    originalState: state,
    transactionContext: new __compactRuntime.QueryContext(state, __compactRuntime.dummyContractAddress())
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    authorizedCommitments: {
      isFull(...args) {
        if (args.length !== 0)
          throw new __compactRuntime.CompactError(`is_full: expected 0 arguments, received ${args.length}`);
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(0n),
                                                                                   alignment: _descriptor_14.alignment() } }
                                                                       ] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(1n),
                                                                                   alignment: _descriptor_14.alignment() } }
                                                                       ] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_13.toValue(1024n),
                                                                                                               alignment: _descriptor_13.alignment() }).encode() } },
                                                        'lt',
                                                        'neg',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }
                                                       ]).value);
      },
      checkRoot(...args) {
        if (args.length !== 1)
          throw new __compactRuntime.CompactError(`check_root: expected 1 argument, received ${args.length}`);
        const rt = args[0];
        if (!(typeof(rt) === 'object' && typeof(rt.field) === 'bigint' && rt.field >= 0 && rt.field <= __compactRuntime.MAX_FIELD))
          __compactRuntime.type_error('check_root',
                                      'argument 1',
                                      'src/bboard.compact line 6, char 1',
                                      'struct MerkleTreeDigest<field: Field>',
                                      rt)
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(0n),
                                                                                   alignment: _descriptor_14.alignment() } }
                                                                       ] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } }
                                                                       ] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(rt),
                                                                                                               alignment: _descriptor_2.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }
                                                       ]).value);
      },
      root(...args) {
        if (args.length !== 0)
          throw new __compactRuntime.CompactError(`root: expected 0 arguments, received ${args.length}`);
        const self = state.asArray()[0];
        return new __compactRuntime.CompactTypeMerkleTreeDigest().fromValue(self.asArray()[0].asBoundedMerkleTree().root());
      },
      firstFree(...args) {
        if (args.length !== 0)
          throw new __compactRuntime.CompactError(`first_free: expected 0 arguments, received ${args.length}`);
        const self = state.asArray()[0];
        return new __compactRuntime.CompactTypeField().fromValue(self.asArray()[1].asCell().value);
      },
      pathForLeaf(...args) {
        if (args.length !== 2)
          throw new __compactRuntime.CompactError(`path_for_leaf: expected 2 arguments, received ${args.length}`);
        const index = args[0];
        const leaf = args[1];
        if (!(typeof(index) === 'bigint' && index >= 0 && index <= __compactRuntime.MAX_FIELD))
          __compactRuntime.type_error('path_for_leaf',
                                      'argument 1',
                                      'src/bboard.compact line 6, char 1',
                                      'Field',
                                      index)
        if (!(leaf.buffer instanceof ArrayBuffer && leaf.BYTES_PER_ELEMENT === 1 && leaf.length === 32))
          __compactRuntime.type_error('path_for_leaf',
                                      'argument 2',
                                      'src/bboard.compact line 6, char 1',
                                      'Bytes<32>',
                                      leaf)
        const self = state.asArray()[0];
        return new __compactRuntime.CompactTypeMerkleTreePath(10, _descriptor_0).fromValue(  self.asArray()[0].asBoundedMerkleTree().pathForLeaf(    index,    {      value: _descriptor_0.toValue(leaf),      alignment: _descriptor_0.alignment()    }  ).value);
      },
      findPathForLeaf(...args) {
        if (args.length !== 1)
          throw new __compactRuntime.CompactError(`find_path_for_leaf: expected 1 argument, received ${args.length}`);
        const leaf = args[0];
        if (!(leaf.buffer instanceof ArrayBuffer && leaf.BYTES_PER_ELEMENT === 1 && leaf.length === 32))
          __compactRuntime.type_error('find_path_for_leaf',
                                      'argument 1',
                                      'src/bboard.compact line 6, char 1',
                                      'Bytes<32>',
                                      leaf)
        const self = state.asArray()[0];
        return ((result) => result             ? new __compactRuntime.CompactTypeMerkleTreePath(10, _descriptor_0).fromValue(result)             : undefined)(  self.asArray()[0].asBoundedMerkleTree().findPathForLeaf(    {      value: _descriptor_0.toValue(leaf),      alignment: _descriptor_0.alignment()    }  )?.value);
      },
      history(...args) {
        if (args.length !== 0)
          throw new __compactRuntime.CompactError(`history: expected 0 arguments, received ${args.length}`);
        const self = state.asArray()[0];
        return self.asArray()[2].asMap().keys().map(  (elem) => new __compactRuntime.CompactTypeMerkleTreeDigest().fromValue(elem.value))[Symbol.iterator]();
      }
    },
    authorizedNullifiers: {
      isEmpty(...args) {
        if (args.length !== 0)
          throw new __compactRuntime.CompactError(`is_empty: expected 0 arguments, received ${args.length}`);
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(1n),
                                                                                   alignment: _descriptor_14.alignment() } }
                                                                       ] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_13.toValue(0n),
                                                                                                               alignment: _descriptor_13.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }
                                                       ]).value);
      },
      size(...args) {
        if (args.length !== 0)
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args.length}`);
        return _descriptor_13.fromValue(Contract._query(context,
                                                        partialProofData,
                                                        [
                                                         { dup: { n: 0 } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(1n),
                                                                                    alignment: _descriptor_14.alignment() } }
                                                                        ] } },
                                                         'size',
                                                         { popeq: { cached: true,
                                                                    result: undefined } }
                                                        ]).value);
      },
      member(...args) {
        if (args.length !== 1)
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args.length}`);
        const elem = args[0];
        if (!(elem.buffer instanceof ArrayBuffer && elem.BYTES_PER_ELEMENT === 1 && elem.length === 32))
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'src/bboard.compact line 7, char 1',
                                      'Bytes<32>',
                                      elem)
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(1n),
                                                                                   alignment: _descriptor_14.alignment() } }
                                                                       ] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(elem),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }
                                                       ]).value);
      },
      [Symbol.iterator](...args) {
        if (args.length !== 0)
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args.length}`);
        const self = state.asArray()[1];
        return self.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    get restrictedCounter1() {
      return _descriptor_13.fromValue(Contract._query(context,
                                                      partialProofData,
                                                      [
                                                       { dup: { n: 0 } },
                                                       { idx: { cached: false,
                                                                pushPath: false,
                                                                path: [
                                                                       { tag: 'value',
                                                                         value: { value: _descriptor_14.toValue(2n),
                                                                                  alignment: _descriptor_14.alignment() } }
                                                                      ] } },
                                                       { popeq: { cached: true,
                                                                  result: undefined } }
                                                      ]).value);
    },
    get restrictedCounter2() {
      return _descriptor_13.fromValue(Contract._query(context,
                                                      partialProofData,
                                                      [
                                                       { dup: { n: 0 } },
                                                       { idx: { cached: false,
                                                                pushPath: false,
                                                                path: [
                                                                       { tag: 'value',
                                                                         value: { value: _descriptor_14.toValue(3n),
                                                                                  alignment: _descriptor_14.alignment() } }
                                                                      ] } },
                                                       { popeq: { cached: true,
                                                                  result: undefined } }
                                                      ]).value);
    },
    get restrictedCounter3() {
      return _descriptor_13.fromValue(Contract._query(context,
                                                      partialProofData,
                                                      [
                                                       { dup: { n: 0 } },
                                                       { idx: { cached: false,
                                                                pushPath: false,
                                                                path: [
                                                                       { tag: 'value',
                                                                         value: { value: _descriptor_14.toValue(4n),
                                                                                  alignment: _descriptor_14.alignment() } }
                                                                      ] } },
                                                       { popeq: { cached: true,
                                                                  result: undefined } }
                                                      ]).value);
    }
  };
}
const _emptyContext = {
  originalState: new __compactRuntime.ContractState(),
  transactionContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({
  find_auth_path: (...args) => undefined, secret_key: (...args) => undefined
});
const pureCircuits = {
  public_key: (...args) => _dummyContract.circuits.public_key(_emptyContext, ...args).result,
  nullifier: (...args_0) => _dummyContract.circuits.nullifier(_emptyContext, ...args_0).result
};
const contractReferenceLocations = { tag: 'publicLedgerArray', indices: { } };
exports.Contract = Contract;
exports.ledger = ledger;
exports.pureCircuits = pureCircuits;
exports.contractReferenceLocations = contractReferenceLocations;
//# sourceMappingURL=index.cjs.map
