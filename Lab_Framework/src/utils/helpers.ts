export function isArraySorted<T>(array: T[]): boolean {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            return false
        }
    }
    return true;
}

export function transformPriceToNumber(prices: string[]): number[] {
    return prices.map(price => parseInt(price.match(/\d+/)[0]));
}