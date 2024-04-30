import BaseController from "./BaseController.js";


export default class CarsController extends BaseController {
    #CREATE_CARS_PATH = '/api/cars'
    #GET_ALL_BRANDS_PATH = '/api/cars/brands'
    #GET_ALL_MODELS_PATH = '/api/cars/models'
    #GET_CAR_BRANDS_BY_ID_PATH = '/api/cars/brands/#'
    #GET_CAR_MODELS_BY_ID_PATH = '/api/cars/models/#'
    #GET_CAR_MODELS_BY_BRAND_ID_PATH = '/api/cars/models?carBrandId=#'
    #GET_USER_CARS_PATH = '/api/cars'
    #GET_USER_CAR_BY_ID_PATH = '/api/cars/#'
    #UPDATE_USER_CAR_BY_ID = '/api/cars/#'
    #DELETE_USER_CAR_BY_ID = '/api/cars/#'

    async createCar (data) {
        return this._request.post(this.#CREATE_CARS_PATH, {data})
    }

    async getAllBrands () {
        return this._request.get(this.#GET_ALL_BRANDS_PATH)
    }

    async getAllModels () {
        return this._request.get(this.#GET_ALL_MODELS_PATH)
    }

    async getCarBrandsById (id) {
        return this._request.get(this.#GET_CAR_BRANDS_BY_ID_PATH.replace('#', id))
    }

    async getCarModelsById (id) {
        return this._request.get(this.#GET_CAR_MODELS_BY_ID_PATH.replace('#', id))
    }

    async getCarModelsByBrandId (id) {
        return this._request.get(this.#GET_CAR_MODELS_BY_BRAND_ID_PATH.replace('#', id))
    }

    async getUserCars () {
        return this._request.get(this.#GET_USER_CARS_PATH)
    }

    async getUserCarById (id) {
        return this._request.get(this.#GET_USER_CAR_BY_ID_PATH.replace('#', id))
    }

    async updateUserCarById (id, data) {
        return this._request.put(this.#UPDATE_USER_CAR_BY_ID.replace('#', id), {data})
    }

    async deleteUserCarById (id) {
        return this._request.delete(this.#DELETE_USER_CAR_BY_ID.replace('#', id))
    }
}