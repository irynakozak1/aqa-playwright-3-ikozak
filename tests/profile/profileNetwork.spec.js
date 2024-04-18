import {expect, test} from '../../src/fixtures/userProfilePage.js';
import {PROFILE_MOCK_RESPONSE} from "./fixtures/profile.js";

test.describe.only('Profile (Network)', async() => {
    test('should display correct data', async({profilePage}) => {
        await profilePage.page.route('/api/users/profile', (route)=>{
            return route.fulfill({
                status: 200,
                body: JSON.stringify(PROFILE_MOCK_RESPONSE)
            })
        })

        await profilePage.page.reload()

        await expect(profilePage.profileName).toHaveText
        (`${PROFILE_MOCK_RESPONSE.data.name} ${PROFILE_MOCK_RESPONSE.data.lastName}`)
    })
})