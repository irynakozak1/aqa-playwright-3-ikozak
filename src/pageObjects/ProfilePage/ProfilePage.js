import BasePage from "../BasePage.js";


export default class ProfilePage extends BasePage{
    constructor(page) {
        super(page, '/panel/profile');
        this.container = page.locator('.panel-page')
        this.profileName = this.container.locator('.profile_name')
    }
}