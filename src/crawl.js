import { JSDOM } from 'jsdom'

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

export function getURLsFromHTML(html, baseURL) {
    const result = [];
    const dom = new JSDOM(html);
    const anchorTags = dom.window.document.querySelectorAll('a');

    for (const tag of anchorTags) {
        if(tag.hasAttribute('href')) {
            let href = tag.href;
            
            try {
                href = new URL(href, baseURL).href;
                result.push(href);
            } catch (error) {
                console.log(`${error.message}: ${href}`);
            }
        }
    }

    return result
}

export async function crawlPage(baseURL, currentURL, pages = {}) {
    const currentURLObj = new URL(currentURL);
    const baseURLObj = new URL(baseURL);

    if(currentURLObj.hostname !== baseURLObj.hostname) {
        return pages;
    }

    const normalizedCurrentURL = normalizeURL(currentURL);

    if (pages[normalizedCurrentURL]) {
        pages[normalizedCurrentURL]++;
        return pages;
    }

    const currentPage = await fetchPage(currentURL);
    if (!currentPage) {
        return pages
    }

    console.log(`Visited ${currentURL}...`);
    pages[normalizedCurrentURL] = 1;

    const links = getURLsFromHTML(currentPage, baseURL);
    for (const link of links) {
        pages = await crawlPage(baseURL, link, pages);
    }

    return pages
}

async function fetchPage(url) {
    try {
        const response = await fetch(url);
        if (response.status >= 400) {
            throw new Error(`Error code ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('text/html')) {
            throw new Error(`Response content-type is ${contentType}`)
        }

        const body = await response.text();

        return body;
    } catch (error) {
        console.log(`${error}: ${url}`)
        return null
    }
}