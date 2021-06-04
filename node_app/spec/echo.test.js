const echo = require('../controller/echo')
const req = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')

const prepare = () => req(express().use(bodyParser.json()).use(echo));


describe("/app/echo", ()=>{
    describe("GET /app/echo/echo_get", ()=>{
         it("basic case", async()=> {
            var res = await prepare().get("/echo_get")
            expect(res.status).toBe(200)
            expect(res.body).toEqual({message:"Echo from router..."})
         })
    })

    describe("GET /app/echo/echo_qs", ()=>{
        it("basis case", async()=>{
            var res = await prepare().get("/echo_qs?title=book&page=2")
            expect(res.status).toBe(200)
            expect(res.body).toEqual({title:"book",page:"2"})
        })
    })

    describe("GET /app/echo/echo_params", ()=>{
        it("basis case", async()=>{
            var res = await prepare().get('/echo_params/10')
            expect(res.status).toBe(200)
            expect(res.body).toEqual({params:"10"})
        })
    })

    describe("POST /app/echo/echo_post", ()=>{
        it("basis case", async()=>{
            var res = await (await prepare().post('/echo_post').send({id:1, name:"elon musk"}))
            expect(res.status).toBe(200)
            expect(res.body).toEqual({id:1, name:"elon musk"})
        })
    })
})





