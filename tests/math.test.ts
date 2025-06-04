import { describe, it, expect } from "vitest";
import { add, multiply, reverseString } from "../src/utils/math";

describe("数学関数のテスト", () => {
  it("add関数は2つの数値を正しく足し算する", () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, 1)).toBe(0);
    expect(add(5, 5)).toBe(10);
  });

  it("multiply関数は2つの数値を正しく掛け算する", () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(0, 5)).toBe(0);
    expect(multiply(-2, 3)).toBe(-6);
  });
});

describe("文字列関数のテスト", () => {
  it("reverseString関数は文字列を正しく逆順にする", () => {
    expect(reverseString("hello")).toBe("olleh");
    expect(reverseString("typescript")).toBe("tpircsepyt");
    expect(reverseString("")).toBe("");
  });
});
