
//const Blog = require('../models/blog')


// Initial blogs for tests
const initialBlogs = [
    {
        title: 'Blog1',
        author: 'Marko1',
        url: 'http://www.example1.com',
        likes: 1,
    },
    {
        title: 'Blog2',
        author: 'Marko2',
        url: 'http://www.example2.com',
        likes: 2,
    }
]

const blogWithout = [
    {
        'title': 'BlogWithoutLikes',
        'author': 'Author of without likes',
        'url': 'http://www.example.com'
    },
    {
        'author': 'Author of without title',
        'url': 'http://www.example.com',
        'likes': 2
    },
    {
        'title': 'BlogWithoutURL',
        'author': 'Author of without URL',
    }
]


module.exports = {
    initialBlogs,
    blogWithout
}