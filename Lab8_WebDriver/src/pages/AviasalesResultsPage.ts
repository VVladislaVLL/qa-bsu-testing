import {By, WebDriver, WebElementPromise} from 'selenium-webdriver';

import AviasalesBasePage from './AviasalesBasePage';

export default class AviasalesResultsPage extends AviasalesBasePage {
    private readonly predictionAdviceLocator: By = By.xpath('//div[@class="prediction-advice"]');
    private readonly cheapestTicketLocator: By = By.xpath('//div[@class="product-list"]/div[2]');
    private readonly cheapestTicketBadgeLocator: By = By.xpath('//div[@class="ticket-badge"]/div[@data-test-id="text"]');


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
}