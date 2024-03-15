/**
 * Checks if a value is empty.
 * @param {*} value - The value to be checked.
 * @returns {boolean} Returns true if the value is empty, otherwise false.
 */
export default function isEmpty(value) {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    )
}