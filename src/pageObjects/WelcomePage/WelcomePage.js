import SignUpPopup from "./components/SignUpPopup.js";
import BasePage from "../BasePage.js";
import SignInPopup from "./components/SignInPopup.js";


export class WelcomePage extends BasePage{
    constructor(page) {
        super(page, '/')
        this.signUpButton = page.locator('button', {hasText: 'Sign up'})
        this.signInButton = page.locator('button', {hasText: 'Sign In'})
    }

    async openSignUpPopup(){
        await this.signUpButton.click()
        return new SignUpPopup(this._page)
    }

    async openSignInPopup(){
        await this.signInButton.click()
        return new SignInPopup(this._page)
    }
}