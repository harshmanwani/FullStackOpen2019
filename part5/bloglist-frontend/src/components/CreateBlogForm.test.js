import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent} from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'

describe('<CreateBlogForm />', () => {
    test('calls designated create-blog function with right details', () => {
        const createBlog = jest.fn()
        const component = render(<CreateBlogForm createBlog={createBlog}/>)
        const form = component.getByTestId('form')
        const titleInput = component.getByTestId('titleInput')
        const authorInput = component.getByTestId('authorInput')
        const urlInput = component.getByTestId('urlInput')
        fireEvent.change(titleInput, {target: {value: 'Epstein didn\'t kill himself.'}})
        fireEvent.change(authorInput, {target: {value: 'Pizza Gate'}})
        fireEvent.change(urlInput, {target: {value: 'NoSourcesHereJustFromTwitterLoL'}})
        fireEvent.submit(form)
        expect(createBlog.mock.calls[0][0]["title"]).toBe('Epstein didn\'t kill himself.')
        expect(createBlog.mock.calls[0][0]["author"]).toBe('Pizza Gate')
        expect(createBlog.mock.calls[0][0]["url"]).toBe('NoSourcesHereJustFromTwitterLoL')
    })
})