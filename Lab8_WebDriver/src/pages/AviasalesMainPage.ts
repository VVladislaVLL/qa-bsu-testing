import {Browser, Builder, By, WebDriver, WebElement} from 'selenium-webdriver'

export default class AviasalesMainPage {
    private static readonly MAIN_PAGE_URL = 'https://www.aviasales.by/'

    public driver: WebDriver

    private readonly formLocator: By = By.xpath('/html/body/div[1]/div/div/div[3]/div/div[1]/div[3]/div/div/form')

    constructor(driver: WebDriver) {
        this.driver = driver
    }

    public isInitialized(): Promise<boolean> {
        return this.findElementByLocator(this.formLocator).isDisplayed()
    }

    public openHomePage(): this {
        this.driver.get(AviasalesMainPage.MAIN_PAGE_URL);
        return this
    }

    public fillInFromInput(): this {
        this.driver.findElement(By.id('origin')).sendKeys('Минск')
        return this

    }

    public fillInToInput(): this {
        this.driver.findElement(By.id('destination')).sendKeys('Москва')
        return this
    }

    public clickFindTicketsButton(): this {
        this.driver.wait(() => {
            this.driver.findElement(
                By.xpath('//div[@class="avia-form__submit"]/button')
            ).click();
        }, 1000)
        return this;
    }

    public openDurationDropdown() {
        (async () => {
            await this.driver.findElement(
                By.className('trip-duration__field --departure')
            ).click();
        })()
    }

    public setDateToFly() {
        (async () => {
            await this.driver.findElement(
                By.xpath('/html/body/div[1]/div/div/div[3]/div/div[1]/div[3]/div/div/form/div[3]/div/div[3]/div/div/div[2]/div[2]/div/div/div/div[2]/div[2]/div[3]/div[3]/div[5]')
        ).click();
        })()
    }

    private findElementByLocator(locator: By) {
        return this.driver.findElement(locator)
    }

    public clickCheckBox(): this {
        (async () => {
            await this.driver.findElement(
                  By.className('of_input_checkbox__label')
            ).click();
        })()

        return this;
    }
    public getTickets() {
        return this.driver.findElements(By.className('product-list__item'));
    }

    public getFirstTicket() {
        return this.driver.findElement(By.className('product-list__item'));
    }

    public async getTextLabel(element: WebElement) {
        return element.findElement(By.xpath('//span[@class="ticket-badge__label"]'));
    }

    public quite() {
        (async () => {
            await this.driver.quit();
        })()
    }
}
