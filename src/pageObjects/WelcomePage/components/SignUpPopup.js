import BaseComponents from "../../../components/BaseComponents.js";


export default class SignUpPopup extends BaseComponents{
    _nameInputSelector = '#signupName'
    _lastNameInputSelector = '#signupLastName'
    _emailInputSelector = '#signupEmail'
    _passwordInputSelector = '#signupPassword'
    _repeatPasswordInputSelector = '#signupRepeatPassword'

    constructor(page) {
        super(page)
        this.container = page.locator('app-signup-modal')

        this.nameInput = this.container.locator(this._nameInputSelector)
        this.actualNameErrorMessage =
             this.container.locator(`${this._nameInputSelector} + .invalid-feedback`)

        this.lastNameInput = this.container.locator(this._lastNameInputSelector)
        this.actualLastNameErrorMessage =
             this.container.locator(`${this._lastNameInputSelector} + .invalid-feedback`)

        this.emailInput = this.container.locator(this._emailInputSelector)
        this.actualEmailErrorMessage =
             this.container.locator(`${this._emailInputSelector} + .invalid-feedback`)

        this.passwordInput = this.container.locator(this._passwordInputSelector)
        this.actualPasswordErrorMessage =
             this.container.locator(`${this._passwordInputSelector} + .invalid-feedback`)

        this.repeatPasswordInput = this.container.locator(this._repeatPasswordInputSelector)
        this.actualRepeatPasswordErrorMessage =
             this.container.locator(`${this._repeatPasswordInputSelector} + .invalid-feedback`)

        this.registerButton = this.container.locator('.btn-primary')
    }
}