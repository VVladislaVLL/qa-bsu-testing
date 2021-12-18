import {WebDriver} from 'selenium-webdriver';

import AviasalesMainPage from '../pages/AviasalesMainPage';
import {DriverSingleton} from '../diver/DriverSingleton';
import {Browser} from '../utils/constants';
import {Order} from '../model/Order';
import {isArraySorted, transformPriceToNumber} from "../utils/helpers";

jest.setTimeout(500000);

describe('Aviasales Main Page', () => {
    let driver: WebDriver;
    let aviasalesPage: AviasalesMainPage;

    beforeAll(() => {
        driver = DriverSingleton.getDiver(Browser.Chrome);
    });

    beforeEach(() => {
        aviasalesPage = new AviasalesMainPage(driver);
    });

    // TEST №1
    it('First ticker should have special badge "Самый дешевый"', async () => {
        const order = new Order('Минск', 'Москва');
        const expected = 'самый дешёвый';
        aviasalesPage.openHomePage();
        const cheapestTicketLabel = await aviasalesPage
            .switchOffOpenBookingInNewWindowCheckbox()
            .fillInAviaFormAndClickSearch(order)
            .getCheapestTicketLabelText();
        expect(cheapestTicketLabel.toLowerCase()).toEqual(expected);
    });
    //
    // // TEST №2
    it('Warning "Укажите город прибытия" should appear if required fields are not filed', async () => {
        const expected = 'укажите город прибытия';
        aviasalesPage.openHomePage();
        const errorAttrValue = await aviasalesPage
            .switchOffOpenBookingInNewWindowCheckbox()
            .clickSearchButton()
            .getErrorMessageFromDestinationCityField();

        expect(errorAttrValue.toLowerCase()).toEqual(expected);
    });

    // TEST №3
    it('Should appear invalid search container if invalid date was passed', async () => {
        const order = new Order('Минск', 'Москва');
        await aviasalesPage.openHomePage();
        const invalidSearchParametersContainer = await aviasalesPage
            .switchOffOpenBookingInNewWindowCheckbox()
            .fillInAviaFormToInput(order.destinationPoint)
            .openDurationDropdown()
            .setDepartureDateInDurationDropdownAndClickSearchBtn(order.incorrectDate)
            .getErrorInformedContainer();

        expect(invalidSearchParametersContainer.length > 0).toBeTruthy();
    });
    //
    // // TEST №4
    it('Should change display of luggage if click on add luggage in ticket popup', async () => {
        const order = new Order('Минск', 'Москва');
        await aviasalesPage.openHomePage();
        const statusLuggage = await aviasalesPage
            .fillInAviaFormAndClickSearch(order)
            .openTicketDetails()
            .activateAddLuggage()
            .isLuggageActive();

        expect(statusLuggage).toBeTruthy();
    });

    // TEST №5
    it('Should change copy text state after click on "Copy" button', async () => {
        const order = new Order('Минск', 'Москва');
        const expected = 'Скопировано';

        await aviasalesPage.openHomePage();
        const copiedText = await aviasalesPage
            .fillInAviaFormAndClickSearch(order)
            .openTicketDetails()
            .openSharePopup()
            .getCopyTextAfterCopyButtonWasClicked();

        expect(copiedText.toLowerCase()).toEqual(expected.toLowerCase());
    });

    // TEST №6
    it('Tickets should go in ascending order', async () => {
        const order = new Order('Минск', 'Москва');

        await aviasalesPage.openHomePage();
        const prices = await aviasalesPage
            // .switchOffOpenBookingInNewWindowCheckbox()
            .fillInAviaFormAndClickSearch(order)
            .getTicketsPrice();
        expect(isArraySorted(transformPriceToNumber(prices))).toBeTruthy();
    });

    afterAll(async () => {
        DriverSingleton.closeDriver();
    })
})