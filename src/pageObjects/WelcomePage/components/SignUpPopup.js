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
        this.actualEmptyNameMessage =
             this.container.locator(`${this._nameInputSelector} + .invalid-feedback`)
        this.actualWrongNameMessage =
             this.container.locator(`${this._nameInputSelector} + .invalid-feedback`)
        this.actualWrongNameLengthMessage =
             this.container.locator(`${this._nameInputSelector} + .invalid-feedback`)

        this.lastNameInput = this.container.locator(this._lastNameInputSelector)
        this.actualEmptyLastNameMessage =
             this.container.locator(`${this._lastNameInputSelector} + .invalid-feedback`)
        this.actualWrongLastNameMessage =
             this.container.locator(`${this._lastNameInputSelector} + .invalid-feedback`)
        this.actualWrongLastNameLengthMessage =
             this.container.locator(`${this._lastNameInputSelector} + .invalid-feedback`)

        this.emailInput = this.container.locator(this._emailInputSelector)
        this.actualEmptyEmailMessage =
             this.container.locator(`${this._emailInputSelector} + .invalid-feedback`)
        this.actualWrongEmailMessage =
             this.container.locator(`${this._emailInputSelector} + .invalid-feedback`)

        this.passwordInput = this.container.locator(this._passwordInputSelector)
        this.actualEmptyPasswordMessage =
             this.container.locator(`${this._passwordInputSelector} + .invalid-feedback`)
        this.actualWrongPasswordMessage =
             this.container.locator(`${this._passwordInputSelector} + .invalid-feedback`)

        this.repeatPasswordInput = this.container.locator(this._repeatPasswordInputSelector)
        this.actualEmptyRepeatPasswordMessage =
             this.container.locator(`${this._repeatPasswordInputSelector} + .invalid-feedback`)
        this.actualWrongRepeatPasswordMessage =
             this.container.locator(`${this._repeatPasswordInputSelector} + .invalid-feedback`)

        this.registerButton = this.container.locator('.btn-primary')
    }
}