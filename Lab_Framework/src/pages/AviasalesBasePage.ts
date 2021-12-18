import {By, until, WebDriver, WebElement} from 'selenium-webdriver';

export default class AviasalesBasePage {
    protected driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    protected isInitialized(locator: By): Promise<boolean> {
        return this.findElementByLocator(locator).isDisplayed();
    }

    protected findElementByLocator(locator: By, duration?: number) {
        return duration
            ? this.driver.wait(until.elementLocated(locator), duration)
            : this.driver.wait(until.elementLocated(locator));
    }

    protected findElementsByLocator(locator: By): Promise<WebElement[]> {
        return this.driver.findElements(locator);
    }

    public quite() {
        (async () => {
            await this.driver.quit();
        })()
    }
}