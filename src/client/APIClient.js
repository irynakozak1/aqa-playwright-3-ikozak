import UsersController from "../controllers/UsersController.js";
import CarsController from "../controllers/CarsController.js";
import {request} from "@playwright/test";
import AuthController from "../controllers/AuthController.js";

export default class APIClient {
    constructor(apiRequest) {
        this.user = new UsersController(apiRequest)
        this.cars = new CarsController(apiRequest)
    }

    static async authenticateWithNewUser (registerData) {
        const client = await request.newContext()
        const authController = new AuthController(client)
        await authController.signUp(registerData)
        return new APIClient(client)
    }

    static async authenticate (userData) {
        const client = await request.newContext()
        const authController = new AuthController(client)
        await authController.signIn(userData)
        return new APIClient(client)
    }
}