import {expect, test} from '../../../src/fixtures/userGaragePage.js'

test.describe('Garage (fixtures)', async () => {
        test('User should be able to add car to garage', async ({garagePage}) => {
            const addCarPopup = await garagePage.openAddCarPopup()

            await addCarPopup.brandDropdown.selectOption('BMW')
            await addCarPopup.modelDropdown.selectOption('X5')
            await addCarPopup.mileageInput.fill('123')
            await addCarPopup.addButton.click()

            await expect(garagePage.carItem).toBeVisible()
            await expect(garagePage.carItemName).toHaveText('BMW X5')
    })
})