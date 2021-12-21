import {Browser as WebDriverBrowser, Builder, Capabilities, WebDriver} from 'selenium-webdriver';
import {Options as ChromeOptions} from 'selenium-webdriver/chrome';
import {Options as FirefoxOptions} from 'selenium-webdriver/firefox';
import {Browser, flags} from '../utils/constants';

export class DriverSingleton {
    private static driver: WebDriver;

    public static async getDiver(): Promise<WebDriver> {
        if (!this.driver !== null) {
            switch (global.BROWSER) {
                case 'chrome':
                    this.driver = await this.buildBrowserDriver(Browser.Chrome);
                    break;
                case 'firefox':
                    this.driver = await this.buildBrowserDriver(Browser.FireFox);
                    break;
                default:
                    this.driver = await this.buildBrowserDriver(Browser.Chrome);
            }
        }
        return this.driver;
    }

    private static async buildBrowserDriver(browser) {
        const builder = new Builder()
            .withCapabilities(new Capabilities().setPageLoadStrategy('normal'))
            .forBrowser(browser);
        switch (browser) {
            case Browser.Chrome:
                builder.setChromeOptions(new ChromeOptions().addArguments(...flags));
                break;
            case Browser.FireFox:
                builder.setFirefoxOptions(new FirefoxOptions().addArguments(...flags));
                break;
        }

        const driver = builder.build();
        await driver.manage().deleteAllCookies();
        await driver.manage().window().maximize();
        return driver;
    }

    public static async closeDriver(): Promise<void> {
        await this.driver.quit();
        this.driver = null;
    }
}