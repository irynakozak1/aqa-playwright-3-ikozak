import SignUpPopup from "./components/SignUpPopup.js";
import BasePage from "../BasePage.js";


export class WelcomePage extends BasePage{
    constructor(page) {
        super(page, '/')
        this.signUpButton = page.locator('button', {hasText: 'Sign up'})
    }

    async openSignUpPopup(){
        await this.signUpButton.click()
        return new SignUpPopup(this._page)
    }
}