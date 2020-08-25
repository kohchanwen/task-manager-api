const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user', async() => {
   const response = await request(app).post('/users').send({
       name: 'Chubs123',
       email: 'Chubs@gmail.com',
       password: 'passord!123'
   }).expect(201)

   // Assert the database was changed correctly
   const user = await User.findById(response.body.user._id)
   expect(user).not.toBeNull()

})

test('Should login existing user', async() => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login nonexistent user', async() => {
    await request(app).post('/users/login').send({
        email: 'test123@gmail.com',
        password: 'asgadgrh123!'
    }).expect(400)
})

test('Should get profile for user', async() => {
    await request(app)
         .get('/users/me')
         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
         .send()
         .expect(200)
})

test('Should not get profile for unAuth user', async() => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async() => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not delete account for unAuth user', async() => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async() => {
    await request(app)
         .post('/users/me/avatar')
         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
         .attach('upload','tests/fixtures/profile-pic.jpg')
         .expect(200)

})

test('Should update valid user fields', async() => {
    await request(app)
          .patch('/users/me')
          .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
          .send({
              name: 'Jess'
          })
          .expect(200)
          const user = await User.findById(userOneId)
          expect(user.name).toEqual('Jess')
})