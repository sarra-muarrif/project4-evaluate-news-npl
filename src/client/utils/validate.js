var validUrl = require('valid-url');
function isURLValid(inputURL) {
    if (validUrl.isUri(inputURL)) {
        console.log('Looks like an URI');
    } else {
        console.log('Not a URI');
    }
}
export { isURLValid }