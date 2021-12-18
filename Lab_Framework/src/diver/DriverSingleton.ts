import {Browser as WebDriverBrowser, Builder, WebDriver} from 'selenium-webdriver';
import {Options} from 'selenium-webdriver/chrome';
import {Browser} from "../utils/constants";

export class DriverSingleton {
    private static driver: WebDriver;

    private static readonly CHROME_ARGUMENTS: string[] = ['--headless', '--no-sandbox', '--disable-dev-shm-usage']

    public static getDiver(browser: Browser): WebDriver {
        if (this.driver == null) {
            switch (browser) {
                case Browser.FireFox:
                    this.driver = new Builder().forBrowser(WebDriverBrowser.FIREFOX)
                        // .setFirefoxOptions()
                        .build();
                    break;
                default:
                    this.driver = new Builder()
                        .forBrowser(Browser.Chrome)
                        .setChromeOptions(new Options().addArguments(...this.CHROME_ARGUMENTS))
                        .build();
                    break;
            }
            this.driver.manage().window().maximize();
        }
        return this.driver;
    }

    public static closeDriver(): void {
        this.driver.quit();
        this.driver = null;
    }
}