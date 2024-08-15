import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

// normalizeURL() tests
test('normalizeURL: normalizes https URL', () => {
    const url = "https://test.example.com/path";
    const expected = "test.example.com/path";

    const result = normalizeURL(url);

    expect(result).toBe(expected);
});

test('normalizeURL: normalizes http URL', () => {
    const url = "http://test.example.com/path";
    const expected = "test.example.com/path";

    const result = normalizeURL(url);

    expect(result).toBe(expected);
});

test('normalizeURL: normalizes trailing slash', () => {
    const url = "http://test.example.com/path/";
    const expected = "test.example.com/path";

    const result = normalizeURL(url);

    expect(result).toBe(expected);
});

test('normalizeURL: normalizes URL with long pathname', () => {
    const url = "http://test.example.com/path/next/another";
    const expected = "test.example.com/path/next/another";

    const result = normalizeURL(url);

    expect(result).toBe(expected);
});

test('normalizeURL: normalizes URL with query string parameters', () => {
    const url = "http://test.example.com/path?this=that&another=yes";
    const expected = "test.example.com/path";

    const result = normalizeURL(url);

    expect(result).toBe(expected);
});

test('normalizeURL: normalizes URL with hash', () => {
    const url = "http://test.example.com/path#hash";
    const expected = "test.example.com/path";

    const result = normalizeURL(url);

    expect(result).toBe(expected);
});

test('normalizeURL: normalizes URL capitals', () => {
    const url = "http://TEST.example.com/path#hash";
    const expected = "test.example.com/path";

    const result = normalizeURL(url);

    expect(result).toBe(expected);
});

test('normalizeURL: throws error if URL is invalid', () => {
    const url = "///";

    expect(() => normalizeURL(url)).toThrow(Error);
});

// getURLsFromHTML() tests
test('getURLsFromHTML: retrieves URL from HTML', () => {
    const html = '<a href="https://example.test.com/">Example</a>';
    const baseURL = "https://example.test.com/"

    const expected = [
        "https://example.test.com/"
    ];

    const result = getURLsFromHTML(html, baseURL); 
    expect(result).toEqual(expected);
});

test('getURLsFromHTML: retrieves URL from HTML page', () => {
    const html = `
    <html>
        <head>
            <title>Test</title>
        </head>
        <body>
            <a href="https://example.test.com/">Example</a>
        </body>
    </html>`;
    const baseURL = "https://example.test.com/"

    const expected = [
        "https://example.test.com/"
    ];

    const result = getURLsFromHTML(html, baseURL); 
    expect(result).toEqual(expected);
});

test('getURLsFromHTML: retrieves URL list from HTML page', () => {
    const html = `
    <html>
        <head>
            <title>Test</title>
        </head>
        <body>
            <a href="https://example.test.com/">Example</a>
            <a href="https://example.test.com/next">Next</a>
            <a href="https://example.test.com/previous/">Previous</a>
        </body>
    </html>`;
    const baseURL = "https://example.test.com/"

    const expected = [
        "https://example.test.com/",
        "https://example.test.com/next",
        "https://example.test.com/previous/",
    ];

    const result = getURLsFromHTML(html, baseURL); 
    expect(result).toEqual(expected);
});

test('getURLsFromHTML: prepends base URL to relative URLs from HTML page', () => {
    const html = `
    <html>
        <head>
            <title>Test</title>
        </head>
        <body>
            <a href="/">Example</a>
            <a href="/next">Next</a>
            <a href="/previous/">Previous</a>
        </body>
    </html>`;
    const baseURL = "https://example.test.com"

    const expected = [
        "https://example.test.com/",
        "https://example.test.com/next",
        "https://example.test.com/previous/",
    ];

    const result = getURLsFromHTML(html, baseURL); 
    expect(result).toEqual(expected);
});

test('getURLsFromHTML: anchor tags with empty hrefs are excluded', () => {
    const html = `
        <head>
            <title>Test</title>
        </head>
        <body>
            <a href="">Example</a>
            <a href="/next">Next</a>
            <a href="/previous/">Previous</a>
        </body>
    </html>`;
    const baseURL = "https://example.test.com"

    const expected = [
        "https://example.test.com/",
        "https://example.test.com/next",
        "https://example.test.com/previous/",
    ];

    const result = getURLsFromHTML(html, baseURL); 
    expect(result).toEqual(expected);
});