const todo = require('../controller/todo')
const req = require('supertest')
const express = require('express')
const bodyParser = require('body-parser');
const post = require('../../db/schema/todo');
const mongoose = require('mongoose')

const prepare = () => req(express().use(bodyParser.json()).use(todo));

beforeEach((done)=>{
    mongoose.connect(
        //url 
        "mongodb+srv://kin:kd0MNdBgDOs8Iy4O@cluster0.p7omz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            autoIndex: false,
        }, ()=>done()
    )
})

afterEach((done) =>{
    mongoose.connection.db.dropDatabase(()=>{
        mongoose.connection.close(()=> done() )
    })
})

describe("/app/no_auth", ()=>{
    describe("GET /app/no_auth/todos", ()=>{
        it('basic case', async()=>{
            const data = await post.create({
                order:0 , 
                title:"Day 0", 
            })
            const res = await prepare().get('/todos')
            expect(res.status).toBe(200) 
            expect(res.body).toEqual({
                success:true , 
                count: 1, 
                data: [
                    {
                        _id : data.id, 
                        order : data.order,  
                        title: data.title, 
                        createdAt: data.createdAt, 
                        __v : data.__v, 
                    } 
                ]
            })
        })
    })
 
    describe("POST /app/no_auth/todos", ()=>{
        it('basic case', async()=>{
            const res = await prepare().post("/todos").send({title:"test"})
            expect(res.status).toBe(200)
            expect(res.body.data.order).toBe(0) 
            expect(res.body.data.title).toBe("test")
        })

        it("check auto increment of order",async()=>{
            await post.create({
                order:0 , 
                title:"Day 0", 
            })
            const res = await prepare().post("/todos").send({title:"test"})
            expect(res.status).toBe(200)
            expect(res.body.data.order).toBe(1) 
            expect(res.body.data.title).toBe("test")
        })

        it('status 400', async()=>{
            const res = await prepare().post('/todos').send({title1:"test"})
            expect(res.status).toBe(400)
            expect(res.body).toEqual({                
                success:false,
                error: "add failed"
            })
        })
    })

    describe("GET /todos/:id", ()=>{
        it('basic case', async()=>{
            const data = await post.create({
                order:0 , 
                title:"Day 0", 
            })
            const res = await prepare().get('/todos/'+data.id)
            expect(res.status).toBe(200)
            expect(res.body).toEqual({
                success:true ,  
                data:{
                        _id : data.id, 
                        order : data.order,  
                        title: data.title, 
                        createdAt: data.createdAt, 
                        __v : data.__v, 
                } 
            })
        })
        it("wrong id", async()=>{
            const data = await post.create({
                order:0,
                title:"Day 0", 
            })
            const res = await prepare().get("/todos/"+"1235")
            expect(res.status).toBe(400)
            expect(res.body).toEqual({
                success:false,
                error:"get data failed"
            })
        })
    })

    describe("PUT /todos/:id", ()=>{
        it('basic case', async()=>{
            const data = await post.create({
                order:0 , 
                title:"Day 0", 
            })
            const res = await prepare().put('/todos/'+data.id).send({title:"Day 1"})
            expect(res.status).toBe(200)
            expect(res.body).toEqual({
                success:true ,  
                data:{
                        _id : data.id, 
                        order : data.order,  
                        title: "Day 1", 
                        createdAt: data.createdAt, 
                        __v : data.__v, 
                } 
            })
        })
        it('wrong id', async()=>{
            const data = await post.create({
                order:0 , 
                title:"Day 0", 
            })
            const res = await prepare().put('/todos/12343').send({title:"Day 1"})
            expect(res.status).toBe(400)
            expect(res.body).toEqual({
                success:false, 
                error:"update failed"
            })
        })
        it('invalid title', async()=>{
            const data = await post.create({
                order:0,
                title:"Day 0",
            })
            const res = await prepare().put('/todos/'+data.id).send({t:"Day 1"})
            expect(res.status).toBe(400)
            expect(res.body).toEqual({
                success:false, 
                error:"update failed"
            })
        })
    })
    
    describe("DELETE /todos/:id",()=>{
        it('basic case', async()=>{
            const data = await post.create({
                order:0,
                title:"Day 0",
            })
            const res = await prepare().delete('/todos/'+data.id)
            expect(res.status).toBe(200)
            expect(res.body).toEqual({
                success:true, 
                data:{}
            })
        })

        it("wrong id", async()=>{
            const data = await post.create({
                order:0,
                title:"Day 0",
            })
            const res = await prepare().delete('/todos/123')
            expect(res.status).toBe(400)
            expect(res.body).toEqual({
                success:false, 
                error: 'delete failed'
            })
        })
    })
})
