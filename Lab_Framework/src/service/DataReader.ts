import {getData} from '../utils/helpers';

export class DataReader {
    public static async read(key: string) {
        return await getData(global.ENV).then(data => data[key]);
    }
}