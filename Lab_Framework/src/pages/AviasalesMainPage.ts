import {Browser, Builder, By, WebDriver, WebElement} from 'selenium-webdriver';

import AviasalesBasePage from './AviasalesBasePage';
import AviasalesResultsPage from "./AviasalesResultsPage";
import {Order} from '../model/Order';

export default class AviasalesMainPage extends AviasalesBasePage{
    private static readonly MAIN_PAGE_URL = 'https://www.aviasales.by/';

    private readonly dataErrorMessageAttribute: string = 'data-error-message';

    private readonly aviaFormLocator: By = By.className('avia-form');
    private readonly aviaFormSearchBtnLocator: By = By.xpath('//div[@class="avia-form__submit"]/button');
    private readonly aviaFormFromInputLocator: By = By.id('origin');
    private readonly aviaFormToInputLocator: By = By.id('destination');
    private readonly durationDropdownLocator: By = By.className('trip-duration__field --departure');
    private readonly openBookingInNewWindowCheckBoxLocator: By = By.className('of_input_checkbox__label');
    private readonly destinationWrapperLocator: By = By.xpath('//div[@data-test-id="autocomplete-destination"]');


    constructor(driver: WebDriver) {
        super(driver);
    }

    private getDateLocator(date: string): By {
        return By.xpath(`//div[@aria-label="${date}"]`);
    }

    public isInitialized(): Promise<boolean> {
        return super.isInitialized(this.aviaFormLocator);
    }

    public openHomePage(): this {
        this.driver.get(AviasalesMainPage.MAIN_PAGE_URL);
        return this;
    }

    private async _fillInDeparturePointInput(departurePoint: string): Promise<void> {
        return await this.findElementByLocator(this.aviaFormFromInputLocator).sendKeys(departurePoint);
    }

    private async _fillInDestinationPointInput(destinationPoint: string): Promise<void> {
        return await this.findElementByLocator(this.aviaFormToInputLocator).sendKeys(destinationPoint);
    }

    private async _openDurationDropDown(): Promise<void> {
        return await this.findElementByLocator(this.durationDropdownLocator).click();
    }

    private async _inputDateInDurationDropDown(date: string): Promise<void> {
        return await this.findElementByLocator(this.getDateLocator(date)).click();
    }

    private async _clickSearchButton(): Promise<void> {
        return await this.findElementByLocator(this.aviaFormSearchBtnLocator).click();
    }

    public fillInAviaFormFromInput(text: string): this {
        (async () => {
            await this._fillInDeparturePointInput(text);
        })();
        return this;
    }

    public fillInAviaFormToInput(text: string): this {
        (async () => {
            await this._fillInDestinationPointInput(text);
        })();
        return this;
    }

    public openDurationDropdown(): this {
        (async () => {
            await this._openDurationDropDown();
        })();
        return this;
    }

    public clickSearchButton(): this {
        (async () => {
            await this._clickSearchButton();
        })()
        return this;
    }

    public fillInAviaFormAndClickSearch(order: Order): AviasalesResultsPage {
        (async () => {
            await this._fillInDeparturePointInput(order.departurePoint);
            await this._fillInDestinationPointInput(order.destinationPoint);
            await this._openDurationDropDown();
            await this._inputDateInDurationDropDown(order.departureDate);
            await this._inputDateInDurationDropDown(order.backDate);
            await this._clickSearchButton();
        })();

        return new AviasalesResultsPage(this.driver);
    }

    public switchOffOpenBookingInNewWindowCheckbox(): this {
        (async () => {
            await this.findElementByLocator(this.openBookingInNewWindowCheckBoxLocator).click();
        })();
        return this;
    }

    public setDepartureDateInDurationDropdownAndClickSearchBtn(date: string): AviasalesResultsPage {
        (async () => {
            await this._inputDateInDurationDropDown(date);
            await this._clickSearchButton();
        })();
        return new AviasalesResultsPage(this.driver);
    }

    public async getErrorMessageFromDestinationCityField(): Promise<string> {
        return this.findElementByLocator(this.destinationWrapperLocator).getAttribute(this.dataErrorMessageAttribute);
    }
}
