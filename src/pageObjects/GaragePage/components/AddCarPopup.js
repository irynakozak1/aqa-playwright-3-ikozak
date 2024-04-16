import BaseComponents from "../../../components/BaseComponents.js";


export default class AddCarPopup extends BaseComponents {
    constructor(page) {
        super(page);
        this.brandDropdown = page.locator('#addCarBrand')
        this.modelDropdown = page.locator('#addCarModel')
        this.mileageInput = page.locator('#addCarMileage')
        this.addButton = page.locator('.modal-content  .btn-primary')
    }
}