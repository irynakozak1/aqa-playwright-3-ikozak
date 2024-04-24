import {test, expect, request as apiRequest} from "../../../src/fixtures/userGaragePage.js";
import {MODELS} from "../../../src/data/models.js";
import {BRANDS} from "../../../src/data/brands.js";
import {USER_IRA_STORAGE_STATE_PATH} from "../../../src/constants.js";


test.describe.only('Create cars', ()=>{
    test.describe('Positive scenarios', ()=>{
        test.afterAll(async ()=>{
            const request = await apiRequest.newContext({
                storageState: USER_IRA_STORAGE_STATE_PATH
            })

            const carResponse = await request.get('/api/cars')
            const cars = await carResponse.json()

            await Promise.all(
                cars.data.map((car) => request.delete(`/api/cars/${car.id}`))
            )
        })
        test('Create cars of all available brands and models', async ({request})=>{
            for (const brand of Object.values(BRANDS)) {
                for (const model of Object.values(MODELS[brand.id])) {
                    await test.step(`Create car with brand "${brand.title}" and model "${model.title}"`, async ()=>{
                        const requestBody = {
                            "carBrandId": brand.id,
                            "carModelId": model.id,
                            "mileage": Math.floor(Math.random() * 100)
                        }
                        const response = await request.post('/api/cars', {
                            data: requestBody
                        })

                        const body = await response.json()
                        const expected = {
                            "id": expect.any(Number),
                            "carBrandId": requestBody.carBrandId,
                            "carModelId": requestBody.carModelId,
                            "initialMileage": requestBody.mileage,
                            "updatedMileageAt": expect.any(String),
                            "carCreatedAt": expect.any(String),
                            "mileage": requestBody.mileage,
                            "brand": brand.title,
                            "model": model.title,
                            "logo": brand.logoFilename

                        }

                        expect(response.status()).toBe(201)
                        expect(body.status).toBe('ok')
                        expect(body.data).toEqual(expected)
                    })
                }
            }
        })
    })

    test.describe('Negative scenarios', ()=>{
        const brands = Object.values(BRANDS)
        const randomAvailableBrandId = brands[Math.floor(Math.random() * brands.length)].id

        const brandModels = Object.values(MODELS[randomAvailableBrandId])
        const randomAvailableModelId =  brandModels[Math.floor(Math.random() * brandModels.length)].id

        const mileage = Math.floor(Math.random() * 100)

        test.afterAll(async ()=>{
            const request = await apiRequest.newContext({
                storageState: USER_IRA_STORAGE_STATE_PATH
            })

            const carResponse = await request.get('/api/cars')
            const cars = await carResponse.json()

            await Promise.all(
                cars.data.map((car) => request.delete(`/api/cars/${car.id}`))
            )
        })

        test('should return 401 when there is no authentication', async ()=>{
            const request = await apiRequest.newContext()

            const requestBody = {
                "carBrandId": randomAvailableBrandId,
                "carModelId": randomAvailableModelId,
                "mileage": mileage
            }
            const response = await request.post('/api/cars', {
                data: requestBody
            })

            expect(response.status()).toBe(401)
            expect(await response.json()).toEqual({ status: 'error', message: 'Not authenticated' })
        })

        test('should return 400 when "carModelId" key is missing', async ({request})=>{
            const requestBody = {
                "carBrandId": randomAvailableBrandId,
                "mileage": mileage
            }
            const response = await request.post('/api/cars', {
                data: requestBody
            })

            expect(response.status()).toBe(400)
            expect(await response.json()).toEqual({ status: 'error', message: 'Car model id is required' })
        })

        test('should return 400 when "carBrandId" key is missing', async ({request})=>{
            const requestBody = {
                "carModelId": randomAvailableModelId,
                "mileage": mileage
            }
            const response = await request.post('/api/cars', {
                data: requestBody
            })

            expect(response.status()).toBe(400)
            expect(await response.json()).toEqual({ status: 'error', message: 'Car brand id is required' })
        })

        test('should return 400 when "mileage" key is missing', async ({request})=>{
            const requestBody = {
                "carBrandId": randomAvailableBrandId,
                "carModelId": randomAvailableModelId
            }
            const response = await request.post('/api/cars', {
                data: requestBody
            })

            expect(response.status()).toBe(400)
            expect(await response.json()).toEqual({ status: 'error', message: 'Mileage is required' })
        })

        test('should return 404 when value for "carBrandId" is not found', async ({request})=>{
            const lastBrandId = brands[brands.length - 1].id

            const requestBody = {
                "carBrandId": lastBrandId + 1,
                "carModelId": randomAvailableModelId,
                "mileage": mileage
            }
            const response = await request.post('/api/cars', {
                data: requestBody
            })

            expect(response.status()).toBe(404)
            expect(await response.json()).toEqual({ status: 'error', message: 'Brand not found' })
        })

        test('should return 404 when value for "carModeldId" is not found', async ({request})=> {
            const lastModelId = brandModels[brandModels.length - 1].id

            const requestBody = {
                "carBrandId": randomAvailableBrandId,
                "carModelId": lastModelId + 1,
                "mileage": mileage
            }
            const response = await request.post('/api/cars', {
                data: requestBody
            })

            expect(response.status()).toBe(404)
            expect(await response.json()).toEqual({status: 'error', message: 'Model not found'})
        })

        test('should return 400 when mileage value is a string', async ({request})=> {
            const requestBody = {
                "carBrandId": randomAvailableBrandId,
                "carModelId": randomAvailableModelId,
                "mileage": "one hundred twenty two"
            }
            const response = await request.post('/api/cars', {
                data: requestBody
            })

            expect(response.status()).toBe(400)
            expect(await response.json()).toEqual({status: 'error', message: 'Invalid mileage type'})
        })

        test('should return 400 when cars limit is reached', async ({request})=>{
            const carsLimit = 25
            for (let i = 1; i <= carsLimit + 1; i++){
                const requestBody = {
                    "carBrandId": randomAvailableBrandId,
                    "carModelId": randomAvailableModelId,
                    "mileage": mileage
                }
                const response = await request.post('/api/cars', {
                    data: requestBody
                })

                if (i > carsLimit){
                    expect(response.status()).toBe(400)
                    expect(await response.json()).toEqual({ status: 'error', message: 'Cars limit reached' })
                }
            }
        })
    })
})