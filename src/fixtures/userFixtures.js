import {test as base, expect as baseExpect, request as baseRequest} from "@playwright/test";
import APIClient from "../client/APIClient.js";
import {USERS} from "../data/users.js";
import { faker } from '@faker-js/faker'

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

    apiNewUser: async ({}, use) => {
        const client = await APIClient.authenticateWithNewUser({
            'name': "Test",
            'lastName': "Testovich",
            'email': faker.internet.email(),
            'password': "Qwer1234",
            'repeatPassword': "Qwer1234"
        })
        await use(client)
        await client.user.deleteUser()
    }
})

export const expect = baseExpect

export const request = baseRequest
