import {expect as baseExpect, test as base} from "@playwright/test";
import GaragePage from "../pageObjects/GaragePage/GaragePage.js";
import {USER_IRA_STORAGE_STATE_PATH} from "../constants.js";

export const test = base.extend({
    garagePage: async ({browser}, use) => {
        const ctx = await browser.newContext({
            storageState: USER_IRA_STORAGE_STATE_PATH
        })

        const page = await ctx.newPage()
        const garagePage = new GaragePage(page)
        await garagePage.navigate()

        await use(garagePage)

        await garagePage.removeCar()
    }
})

export const expect = baseExpect