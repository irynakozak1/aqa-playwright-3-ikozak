import {expect, test} from "../../../../src/fixtures/userFixtures.js";
import {BRANDS} from "../../../../src/data/brands.js";
import {MODELS} from "../../../../src/data/models.js";

test.describe('Delete user car', () => {
    const brands = Object.values(BRANDS)
    const randomAvailableBrandId = brands[Math.floor(Math.random() * brands.length)].id

    const brandModels = Object.values(MODELS[randomAvailableBrandId])
    const randomAvailableModelId =  brandModels[Math.floor(Math.random() * brandModels.length)].id

    const mileage = Math.floor(Math.random() * 100)

    const createCarRequestBody = {
        "carBrandId": randomAvailableBrandId,
        "carModelId": randomAvailableModelId,
        "mileage": mileage
    }
    test.describe('Positive scenario', () => {
        test('Delete user car', async ({deleteCarApiNewUser}) => {
            const createdCarResponse = await deleteCarApiNewUser.cars.createCar(createCarRequestBody)
            const createdCarBody = await createdCarResponse.json()

            const deletedCarResponse = await deleteCarApiNewUser.cars.deleteUserCarById(createdCarBody.data.id)
            const deletedCarBody = await deletedCarResponse.json()

            const expected = {
                "carId": createdCarBody.data.id
            }

            expect(deletedCarResponse.status()).toBe(200)
            expect(deletedCarBody.status).toBe('ok')
            expect(deletedCarBody.data).toEqual(expected)
        })
    })

    test.describe('Negative scenarios', () => {
        test('should return 404 when there is no such car available', async ({deleteCarApiNewUser}) => {
            const createdCarResponse = await deleteCarApiNewUser.cars.createCar(createCarRequestBody)
            const createdCarBody = await createdCarResponse.json()

            const deletedCarResponse = await deleteCarApiNewUser.cars.deleteUserCarById(createdCarBody.data.id + 10)

            expect(deletedCarResponse.status()).toBe(404)
            expect(await deletedCarResponse.json()).toEqual({ status: 'error', message: 'Car not found' })
        })
    })
})