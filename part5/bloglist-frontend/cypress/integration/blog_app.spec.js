describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        
        const user = {
            username: 'root',
            name: 'admin',
            password: '1234'
        }
        cy.request('POST', 'http://localhost:3001/api/users', user)
        cy.visit('http://localhost:3000')
    })
    it('Login form is shown', function() {
        cy.contains('log in to application')
    })

    describe('Login', function() {
        it('suceeds with correct credentials', function () {
            cy.get('#username').type('root')
            cy.get('#password').type('1234')
            cy.get('#loginButton').click()
            cy.contains('admin logged in')
        })
        it('fails with invalid credentials', function () {
            cy.get('#username').type('wrong')
            cy.get('#password').type('false')
            cy.get('#loginButton').click()
            cy.contains('Username or password invalid')
            .should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function() {
        beforeEach(function () {
            cy.request('POST', 'http://localhost:3001/api/login', {username: 'root', password: '1234'}).then(response => {
                localStorage.setItem('savedUser', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            })
        })
        it('All blogs are sorted by likes', function () {
            const blogs = [
                {
                    title: 'second',
                    author: 'aposdfpoaksdpfo',
                    url: 'kapsodkfpoaskdfok',
                    likes: 420
                },
                {
                    title: 'third',
                    author: 'kmobvockoxll',
                    url: 'm1o2i3maso0',
                    likes: 69
                },
                {
                    title: 'first',
                    author: '123kmv00xcyöa',
                    url: 'mm123lo00ccxx',
                    likes: 1337
                }
            ]
            for (let i in blogs) {
                cy.request(
                    {
                    method: 'POST', 
                    url: 'http://localhost:3001/api/blogs',
                    body: blogs[i],
                    headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('savedUser')).token}`}
                    }
                )
            }
            cy.visit('http://localhost:3000')
            cy.get('.blog').eq(0).contains('first')
            cy.get('.blog').eq(1).contains('second')
            cy.get('.blog').eq(2).contains('third')
        })
    
        describe('A blog can be ...', function () {
            beforeEach(function () {
                cy.contains('new blog').click()
                cy.get('#titleInput').type('Epstein didn\'t kill himself')
                cy.get('#authorInput').type('Pizza Gate')
                cy.get('#urlInput').type('Na fam')
                cy.get('#createButton').click()
                cy.contains('Successfully created blog')
            })
            it('created', function() {
                cy.contains('Epstein didn\'t kill himself by Pizza Gate')
            })
            it('liked', function () {
                cy.contains('Epstein didn\'t kill himself by Pizza Gate').parent().contains('view').click()
                cy.contains('Epstein didn\'t kill himself').parent().contains('like').click()
                cy.contains('Epstein didn\'t kill himself').parent().contains('Likes: 1')
            })
            describe('deleted', function () {
                it('... by its owner', function () {
                    cy.contains('Epstein didn\'t kill himself by Pizza Gate').parent().contains('view').click()
                    cy.contains('Epstein didn\'t kill himself').parent().contains('delete').click()
                    cy.contains('Epstein didn\'t kill himself').should('not.exist')
                })
                it('... but not from anyone else', function () {
                    cy.contains('log out').click()
                    const otherUser = {
                        username: 'otheruser',
                        name: 'notadmin',
                        password: '1234'
                    }
                    cy.request('POST', 'http://localhost:3001/api/users', otherUser)
                    cy.request('POST', 'http://localhost:3001/api/login', {username: 'otheruser', password: '1234'}).then(response => {
                        localStorage.setItem('savedUser', JSON.stringify(response.body))
                        cy.visit('http://localhost:3000')
                    })
                    cy.contains('Epstein didn\'t kill himself by Pizza Gate').parent().contains('view').click()
                    cy.contains('delete').should('not.exist')
                })
            })
        })
    })
})