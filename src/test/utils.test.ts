import { SortOrder } from "mongoose";
import { parseRangeFilter, parseSortFilter } from "../utils/utils";

describe('parseRangeFilter function', () => {
    it('should parse a single range value correctly', () => {
        const fieldName = 'testField';
        const value = 'gte:10';
        const expectedFilter = { [fieldName]: { $gte: 10 } };

        const result = parseRangeFilter(fieldName, value);

        expect(result).toEqual(expectedFilter);
    });

    it('should parse multiple range values correctly', () => {
        const fieldName = 'testField';
        const value = ['gte:10', 'lte:20'];
        const expectedFilter = { [fieldName]: { $gte: 10, $lte: 20 } };

        const result = parseRangeFilter(fieldName, value);

        expect(result).toEqual(expectedFilter);
    });

    it('should handle empty input and return an empty filter', () => {
        const fieldName = 'testField';
        const value: string[] = [];
        const expectedFilter: { [key: string]: { [key: string]: number } } = {};

        const result = parseRangeFilter(fieldName, value);

        expect(result).toEqual(expectedFilter);
    });

    it('should handle invalid input and return an empty filter', () => {
        const fieldName = 'testField';
        const value = 'invalidInput';
        const expectedFilter: { [key: string]: { [key: string]: number } } = {};

        const result = parseRangeFilter(fieldName, value);

        expect(result).toEqual(expectedFilter);
    });
});


describe('parseSortFilter function', () => {
    it('should parse sort value with descending order correctly', () => {
        const sortValue = 'fieldName,desc';
        const expectedSort = { fieldName: -1 };

        const result = parseSortFilter(sortValue);

        expect(result).toEqual(expectedSort);
    });

    it('should parse sort value with ascending order correctly', () => {
        const sortValue = 'fieldName,asc';
        const expectedSort = { fieldName: 1 };

        const result = parseSortFilter(sortValue);

        expect(result).toEqual(expectedSort);
    });

    it('should handle invalid sort order and default to ascending order', () => {
        const sortValue = 'fieldName,invalidOrder';
        const expectedSort = { fieldName: 1 };

        const result = parseSortFilter(sortValue);

        expect(result).toEqual(expectedSort);
    });

    it('should handle invalid input format and return default sort object', () => {
        const sortValue = 'invalidInputFormat';
        const expectedSort: { [key: string]: SortOrder } = { ['id']: 1 };

        const result = parseSortFilter(sortValue);

        expect(result).toEqual(expectedSort);
    });
});