import {Order} from '../model/Order';
import {DataReader} from './DataReader';

export class OrderCreator {
    private static readonly departurePoint: string = 'order.departurePoint';
    private static readonly destinationPoint: string = 'order.destinationPoint';

    public static async getOder(): Promise<Order> {
        return new Order(
            await DataReader.read(OrderCreator.departurePoint),
            await DataReader.read(OrderCreator.destinationPoint)
        );
    }
}
