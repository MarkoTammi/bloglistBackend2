

// TESTS for blog API

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const helper = require('./testHelper')

describe('Delete existing blogs and create initial blogs', () => {
// Delete all existing blogs and save initial blogs to Mongo for tests

    beforeEach(async () => {
        await Blog.deleteMany({})
        let blogObject = new Blog(helper.initialBlogs[0])
        await blogObject.save()
        blogObject = new Blog(helper.initialBlogs[1])
        await blogObject.save()
    })

    test('Blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Number of blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

})


describe('Test content of a specific blog', () => {

    test('The first blog header content', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].title).toBe(helper.initialBlogs[0].title)
    })
    test('At least one blog with "Blog2" title', async () => {
        const response = await api.get('/api/blogs')
        const titles = response.body.map(r => r.title)
        expect(titles).toContain('Blog2')
    })
})

describe('Add one blog and test that # of blogs +1', () => {

    test('Add one blog and test that # of blogs +1', async () => {
        const initialResponse = await api.get('/api/blogs')
        const blogObject = new Blog(helper.initialBlogs[0])
        await api
            .post('/api/blogs')
            .send(blogObject)
        const secondResponse = await api.get('/api/blogs')
        expect(secondResponse.body.length).toBe(initialResponse.body.length + 1)
    })
    test('Added blog has the first blog header content', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[response.body.length - 1 ].title).toBe(helper.initialBlogs[0].title)
    })
})

describe('Blog without "likes', () => {
    test('Blog without "likes", after save shold be 0', async () => {
        const blogObject = new Blog(helper.blogWithout[0])
        await api
            .post('/api/blogs')
            .send(blogObject)
        const response = await api.get('/api/blogs')
        expect(response.body[response.body.length - 1 ].likes).toBe(0)
    })
    test('Blog without "likes", title is correct', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[response.body.length - 1 ].likes).toBe(0)
        expect(response.body[response.body.length - 1 ].title).toContain(helper.blogWithout[0].title)
    })
})

describe('Blog without "title', () => {
    test('Blog without "title", should return 400 Bad Reguest', async () => {
        const initialResponse = await api.get('/api/blogs')
        const blogObject = new Blog(helper.blogWithout[1])
        await api
            .post('/api/blogs')
            .send(blogObject)
            .expect(400)
        const secondResponse = await api.get('/api/blogs')
        expect(secondResponse.body.length).toBe(initialResponse.body.length)
    })
    test('Blog without "URL", should return 400 Bad Reguest', async () => {
        const initialResponse = await api.get('/api/blogs')
        const blogObject = new Blog(helper.blogWithout[2])
        await api
            .post('/api/blogs')
            .send(blogObject)
            .expect(400)
        const secondResponse = await api.get('/api/blogs')
        expect(secondResponse.body.length).toBe(initialResponse.body.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})