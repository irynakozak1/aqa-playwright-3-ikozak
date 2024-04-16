import BasePage from "../BasePage.js";
import AddCarPopup from "./components/AddCarPopup.js";

export default class GaragePage extends BasePage {
    constructor(page) {
        super(page, '/panel/garage');
        this.container = page.locator('app-garage')

        this.addCarButton = this.container.getByRole('button', {name: 'Add car'})
        this.editCarButton = this.container.locator('.icon-edit')

        this.carItem = this.container.locator('.car-item')
        this.carItemName = this.container.locator('.car_name')

        this.removeCarButton = page.locator('.btn-outline-danger')
        this.removeButton = page.locator('.btn-danger')
    }

    async openAddCarPopup(){
        await this.addCarButton.click()
        return new AddCarPopup(this._page)
    }

    async removeCar(){
        await this.editCarButton.click()
        await this.removeCarButton.click()
        await this.removeButton.click()
    }
}