import { describe, expect, it } from 'vitest';
import { filterByCondition } from './../src/test1';

describe('filterByCondition function', () => {
  it('should filter objects with a specific key-value pair', () => {
    const input = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 25 },
    ];
    const condition = { age: 25 };
    const expectedOutput = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 3, name: 'Charlie', age: 25 },
    ];
    expect(filterByCondition(input, condition)).toEqual(expectedOutput);
  });

  it('should return an empty array if no objects match the condition', () => {
    const input = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
    ];
    const condition = { age: 40 };
    const expectedOutput: typeof input = [];
    expect(filterByCondition(input, condition)).toEqual(expectedOutput);
  });

  it('should throw an error for invalid input', () => {
    const input = null;
    const condition = { age: 25 };
    expect(() => filterByCondition(input, condition)).toThrow();
  });

  it('should handle nested object structures', () => {
    const input = [
      { id: 1, details: { age: 25 } },
      { id: 2, details: { age: 30 } },
      { id: 3, details: { age: 25 } },
    ];
    const condition = { details: { age: 25 } };
    const expectedOutput = [
      { id: 1, details: { age: 25 } },
      { id: 3, details: { age: 25 } },
    ];
    expect(filterByCondition(input, condition)).toEqual(expectedOutput);
  });
});
