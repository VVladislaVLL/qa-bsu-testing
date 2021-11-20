import {Options} from 'selenium-webdriver/chrome';
import {Browser, Builder, WebDriver} from 'selenium-webdriver';

import AviasalesMainPage from '../pages/AviasalesMainPage';

jest.setTimeout(1000000);

describe('Aviasales Main Page', () => {
    let driver: WebDriver
    let aviasalesPage: AviasalesMainPage

    beforeAll(() => {
        driver = new Builder().forBrowser(Browser.CHROME)
            .setChromeOptions(new Options().addArguments(...["--headless", "--no-sandbox", "--disable-dev-shm-usage"]))
            .build();
    });

    beforeEach(() => {
        aviasalesPage = new AviasalesMainPage(driver);
    });

    it('First ticker should have special badge "Самый дешевый"', async () => {
        const expected = 'самый дешёвый';
        aviasalesPage.openHomePage();
        const cheapestTicketLabel = await aviasalesPage
            .fillInAviaFormFromInput()
            .fillInAviaFormToInput()
            .switchOffOpenBookingInNewWindowCheckbox()
            .openDurationDropdown()
            .setDepartureDateInDurationDropdownAndClickSearchBtn()
            .getCheapestTicketLabelText();
        expect(cheapestTicketLabel.toLowerCase()).toEqual(expected);
    });

    afterAll(async () => {
        await driver.quit()
    })
})