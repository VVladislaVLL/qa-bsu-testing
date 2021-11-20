import {Browser, Builder, By, WebDriver, WebElement} from 'selenium-webdriver';

import AviasalesBasePage from './AviasalesBasePage';
import AviasalesResultsPage from "./AviasalesResultsPage";

export default class AviasalesMainPage extends AviasalesBasePage{
    private static readonly MAIN_PAGE_URL = 'https://www.aviasales.by/';

    private readonly aviaFormLocator: By = By.className('avia-form');
    private readonly aviaFormSearchBtnLocator: By = By.xpath('//div[@class="avia-form__submit"]/button');
    private readonly aviaFormFromInputLocator: By = By.id('origin');
    private readonly aviaFormToInputLocator: By = By.id('destination');
    private readonly durationDropdownLocator: By = By.className('trip-duration__field --departure');
    private readonly departureDateLocator: By = By.xpath('//div[@aria-label="Fri Dec 24 2021"]');
    private readonly openBookingInNewWindowCheckBoxLocator: By = By.className('of_input_checkbox__label');

    private readonly textForFromInputField: string = 'Минск';
    private readonly textForToInputField: string = 'Москва';

    constructor(driver: WebDriver) {
        super(driver);
    }

    public isInitialized(): Promise<boolean> {
        return super.isInitialized(this.aviaFormLocator);
    }

    public openHomePage(): this {
        this.driver.get(AviasalesMainPage.MAIN_PAGE_URL);
        return this;
    }

    public fillInAviaFormFromInput(): this {
        (async () => {
            await this.findElementByLocator(this.aviaFormFromInputLocator).sendKeys(this.textForFromInputField);
        })();
        return this;

    }

    public fillInAviaFormToInput(): this {
        (async () => {
            await this.findElementByLocator(this.aviaFormToInputLocator).sendKeys(this.textForToInputField);
        })();
        return this;
    }

    public openDurationDropdown(): this {
        (async () => {
            await this.findElementByLocator(this.durationDropdownLocator).click();
        })();
        return this;
    }

    public setDepartureDateInDurationDropdownAndClickSearchBtn(): AviasalesResultsPage {
        (async () => {
            await this.findElementByLocator(this.departureDateLocator).click();
            await this.findElementByLocator(this.aviaFormSearchBtnLocator).click();
        })();
        return new AviasalesResultsPage(this.driver);
    }

    public switchOffOpenBookingInNewWindowCheckbox(): this {
        (async () => {
            await this.findElementByLocator(this.openBookingInNewWindowCheckBoxLocator).click();
        })();
        return this;
    }
}
