
/**
 * @param {string} str 
 * @returns {string}
 */
export function escapeCLI(str) {
    if (process.platform === 'win32') {
        return escapePowershell(str);
    }
    return str;
}

/**
 * @param {string} str 
 * @returns {string}
 */
export function escapePowershell(str) {
    str = str.replace("'", "''");
    return `'${str}'`;
}