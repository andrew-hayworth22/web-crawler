import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl";

test('normalizes https URL', () => {
    const url = "https://test.example.com/path";
    const expected = "test.example.com/path";

    const result = normalizeURL(url);

    expect(result).toBe(expected);
});

test('normalizes http URL', () => {
    const url = "http://test.example.com/path";
    const expected = "test.example.com/path";

    const result = normalizeURL(url);

    expect(result).toBe(expected);
});

test('normalizes trailing slash', () => {
    const url = "http://test.example.com/path/";
    const expected = "test.example.com/path";

    const result = normalizeURL(url);

    expect(result).toBe(expected);
});

test('normalizes URL with long pathname', () => {
    const url = "http://test.example.com/path/next/another";
    const expected = "test.example.com/path/next/another";

    const result = normalizeURL(url);

    expect(result).toBe(expected);
});

test('normalizes URL with query string parameters', () => {
    const url = "http://test.example.com/path?this=that&another=yes";
    const expected = "test.example.com/path";

    const result = normalizeURL(url);

    expect(result).toBe(expected);
});

test('normalizes URL with hash', () => {
    const url = "http://test.example.com/path#hash";
    const expected = "test.example.com/path";

    const result = normalizeURL(url);

    expect(result).toBe(expected);
});

test('throws error if URL is invalid', () => {
    const url = "///";

    expect(() => normalizeURL(url)).toThrow(Error);
});