export function printReport(pages) {
    const sortedPages = sortPages(pages);

    console.log("------------- REPORT ---------------")
    for (const page of sortedPages) {
        console.log(`Found ${page.count} internal links to ${page.url}`)
    }
    console.log("------------------------------------")
}

export function sortPages(pages) {
    const pageArray = [];
    for (const key in pages) {
        pageArray.push({
            url: key,
            count: pages[key]
        });
    }

    pageArray.sort(function(a, b) {
        return b.count - a.count;
    });

    return pageArray;
}