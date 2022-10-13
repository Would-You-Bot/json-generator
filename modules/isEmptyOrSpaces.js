export default function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}