export const randomBytes = (length) => {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return bytes;
};
export * from './conversion-utils.js';
//# sourceMappingURL=index.js.map