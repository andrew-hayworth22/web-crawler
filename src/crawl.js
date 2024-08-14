
export function normalizeURL(url) {
    try {
        const urlObj = new URL(url);

        let pathname = urlObj.pathname;
        if (pathname[pathname.length-1] === '/') {
            pathname = pathname.substring(0, pathname.length-1);
        }

        return urlObj.hostname + pathname;
    } catch (error) {
        throw new Error("Invalid URL");
    }
}