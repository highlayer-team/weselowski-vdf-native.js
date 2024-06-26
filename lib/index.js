const vdf = require('../build/Release/weselowski_vdf_bindings');

/**
 * Generates a Verifiable Delay Function (VDF) output based on the given input. 
 * 
 * @async
 * @param {string} input
 * @param {number} iterations The number of iterations the VDF should perform.
 * @param {number} intSizeBits The size of the integers used in the VDF computation, in bits.
 * @returns {Promise<string>} A promise that resolves with a string containing the VDF output
 * @example
 * // Example usage of generateVDF
 * generateVDF('initialInput', 1000, 2048).then(vdfOutput => {
 *   console.log(vdfOutput);
 * });
 */
async function generateVDF(input, iterations, intSizeBits) {
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string.');
    }

    if (!Number.isInteger(iterations) || iterations <= 0) {
        throw new TypeError('Iterations must be a positive integer.');
    }

    if (!Number.isInteger(intSizeBits) || intSizeBits < 128 || intSizeBits > 4096) {
        throw new TypeError('intSizeBits must be an integer between 128 and 4096.');
    }

    return Buffer.from(await vdf.generateVDF(input, iterations, intSizeBits),"hex")
}

/**
 * Verifies the output of a Verifiable Delay Function (VDF) against a given input and parameters.
 *
 * @param {string} input The initial input value for the VDF that was used to generate the output. This should match the input used during the VDF generation phase.
 * @param {Buffer} vdfOutput The VDF output (Buffer) that needs to be verified
 * @param {number} iterations The number of iterations that were specified when generating the VDF output.
 * @param {number} intSizeBits The size of the integers, in bits, used in the VDF computation
 * @returns {boolean} Returns `true` if the VDF output is verified to be correct based on the input parameters
 * @example
 * // Example usage of verifyVDF
 * const input = 'initialInput';
 * const iterations = 1000;
 * const intSizeBits = 2048;
 * const vdfOutput = ""
 * const isValid = verifyVDF(input, iterations, intSizeBits, vdfOutput);
 * console.log(isValid ? 'VDF output is valid.' : 'VDF output is invalid.');
 */
async function verifyVDF(input, iterations, intSizeBits,vdfOutput) {
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string.');
    }

    if (!Buffer.isBuffer(vdfOutput)) {
        throw new TypeError('vdfOutput must be a Buffer.');
    }

    if (!Number.isInteger(iterations) || iterations <= 0) {
        throw new TypeError('Iterations must be a positive integer.');
    }

    if (!Number.isInteger(intSizeBits) || intSizeBits < 128 || intSizeBits > 4096) {
        throw new TypeError('intSizeBits must be an integer between 128 and 4096.');
    }
    if(vdfOutput.byteLength!=516){
        return false // VDF result always should be 516 bytes
    }

    return await vdf.verifyVDF(input, vdfOutput.toString("hex"), iterations, intSizeBits)
}


module.exports = {generateVDF, verifyVDF}