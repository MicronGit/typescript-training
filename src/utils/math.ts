/**
 * 二つの数値を足し算する関数
 * @param a 最初の数値
 * @param b 二つ目の数値
 * @returns 二つの数値の合計
 */
export function add(a: number, b: number): number {
  return a + b;
}

/**
 * 二つの数値を掛け算する関数
 * @param a 最初の数値
 * @param b 二つ目の数値
 * @returns 二つの数値の積
 */
export function multiply(a: number, b: number): number {
  return a * b;
}

/**
 * 文字列を逆順にする関数
 * @param str 入力文字列
 * @returns 逆順にした文字列
 */
export function reverseString(str: string): string {
  return str.split('').reverse().join('');
}
