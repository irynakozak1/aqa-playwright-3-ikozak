import {expect as baseExpect, test as base} from "@playwright/test";
import ProfilePage from "../pageObjects/ProfilePage/ProfilePage.js";
import {USER_IRA_STORAGE_STATE_PATH} from "../constants.js";

export const test = base.extend({
    profilePage: async ({browser}, use) => {
        const ctx = await browser.newContext({
            storageState: USER_IRA_STORAGE_STATE_PATH
        })

        const page = await ctx.newPage()
        const profilePage = new ProfilePage(page)
        await profilePage.navigate()

        await use(profilePage)
    }
})

export const expect = baseExpect