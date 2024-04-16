import {expect, test} from '../../src/fixtures/userGaragePage.js'
import AddCarPopup from "../../src/pageObjects/GaragePage/components/AddCarPopup.js";


test.describe.only('Garage (fixtures)', async () => {
        test('User should be able to add car to garage', async ({garagePage}) => {
            await garagePage.openAddCarPopup()

            const addCarPopup = new AddCarPopup(garagePage.getPage())

            await addCarPopup.brandDropdown.selectOption('BMW')
            await addCarPopup.modelDropdown.selectOption('X5')
            await addCarPopup.mileageInput.fill('123')
            await addCarPopup.addButton.click()

            await expect(garagePage.carItem).toBeVisible()
            await expect(garagePage.carItemName).toHaveText('BMW X5')
    })
})