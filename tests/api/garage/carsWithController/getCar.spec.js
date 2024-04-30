import {expect, test, request as apiRequest} from "../../../../src/fixtures/userFixtures.js";
import {BRANDS} from "../../../../src/data/brands.js";
import {MODELS} from "../../../../src/data/models.js";
import CarsController from "../../../../src/controllers/CarsController.js";
import moment from "moment";



test.describe('Get cars', () => {
    const brands = Object.values(BRANDS)
    const models = Object.values(MODELS).flatMap(Object.values)

    let cars

    test.describe('Get available brands and models', async() => {
        test.beforeAll(async () => {
            const request = await apiRequest.newContext()
            cars = new CarsController(request)
        })

        test('Get all available brands', async () => {
            const response = await cars.getAllBrands()
            const body = await response.json()

            expect(response.status()).toBe(200)
            expect(body.status).toBe('ok')
            expect(body.data).toEqual(brands)
        })

        test('Get car brands by id', async () => {
            for (const brand of brands) {
                await test.step(`id ${brand.id}: ${brand.title}`, async ()=>{
                    const response = await cars.getCarBrandsById(brand.id)
                    const body = await response.json()

                    expect(response.status()).toBe(200)
                    expect(body.status).toBe('ok')
                    expect(body.data).toEqual(brand)
                })
            }
        })

        test('Get all available models', async () => {
            const response = await cars.getAllModels()
            const body = await response.json()

            expect(response.status()).toBe(200)
            expect(body.data).toEqual(models)
        })

        test('Get car models by id', async () => {
            for (const model of models) {
                await test.step(`id ${model.id}: ${model.title}`, async () => {
                    const response = await cars.getCarModelsById(model.id)
                    const body = await response.json()

                    expect(response.status()).toBe(200)
                    expect(body.status).toBe('ok')
                    expect(body.data).toEqual(model)
                })
            }
        })

        test('Get car models by brand id', async () => {
            for (const brand of brands) {
                await test.step(`id : `, async () => {
                    const response = await cars.getCarModelsByBrandId(brand.id)
                    const body = await response.json()

                    expect(response.status()).toBe(200)
                    expect(body.status).toBe('ok')
                    expect(body.data).toEqual(models.filter(model => model.carBrandId === brand.id))
                })
            }
        })
    })

    test.describe('Get user cars', () => {
        const mileage = Math.floor(Math.random() * 100)

        function getRandomAvailableBrand (brands) {
            const randomBrandId = brands[Math.floor(Math.random() * brands.length)].id;
            return brands.find(obj => obj.id === randomBrandId);
        }

        function getRandomAvailableBrandModel (brandId) {
            const brandModels = Object.values(MODELS[brandId])
            const randomModelId =  brandModels[Math.floor(Math.random() * brandModels.length)].id
            return  brandModels.find(obj => obj.id === randomModelId)
        }

        const brand1 = getRandomAvailableBrand(brands)
        const model1 = getRandomAvailableBrandModel(brand1.id)

        const brand2 = getRandomAvailableBrand(brands)
        const model2 = getRandomAvailableBrandModel(brand2.id)

        const requestBody1 = {
            "carBrandId": brand1.id,
            "carModelId": model1.id,
            "mileage": mileage
        }

        const requestBody2 = {
            "carBrandId": brand2.id,
            "carModelId": model2.id,
            "mileage": mileage
        }

        test.describe('Positive scenarios', () => {
            test('Get user cars', async ({getCarApiNewUser}) => {
                const createdCarResponse1 = await getCarApiNewUser.cars.createCar(requestBody1)
                const createdCarBody1 = await createdCarResponse1.json()

                const createdCarResponse2 = await getCarApiNewUser.cars.createCar(requestBody2)
                const createdCarBody2 = await createdCarResponse2.json()

                const gotCarsResponse = await getCarApiNewUser.cars.getUserCars()
                const gotCarsBody = await gotCarsResponse.json()

                const expectedCar1 = {
                    "id": createdCarBody1.data.id,
                    "carBrandId": requestBody1.carBrandId,
                    "carModelId": requestBody1.carModelId,
                    "initialMileage": createdCarBody1.data.initialMileage,
                    "carCreatedAt": moment(createdCarBody1.data.carCreatedAt).milliseconds(0).toISOString(),
                    "updatedMileageAt": moment(createdCarBody1.data.updatedMileageAt).milliseconds(0).toISOString(),
                    "mileage": requestBody1.mileage,
                    "brand": brand1.title,
                    "model": model1.title,
                    "logo": brand1.logoFilename
                }

                const expectedCar2 = {
                    "id": createdCarBody2.data.id,
                    "carBrandId": requestBody2.carBrandId,
                    "carModelId": requestBody2.carModelId,
                    "initialMileage": createdCarBody2.data.initialMileage,
                    "carCreatedAt": moment(createdCarBody2.data.carCreatedAt).milliseconds(0).toISOString(),
                    "updatedMileageAt": moment(createdCarBody2.data.updatedMileageAt).milliseconds(0).toISOString(),
                    "mileage": requestBody2.mileage,
                    "brand": brand2.title,
                    "model": model2.title,
                    "logo": brand2.logoFilename
                }

                expect(gotCarsResponse.status()).toBe(200)
                expect(gotCarsBody.status).toBe('ok')
                expect(gotCarsBody.data).toHaveLength(2)
                expect(gotCarsBody.data).toContainEqual(expectedCar1)
                expect(gotCarsBody.data).toContainEqual(expectedCar2)
            })

            test('Get user car by car id', async ({getCarApiNewUser}) => {
                const createdCarResponse = await getCarApiNewUser.cars.createCar(requestBody1)
                const createdCarBody = await createdCarResponse.json()

                const gotCarResponse = await getCarApiNewUser.cars.getUserCarById(createdCarBody.data.id)
                const gotCarBody = await gotCarResponse.json()

                expect(gotCarResponse.status()).toBe(200)
                expect(gotCarBody.status).toBe('ok')
                expect(gotCarBody.data).toMatchObject({
                    "id": createdCarBody.data.id,
                    "carBrandId": requestBody1.carBrandId,
                    "carModelId": requestBody1.carModelId,
                    "initialMileage": createdCarBody.data.initialMileage,
                    "carCreatedAt": moment(createdCarBody.data.carCreatedAt).milliseconds(0).toISOString(),
                    "updatedMileageAt": moment(createdCarBody.data.updatedMileageAt).milliseconds(0).toISOString(),
                    "mileage": requestBody1.mileage,
                    "brand": brand1.title,
                    "model": model1.title,
                    "logo": brand1.logoFilename
                })
            })
        })

        test.describe('Negative scenarios', () => {
            test('should return 401 when there is no authentication', async () => {
                const request = await apiRequest.newContext()
                cars = new CarsController(request)

                const response = await cars.getUserCars()
                expect(response.status()).toBe(401)
                expect(await response.json()).toEqual({ status: 'error', message: 'Not authenticated' })
            })

            test('should return 404 when there is no such car available', async ({getCarApiNewUser}) => {
                const createdCarResponse = await getCarApiNewUser.cars.createCar(requestBody1)
                const createdCarBody = await createdCarResponse.json()

                const gotCarResponse = await getCarApiNewUser.cars.getUserCarById(createdCarBody.data.id + 10)

                expect(gotCarResponse.status()).toBe(404)
                expect(await gotCarResponse.json()).toEqual({ status: 'error', message: 'Car not found' })
            })
        })
    })
})