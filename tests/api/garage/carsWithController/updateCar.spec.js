import {expect, test} from "../../../../src/fixtures/userFixtures.js";
import {BRANDS} from "../../../../src/data/brands.js";
import {MODELS} from "../../../../src/data/models.js";
import moment from "moment";

test.describe.only('Update car', () => {
    const mileage = Math.floor(Math.random() * 100)
    const brands = Object.values(BRANDS)

    function getRandomAvailableBrand (brands) {
        const randomBrandId = brands[Math.floor(Math.random() * brands.length)].id;
        return brands.find(obj => obj.id === randomBrandId);
    }

    function getRandomAvailableBrandModel (brandId) {
        const brandModels = Object.values(MODELS[brandId])
        const randomModelId =  brandModels[Math.floor(Math.random() * brandModels.length)].id
        return  brandModels.find(obj => obj.id === randomModelId)
    }

    const brand = getRandomAvailableBrand(brands)
    const model = getRandomAvailableBrandModel(brand.id)

    const createCarRequestBody = {
        "carBrandId": brand.id,
        "carModelId": model.id,
        "mileage": mileage
    }

    let createdCarBody

    test.beforeEach(async ({apiNewUser}) => {
        const createdCarResponse = await apiNewUser.cars.createCar(createCarRequestBody)
       createdCarBody = await createdCarResponse.json()
    })

    test.describe('Positive scenarios', () => {
        test('Update car mileage', async ({apiNewUser}) => {
            const updateCarRequestBody = {
                ...createCarRequestBody,
                "mileage": createCarRequestBody.mileage + 50
            }

            const updatedCarResponse =
                await apiNewUser.cars.updateUserCarById(createdCarBody.data.id, updateCarRequestBody)
            const updatedCarBody = await updatedCarResponse.json()
            const expected = {
                "id": createdCarBody.data.id,
                "carBrandId": updateCarRequestBody.carBrandId,
                "carModelId": updateCarRequestBody.carModelId,
                "initialMileage": createCarRequestBody.mileage,
                "updatedMileageAt": expect.any(String),
                "carCreatedAt": moment(createdCarBody.data.carCreatedAt).milliseconds(0).toISOString(),
                "mileage": updateCarRequestBody.mileage,
                "brand": brand.title,
                "model": model.title,
                "logo": brand.logoFilename
            }

            expect(updatedCarResponse.status()).toBe(200)
            expect(updatedCarBody.status).toBe('ok')
            expect(updatedCarBody.data).toEqual(expected)
            expect(moment(updatedCarBody.data.updatedMileageAt).isAfter(createdCarBody.data.updatedMileageAt))
        })

        test('Update car brand and model', async ({apiNewUser}) => {
            const brand1 = getRandomAvailableBrand(brands)
            const model1 = getRandomAvailableBrandModel(brand1.id)

            const updateCarRequestBody = {
                ...createCarRequestBody,
                "carBrandId": brand1.id,
                "carModelId": model1.id,
            }

            const updatedCarResponse =
                await apiNewUser.cars.updateUserCarById(createdCarBody.data.id, updateCarRequestBody)
            const updatedCarBody = await updatedCarResponse.json()
            const expected = {
                "id": createdCarBody.data.id,
                "carBrandId": updateCarRequestBody.carBrandId,
                "carModelId": updateCarRequestBody.carModelId,
                "initialMileage": createCarRequestBody.mileage,
                "updatedMileageAt": moment(createdCarBody.data.updatedMileageAt).milliseconds(0).toISOString(),
                "carCreatedAt": moment(createdCarBody.data.carCreatedAt).milliseconds(0).toISOString(),
                "mileage": updateCarRequestBody.mileage,
                "brand": brand1.title,
                "model": model1.title,
                "logo": brand1.logoFilename
            }

            expect(updatedCarResponse.status()).toBe(200)
            expect(updatedCarBody.status).toBe('ok')
            expect(updatedCarBody.data).toEqual(expected)
        })

        test('Update car model', async ({apiNewUser}) => {
            const model1 = getRandomAvailableBrandModel(brand.id)

            const updateCarRequestBody = {
                ...createCarRequestBody,
                "carModelId": model1.id,
            }

            const updatedCarResponse =
                await apiNewUser.cars.updateUserCarById(createdCarBody.data.id, updateCarRequestBody)
            const updatedCarBody = await updatedCarResponse.json()
            const expected = {
                "id": createdCarBody.data.id,
                "carBrandId": updateCarRequestBody.carBrandId,
                "carModelId": updateCarRequestBody.carModelId,
                "initialMileage": createCarRequestBody.mileage,
                "updatedMileageAt": moment(createdCarBody.data.updatedMileageAt).milliseconds(0).toISOString(),
                "carCreatedAt": moment(createdCarBody.data.carCreatedAt).milliseconds(0).toISOString(),
                "mileage": updateCarRequestBody.mileage,
                "brand": brand.title,
                "model": model1.title,
                "logo": brand.logoFilename
            }

            expect(updatedCarResponse.status()).toBe(200)
            expect(updatedCarBody.status).toBe('ok')
            expect(updatedCarBody.data).toEqual(expected)
        })

        test('Update "Created at" date', async ({apiNewUser}) => {
            const updateCarRequestBody = {
                ...createCarRequestBody,
                "carCreatedAt": (moment(createdCarBody.data.carCreatedAt).add(2, 'days')).toISOString()
            }

            const updatedCarResponse =
                await apiNewUser.cars.updateUserCarById(createdCarBody.data.id, updateCarRequestBody)
            const updatedCarBody = await updatedCarResponse.json()
            const expected = {
                "id": createdCarBody.data.id,
                "carBrandId": updateCarRequestBody.carBrandId,
                "carModelId": updateCarRequestBody.carModelId,
                "initialMileage": createCarRequestBody.mileage,
                "updatedMileageAt": moment(createdCarBody.data.updatedMileageAt).milliseconds(0).toISOString(),
                "carCreatedAt": updateCarRequestBody.carCreatedAt,
                "mileage": updateCarRequestBody.mileage,
                "brand": brand.title,
                "model": model.title,
                "logo": brand.logoFilename
            }

            expect(updatedCarResponse.status()).toBe(200)
            expect(updatedCarBody.status).toBe('ok')
            expect(updatedCarBody.data).toEqual(expected)
        })
    })

    test.describe('Negative scenarios', () => {
        test('should return 400 when new mileage is less then initial one', async ({apiNewUser}) => {
            const createdCarResponse = await apiNewUser.cars.createCar(createCarRequestBody)
            const createdCarBody = await createdCarResponse.json()

            const updateCarRequestBody = {
                ...createCarRequestBody,
                "mileage": createCarRequestBody.mileage - 50
            }

            const updatedCarResponse =
                await apiNewUser.cars.updateUserCarById(createdCarBody.data.id, updateCarRequestBody)

            expect(updatedCarResponse.status()).toBe(400)
            expect(await updatedCarResponse.json()).toEqual({ status: 'error', message: 'New mileage is less then previous entry' })
        })
    })
})