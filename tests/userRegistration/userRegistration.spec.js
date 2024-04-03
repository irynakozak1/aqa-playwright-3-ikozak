import {test, expect} from '@playwright/test'

test.describe.only('New user registration', ()=>{
    test.describe.only('Signup modal', ()=>{
        test.describe('Positive scenarios', ()=>{
            test.beforeEach(async ({page})=>{
                await page.goto('')
            })

            test('User should be able to sign up', async ({page})=>{
                const signUpButton = page.locator('button', {hasText: 'Sign up'})
                await signUpButton.click()

                const signUpPopup = page.locator('app-signup-modal')
                const nameInput = signUpPopup.locator('#signupName')
                const lastNameInput = signUpPopup.locator('#signupLastName')
                const emailInput = signUpPopup.locator('#signupEmail')
                const passwordInput = signUpPopup.locator('#signupPassword')
                const repeatPasswordInput = signUpPopup.locator('#signupRepeatPassword')
                const registerButton = signUpPopup.locator('.btn-primary')

                await nameInput.fill('Iryna')
                await lastNameInput.fill('Kozak')
                await emailInput.fill('aqa-ikozak@gmail.com')
                await passwordInput.fill('Qwer1234')

                await expect(registerButton, 'Register button should be disabled until user fills all the fields with valid data').toBeDisabled()

                await repeatPasswordInput.fill('Qwer1234')
                await registerButton.click()

                await expect(page, 'User should be redirected to garage page').toHaveURL(/garage/)
            })

            test.afterEach(async ({page})=>{
                const settingsButton = page.locator('[routerlink=settings]')
                const removeMyAccountButton = page.locator('.btn-danger-bg')
                const removeButton = page.locator('.modal-footer .btn-danger')

                await settingsButton.click()
                await removeMyAccountButton.click()
                await removeButton.click()
            })
        })

        test.describe('Negative scenarios', ()=>{
            test.describe('Field "Name" validation', ()=>{
                test.beforeEach(async ({page})=>{
                    await page.goto('')
                    const signUpButton = page.locator('button', {hasText: 'Sign up'})
                    await signUpButton.click()
                })

                test('Empty field validation', async ({page})=>{
                    const expectedEmptyNameMessage = 'Name required'

                    const signUpPopup = page.locator('app-signup-modal')
                    const nameInput = signUpPopup.locator('#signupName')
                    const actualEmptyNameMessage = nameInput.locator('+.invalid-feedback')

                    await nameInput.focus()
                    await nameInput.blur()
                    await expect(actualEmptyNameMessage).toHaveText(expectedEmptyNameMessage)
                })

                test('Wrong data validation', async ({page})=>{
                    const expectedWrongNameMessage = 'Name is invalid'

                    const signUpPopup = page.locator('app-signup-modal')
                    const nameInput = signUpPopup.locator('#signupName')
                    const actualWrongNameMessage = nameInput.locator('+.invalid-feedback')

                    await nameInput.fill('Iryna1')
                    await nameInput.blur()
                    await expect(actualWrongNameMessage).toHaveText(expectedWrongNameMessage)
                })

                test('Wrong length validation', async ({page})=>{
                    const expectedWrongNameLengthMessage = 'Name has to be from 2 to 20 characters long'

                    const signUpPopup = page.locator('app-signup-modal')
                    const nameInput = signUpPopup.locator('#signupName')
                    const actualWrongNameLengthMessage = nameInput.locator('+.invalid-feedback')

                    await nameInput.fill('I')
                    await nameInput.blur()
                    await expect(actualWrongNameLengthMessage).toHaveText(expectedWrongNameLengthMessage)
                })

                test('Border color validation', async ({page})=>{
                    const signUpPopup = page.locator('app-signup-modal')
                    const nameInput = signUpPopup.locator('#signupName')

                    await nameInput.focus()
                    await nameInput.blur()
                    await expect(nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
                })
            })
        })


        test.describe('Field "Last name" validation', ()=>{
            test.beforeEach(async ({page})=>{
                await page.goto('')
                const signUpButton = page.locator('button', {hasText: 'Sign up'})
                await signUpButton.click()
            })

            test('Empty field validation', async ({page})=>{
                const expectedEmptyLastNameMessage = 'Last name required'

                const signUpPopup = page.locator('app-signup-modal')
                const lastNameInput = signUpPopup.locator('#signupLastName')
                const actualEmptyLastNameMessage = lastNameInput.locator('+.invalid-feedback')

                await lastNameInput.focus()
                await lastNameInput.blur()
                await expect(actualEmptyLastNameMessage).toHaveText(expectedEmptyLastNameMessage)
            })

            test('Wrong data validation', async ({page})=>{
                const expectedWrongLastNameMessage = 'Last name is invalid'

                const signUpPopup = page.locator('app-signup-modal')
                const lastNameInput = signUpPopup.locator('#signupLastName')
                const actualWrongLastNameMessage = lastNameInput.locator('+.invalid-feedback')

                await lastNameInput.fill('Iryna1')
                await lastNameInput.blur()
                await expect(actualWrongLastNameMessage).toHaveText(expectedWrongLastNameMessage)
            })

            test('Wrong length validation', async ({page})=>{
                const expectedWrongLastNameLengthMessage = 'Last name has to be from 2 to 20 characters long'

                const signUpPopup = page.locator('app-signup-modal')
                const lastNameInput = signUpPopup.locator('#signupLastName')
                const actualWrongLastNameLengthMessage = lastNameInput.locator('+.invalid-feedback')

                await lastNameInput.fill('I')
                await lastNameInput.blur()
                await expect(actualWrongLastNameLengthMessage).toHaveText(expectedWrongLastNameLengthMessage)
            })

            test('Border color validation', async ({page})=>{
                const signUpPopup = page.locator('app-signup-modal')
                const lastNameInput = signUpPopup.locator('#signupLastName')

                await lastNameInput.focus()
                await lastNameInput.blur()
                await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
        })


        test.describe('Field "Email" validation', ()=>{
            test.beforeEach(async ({page})=>{
                await page.goto('')
                const signUpButton = page.locator('button', {hasText: 'Sign up'})
                await signUpButton.click()
            })

            test('Empty field validation', async ({page})=>{
                const expectedEmptyEmailMessage = 'Email required'

                const signUpPopup = page.locator('app-signup-modal')
                const emailInput = signUpPopup.locator('#signupEmail')
                const actualEmptyEmailMessage = emailInput.locator('+.invalid-feedback')

                await emailInput.focus()
                await emailInput.blur()
                await expect(actualEmptyEmailMessage).toHaveText(expectedEmptyEmailMessage)
            })

            test('Wrong data validation', async ({page})=>{
                const expectedWrongEmailMessage = 'Email is incorrect'

                const signUpPopup = page.locator('app-signup-modal')
                const emailInput = signUpPopup.locator('#signupEmail')
                const actualWrongEmailMessage = emailInput.locator('+.invalid-feedback')

                await emailInput.fill('aqa-ikozak')
                await emailInput.blur()
                await expect(actualWrongEmailMessage).toHaveText(expectedWrongEmailMessage)
            })


            test('Border color validation', async ({page})=>{
                const signUpPopup = page.locator('app-signup-modal')
                const emailInput = signUpPopup.locator('#signupEmail')

                await emailInput.focus()
                await emailInput.blur()
                await expect(emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
        })


        test.describe('Field "Password" validation', ()=>{
            test.beforeEach(async ({page})=>{
                await page.goto('')
                const signUpButton = page.locator('button', {hasText: 'Sign up'})
                await signUpButton.click()
            })

            test('Empty field validation', async ({page})=>{
                const expectedEmptyPasswordMessage = 'Password required'

                const signUpPopup = page.locator('app-signup-modal')
                const passwordInput = signUpPopup.locator('#signupPassword')
                const actualEmptyPasswordMessage = passwordInput.locator('+.invalid-feedback')

                await passwordInput.focus()
                await passwordInput.blur()
                await expect(actualEmptyPasswordMessage).toHaveText(expectedEmptyPasswordMessage)
            })

            test('Wrong data validation', async ({page})=>{
                const expectedWrongPasswordMessage =
                      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'

                const signUpPopup = page.locator('app-signup-modal')
                const passwordInput = signUpPopup.locator('#signupPassword')
                const actualWrongPasswordMessage = passwordInput.locator('+.invalid-feedback')

                await passwordInput.fill('Qwer123')
                await passwordInput.blur()
                await expect(actualWrongPasswordMessage).toHaveText(expectedWrongPasswordMessage)
            })

            test('Border color validation', async ({page})=>{
                const signUpPopup = page.locator('app-signup-modal')
                const passwordInput = signUpPopup.locator('#signupPassword')

                await passwordInput.focus()
                await passwordInput.blur()
                await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
        })


        test.describe('Field "Re-enter password" validation', ()=>{
            test.beforeEach(async ({page})=>{
                await page.goto('')
                const signUpButton = page.locator('button', {hasText: 'Sign up'})
                await signUpButton.click()
            })

            test('Empty field validation', async ({page})=>{
                const expectedEmptyRepeatPasswordMessage = 'Re-enter password required'

                const signUpPopup = page.locator('app-signup-modal')
                const repeatPasswordInput = signUpPopup.locator('#signupRepeatPassword')
                const actualEmptyRepeatPasswordMessage = repeatPasswordInput.locator('+.invalid-feedback')

                await repeatPasswordInput.focus()
                await repeatPasswordInput.blur()
                await expect(actualEmptyRepeatPasswordMessage).toHaveText(expectedEmptyRepeatPasswordMessage)
            })

            test('Wrong data validation', async ({page})=>{
                const expectedWrongRepeatPasswordMessage =
                      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'

                const signUpPopup = page.locator('app-signup-modal')
                const repeatPasswordInput = signUpPopup.locator('#signupRepeatPassword')
                const actualWrongRepeatPasswordMessage = repeatPasswordInput.locator('+.invalid-feedback')

                await repeatPasswordInput.fill('Qwer123')
                await repeatPasswordInput.blur()
                await expect(actualWrongRepeatPasswordMessage).toHaveText(expectedWrongRepeatPasswordMessage)
            })

            test('Border color validation', async ({page})=>{
                const signUpPopup = page.locator('app-signup-modal')
                const repeatPasswordInput = signUpPopup.locator('#signupRepeatPassword')

                await repeatPasswordInput.focus()
                await repeatPasswordInput.blur()
                await expect(repeatPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
        })
    })
})