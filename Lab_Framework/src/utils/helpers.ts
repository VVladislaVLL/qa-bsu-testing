import fs from 'fs/promises';

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

const getFilePath = (env: string) => (`./resources/${env}.properties`);

export async function getData(env: string) {
    const data = await fs.readFile(`${getFilePath(env)}`, 'utf-8');
    return data
        .replace(/\r\n/g, '\n')
        .split('\n')
        .reduce((acc: { [key: string]: string }, prop: string) => {
            const [key, value] = prop.split('=');
            acc[key] = value;
            return acc;
        }, {});
}