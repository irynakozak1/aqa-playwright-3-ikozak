import BaseComponents from "../../../components/BaseComponents.js";


export default class SignInPopup extends BaseComponents {
    _emailInputSelector = '#signinEmail'
    _passwordInputSelector = '#signinPassword'

    constructor(page) {
        super(page);
        this.container = page.locator('app-signin-modal')

        this.emailInput = this.container.locator(this._emailInputSelector)
        this.passwordInput = this.container.locator(this._passwordInputSelector)
        this.loginButton = this.container.locator('.btn-primary')
    }
}