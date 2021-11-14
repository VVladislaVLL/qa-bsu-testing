import AviasalesMainPage from '../pages/AviasalesMainPage';
import {Browser, Builder, By, until, WebDriver} from 'selenium-webdriver';
jest.setTimeout(1000000)
describe('Aviasales Main Page', () => {
    let driver: WebDriver
    let aviasalesPage: AviasalesMainPage

    beforeAll(() => {
        driver = new Builder().forBrowser(Browser.CHROME).build()
    })

    beforeEach(() => {
        aviasalesPage = new AviasalesMainPage(driver)

    })

    it('should be initialized', () => {
        return expect(
            aviasalesPage
                .openHomePage()
                .isInitialized()
        ).toBeTruthy()
    });

    it('First ticker should have special badge "Самый дешевый"', async () => {
        aviasalesPage.openHomePage();
        aviasalesPage
            .fillInFromInput()
            .fillInToInput()
            .clickCheckBox()
            .openDurationDropdown();
        await aviasalesPage.driver.wait(until.elementLocated(By.className('trip-duration__dropdown')));
        aviasalesPage.setDateToFly();
        aviasalesPage.clickFindTicketsButton();
        await aviasalesPage.driver.wait(until.elementLocated(By.xpath('//div[@class="product-list"]')));
        const allTickets = await aviasalesPage.getTickets();
        const firstTicket = await aviasalesPage.getFirstTicket();
        const label = await aviasalesPage.getTextLabel(firstTicket);
        expect( (await label.getText()).toLowerCase()).toEqual('САМЫЙ ДЕШЁВЫЙ'.toLowerCase());
    });

    afterAll(async () => {
        await driver.quit()
    })
})