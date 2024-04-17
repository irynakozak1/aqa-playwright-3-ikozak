import {test as setup} from "@playwright/test";
import {WelcomePage} from "../../src/pageObjects/WelcomePage/WelcomePage.js";
import {expect} from "../../src/fixtures/userGaragePage.js";
import {USER_IRA_STORAGE_STATE_PATH} from "../../src/constants.js";
import {USERS} from "../../src/data/users.js";

setup.describe('Setup', ()=>{
    setup("Login and Save", async ({page})=>{
        const welcomePage = new WelcomePage(page)
        await welcomePage.navigate()
        const signInPopup = await welcomePage.openSignInPopup()
        await signInPopup.emailInput.fill(USERS.IRA_KOZAK.email)
        await signInPopup.passwordInput.fill(USERS.IRA_KOZAK.password)
        await signInPopup.loginButton.click()

        await expect(page).toHaveURL(/garage/)

        await page.context().storageState({
            path: USER_IRA_STORAGE_STATE_PATH
        })
    })
})