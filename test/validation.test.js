import babel from "babel-jest"
import app from "../index.js"
import request from "supertest"
// import { request } from "express";

describe("POST /Login", () => {
    describe("given username and password", () => {
        test("get response status", async () => {
            const response = await request(app).post('/login').send({
                "username" : "Khalimahh",
                "password" : "Gymnas.2911"
            })
            expect(response.statusCode).toBe(200)
        })

        test("check if token is given", async () => {
            const response = await request(app).post('/login').send({
                "username" : "Khalimahh",
                "password" : "Gymnas.2911"
            })
            expect(response.headers).toHaveProperty('auth-token')
        })
    })

    describe("given several wrong input", () => {
        test("get status code empty username input", async () => {
            const response = await request(app).post('/login').send({
                "username" : "",
                "password" : "gymnas"
            })
            expect(response.statusCode).toBe(400)
        })
        test("check resposen of empty username input", async () => {
            const response = await request(app).post('/login').send({
                "username" : "",
                "password" : "gymnas"
            })
            expect(response.body).toEqual({'message' : 'Usename dan password tidak boleh kosong'})
        })

        test('check if login but the auth token is exists', async () => {
            const response = await request(app).post('/login').withCredentials({'auth-token' : 'afjkajdfkajkdfnlewhiajdhjafdhjkhf'})
                .send({
                    "username" : "",
                    "password" : "gymnas"
                });
            
        })
    })
})