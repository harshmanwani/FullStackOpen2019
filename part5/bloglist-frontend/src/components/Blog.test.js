import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent} from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    const blog = {
        title: "Epstein didn't kill himself.",
        author: "Reddit User 69",
        url: "Who needs valid sources anyway?",
        likes: 69
    }

    let component 
    beforeEach(() => {
        component = render(<Blog blog={blog}/>)
    })

    test('beforeButton is displayed by default.', () => {
        const beforeButton = component.container.querySelector('.beforeButton')
        expect(beforeButton).toHaveStyle("display: block")
    })

    test('afterButton is not displayed by default.', () => {
        const afterButton = component.container.querySelector('.afterButton')
        expect(afterButton).toHaveStyle("display: none")
    })
    
    test('beforeButton contains the title and the author.', () => {
        const beforeButton = component.container.querySelector('.beforeButton')
        expect(beforeButton).toHaveTextContent(`${blog.title}`)
        expect(beforeButton).toHaveTextContent(`${blog.author}`)
    })

    test('afterButton displays everything specified in the blog.', () => {
        const afterButton = component.container.querySelector('.afterButton')
        expect(afterButton).toHaveTextContent(`${blog.title}`)
        expect(afterButton).toHaveTextContent(`${blog.author}`)
        expect(afterButton).toHaveTextContent(`${blog.url}`)
        expect(afterButton).toHaveTextContent(`${blog.likes}`)
    }) 

    test('clicking the view button results in changing the visiblity of divs', () => {
        const afterButton = component.container.querySelector('.afterButton')
        const beforeButton = component.container.querySelector('.beforeButton')
        const viewButton = component.getByText('view')
        fireEvent.click(viewButton)
        expect(afterButton).toHaveStyle('display: block')
        expect(beforeButton).toHaveStyle('display: none')
    })
    
    test('clicking the like button results in calling the designated function.', () => {
        const handleLike = jest.fn()
        component.rerender(<Blog blog={blog} handleLike={handleLike}/>)
        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
        expect(handleLike.mock.calls).toHaveLength(2)
    })
    
})