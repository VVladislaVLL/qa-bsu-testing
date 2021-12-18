import {By, logging, until, WebDriver, WebElement, WebElementPromise} from 'selenium-webdriver';

import AviasalesBasePage from './AviasalesBasePage';

export default class AviasalesResultsPage extends AviasalesBasePage {
    private readonly predictionAdviceLocator: By = By.xpath('//div[@class="prediction-advice"]');
    private readonly errorInformerLocator: By = By.xpath('//div[@class="error-informer"]');
    private readonly errorInformerContainerLocator: By = By.xpath('//div[@class="error-informer"]');
    private readonly cheapestTicketLocator: By = By.xpath('//div[@class="product-list"]/div[2]');
    private readonly cheapestTicketBadgeLocator: By = By.xpath('//div[@class="ticket-badge"]/div[@data-test-id="text"]');
    private readonly ticketLocator: By = By.xpath('//div[@data-test-id="ticket-desktop"]');
    private readonly addLuggageLocator: By = By.xpath('//label[@data-test-id="control"]');
    private readonly activeLuggageLocator: By = By.xpath('//div[@class="baggage-upsell --is-enabled"]');
    private readonly shareButtonLocator: By = By.xpath('//div[text()="Поделиться"]');
    private readonly copyButtonLocator: By = By.xpath('//div[@data-test-id="copy-link"]/button[@title="Скопировать"]');
    private readonly copyTextLocator: By = By.xpath('//div[@data-test-id="copy-link"]/span[@data-test-id="text"]');
    private readonly priceLocator: By = By.xpath('//div[@class="ticket-desktop__side-container"]/div[@data-test-id="text"]/span[@data-test-id="price"]');

    constructor(driver: WebDriver) {
        super(driver);
    }

    public isInitialized(): Promise<boolean> {
        return super.isInitialized(this.predictionAdviceLocator);
    }

    public getCheapestTicketLocator(): WebElementPromise {
        return this.findElementByLocator(this.cheapestTicketLocator);
    }

    public async getCheapestTicketLabelText (): Promise<string> {
        await this.waitUntilPageIsFullyLoaded();
        return await this.getCheapestTicketLocator().findElement(this.cheapestTicketBadgeLocator).getText();
    }

    public waitUntilPageIsFullyLoaded(): WebElementPromise {
        return this.findElementByLocator(this.predictionAdviceLocator);
    }

    public waitUntilPageIsFullyLoadedWithErrorMessage(): WebElementPromise {
        return this.findElementByLocator(this.errorInformerLocator);
    }

    public async getErrorInformedContainer() {
        await this.waitUntilPageIsFullyLoadedWithErrorMessage();
        return this.findElementsByLocator(this.errorInformerContainerLocator);
    }

    private _getTicket(): WebElementPromise {
        return this.findElementByLocator(this.ticketLocator);
    }

    public openTicketDetails(): this {
        (async () => {
            await this.waitUntilPageIsFullyLoaded();
            await this._getTicket().click();
        })();
        return this;
    }

    public activateAddLuggage(): this {
        (async () => {
            await this.driver.wait(() => {
                return this.driver
                    .findElement(this.addLuggageLocator).
                    then(element => element.click().then(() => true, err => false), err => false);
            });
        })();
        return this;
    }

    public openSharePopup(): this {
        (async () => {
            await this.driver.wait(() => {
                return this.driver
                    .findElement(this.shareButtonLocator).
                    then(element => element.click().then(() => true, err => false), err => false);
            });
        })();
        return this;
    }

    public clickCopyButton(): this {
        (async () => {
            await this.driver.wait(() => {
                return this.driver
                    .findElement(this.copyButtonLocator).
                    then(element => element.click().then(() => true, err => false), err => false);
            });
        })();
        return this;
    }

    public async getCopyTextAfterCopyButtonWasClicked() {
            await this.driver.wait(() => {
                return this.driver
                    .findElement(this.copyButtonLocator).
                    then(element => element.click().then(() => true, err => false), err => false);
            });
        return await this.findElementByLocator(this.copyTextLocator).getText();
    }

    public async getTicketsPrice() {
        await this.waitUntilPageIsFullyLoaded();
        return await this.findElementsByLocator(this.priceLocator).then(prices => Promise.all(prices.map(price => price.getText())));
    }

    public async isLuggageActive(): Promise<boolean> {
        return await this.driver.wait(() => {
            return this.driver.findElement(this.activeLuggageLocator).then(element => true, error => false);
        });
    }
}
