import {By, until, WebDriver, WebElementPromise} from 'selenium-webdriver';

export default class AviasalesBasePage {
    protected driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    protected isInitialized(locator: By): Promise<boolean> {
        return this.findElementByLocator(locator).isDisplayed();
    }

    protected findElementByLocator(locator: By, duration?: number): WebElementPromise {
        return duration
            ? this.driver.wait(until.elementLocated(locator), duration)
            : this.driver.wait(until.elementLocated(locator));
    }

    public quite() {
        (async () => {
            await this.driver.quit();
        })()
    }
}