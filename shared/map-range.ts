
/**
 * Map a value in a certain range to another given range
 * @param {number} value Value to map
 * @param {number} a Range 1 from
 * @param {number} b Range 1 until
 * @param {number} c Range 2 from
 * @param {number} d Range 2 until
 */

export function mapRange(value: number, a: number, b: number, c: number, d: number) {
    value = (value - a) / (b - a);
    return c + value * (d - c);
}