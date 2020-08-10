/**
 * Checks if the given URL object belongs to the home route `/`.
 *
 * @param {URL} url
 *
 * @returns {boolean}
 */
export const isHomeRoute = url => url.pathname === '/';

export const isPage = url => {
    if (url.pathname === '/graphql') {
        return false;
    }
    const urlParts = url.pathname.split('/');
    const [lastItem] = urlParts.slice(-1);
    return lastItem.indexOf('.') === -1 || new RegExp('.html$').test(url.pathname);
}

/**
 * Checks if the given URL object belongs to the home route `/`
 * or has a `.html` extension or is a page without file extension
 *
 * @param {URL} url
 *
 * @returns {boolean}
 */
export const isHTMLRoute = url => {
    const result = isHomeRoute(url) || isPage(url);
    window.console.warn(url + ' isHTMLRoute ' + result);
    return result;
}

