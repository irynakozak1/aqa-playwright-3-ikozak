import BaseController from "./BaseController.js";


export default class AuthController extends BaseController {
    #SIGN_UP_PATH = '/api/auth/signup'
    #SIGN_IN_PATH = '/api/auth/signin'

    async signUp (data) {
        return this._request.post(this.#SIGN_UP_PATH, {data})
    }

    async signIn ({email, password, remember = false}) {
        return this._request.post(this.#SIGN_IN_PATH, {
            data: {
                email,
                password,
                remember
            }
        })
    }
}