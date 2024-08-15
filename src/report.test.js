import { test, expect } from "@jest/globals";
import { sortPages } from "./report";

// sortPages() tests
test("maintains single-page report", () => {
    const report = {
        'test.example.com': 10
    };
    const expected = [
        {
            url: 'test.example.com',
            count: 10
        }
    ];

    const result = sortPages(report);

    expect(result).toEqual(result);
});

test("maintains sorted report", () => {
    const report = {
        'test.example.com': 10,
        'test.example.com/foo': 20,
    };
    const expected = [
        {
            url: 'test.example.com',
            count: 10
        },
        {
            url: 'test.example.com/foo',
            count: 20
        },
    ];

    const result = sortPages(report);

    expect(result).toEqual(result);
});

test("sorts report", () => {
    const report = {
        'test.example.com': 1,
        'test.example.com/bar': 30,
        'test.example.com/foo': 10,
    };
    const expected = [
        {
            url: 'test.example.com/bar',
            count: 30
        },
        {
            url: 'test.example.com/foo',
            count: 10
        },
        {
            url: 'test.example.com',
            count: 1
        },
    ];

    const result = sortPages(report);

    expect(result).toEqual(result);
});