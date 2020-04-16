

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

    test('All blogs are returned', async () => {
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

describe('Delete one blog', () => {
    test('Succeed with status 204, lenght is -1 and no body[1] title exist', async () => {
        const initialResponse = await api.get('/api/blogs')
        await api
            .delete(`/api/blogs/${initialResponse.body[1].id}`)
            .expect(204)
        const secondResponse = await api.get('/api/blogs')
        expect(secondResponse.body.length).toBe(initialResponse.body.length-1)

        const titles = secondResponse.body.map(r => r.title)
        expect(titles).not.toContain(initialResponse.body[1].title)
    })
})

describe('Update one blog', () => {
    test('Succeed if "likes" update is +11', async () => {
        console.log('To be done')

        // Create blog to be updated
        const firstBlogObject = new Blog(helper.initialBlogs[0])
        const firstResponse = await api
            // eslint-disable-next-line indent
                                    .post('/api/blogs')
            // eslint-disable-next-line indent
                                    .send(firstBlogObject)
        // Blog which update the first one
        const secondBlogObject = new Blog(helper.updateBlog[0])
        const secondResponse = await api
                                    .put(`/api/blogs/${firstResponse.body.id}`)
                                    .send(secondBlogObject)

        // Expect increase of 'blog.likes' by +11
        expect(secondResponse.body.likes - firstResponse.body.likes).toBe(11)

    })
})

afterAll(() => {
    mongoose.connection.close()
})