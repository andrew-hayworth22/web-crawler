import { argv } from 'node:process';
import { crawlPage } from './crawl.js';
import { printReport } from './report.js';

async function main() {
    if (argv.length != 3) {
        console.error("Incorrect number of arguments: Please provide the base URL you would like to crawl");
        return;
    }

    const baseURL = argv[2];
    console.log(`Starting to crawl ${baseURL}`);
    const pages = await crawlPage(baseURL, baseURL);
    printReport(pages);
}

await main();