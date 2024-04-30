import {test as base, expect as baseExpect, request as baseRequest} from "@playwright/test";
import APIClient from "../client/APIClient.js";
import {USERS} from "../data/users.js";

export const test = base.extend({
    apiExistingUser: async ({}, use) => {
        const client = await APIClient.authenticate({
            email: USERS.IRA_KOZAK.email,
            password: USERS.IRA_KOZAK.password,
            remember: false
        })
        await use(client)
    },

    request: async ({}, use)=> {
        const req = await request.newContext()
        await use (req)

        await req.dispose()
    },

    createCarApiNewUser: async ({}, use) => {
        const client = await APIClient.authenticateWithNewUser(USERS.TEST_TESTOVICH_CREATE_CAR)
        await use(client)
        await client.user.deleteUser()
    },

    getCarApiNewUser: async ({}, use) => {
        const client = await APIClient.authenticateWithNewUser(USERS.TEST_TESTOVICH_GET_CAR)
        await use(client)
        await client.user.deleteUser()
    },

    updateCarApiNewUser: async ({}, use) => {
        const client = await APIClient.authenticateWithNewUser(USERS.TEST_TESTOVICH_UPDATE_CAR)
        await use(client)
        await client.user.deleteUser()
    },

    deleteCarApiNewUser: async ({}, use) => {
        const client = await APIClient.authenticateWithNewUser(USERS.TEST_TESTOVICH_DELETE_CAR)
        await use(client)
        await client.user.deleteUser()
    }
})

export const expect = baseExpect

export const request = baseRequest
