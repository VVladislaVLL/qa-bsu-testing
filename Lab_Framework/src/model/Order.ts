export class Order {
    private _departurePoint: string;
    private _destinationPoint: string;
    private _departureDate: Date = new Date();

    constructor(departurePoint: string, destinationPoint: string) {
        this._departurePoint = departurePoint;
        this._destinationPoint = destinationPoint;
    }

    get departurePoint(): string {
        return this._departurePoint;
    }

    get destinationPoint(): string {
        return this._destinationPoint;
    }

    set departurePoint(value: string) {
        this._departurePoint = value;
    }

    set destinationPoint(value: string) {
        this._destinationPoint = value;
    }

    get departureDate(): string {
        const tomorrowDate = new Date();
        tomorrowDate.setDate(new Date().getDate() + 2);
        return tomorrowDate.toDateString();
    }

    get backDate(): string {
        const tomorrowDate = new Date();
        tomorrowDate.setDate(new Date().getDate() + 4);
        return tomorrowDate.toDateString();
    }

    get incorrectDate(): string {
        const yesterdayDate = new Date();
        yesterdayDate.setDate(new Date().getDate() - 1);
        return yesterdayDate.toDateString();
    }
}