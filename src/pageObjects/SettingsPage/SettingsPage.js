import BasePage from "../BasePage.js";


export default class SettingsPage extends BasePage {
    constructor(page) {
        super(page, '/panel/settings');
        this.removeMyAccountButton = page.locator('.btn-danger-bg')
        this.removeButton = page.locator('.modal-footer .btn-danger')
    }
}