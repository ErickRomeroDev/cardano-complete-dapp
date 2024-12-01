export const createBBoardPrivateState = (secretKey) => ({
    secretKey,
});
export const witnesses = {
    secret_key: ({ privateState }) => [
        privateState,
        privateState.secretKey,
    ],
    find_auth_path: ({ privateState, ledger }, pk) => [privateState, ledger.authorizedCommitments.findPathForLeaf(pk)],
};
//# sourceMappingURL=witnesses.js.map