const todo = require('../controller/todo')
const req = require('supertest')
const express = require('express')
const bodyParser = require('body-parser');
const post = require('../../db/schema/todoTest');
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
                count: 1 , 
                data: [
                    {
                        _id : data.id, 
                        order : data.order,  
                        title: data.title, 
                        createAt: data.createAt, 
                        __v : data.__v, 
                    } 
                ]
            })
        })
    })
})