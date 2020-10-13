const request = require('supertest')
const app = require('../src/app');
const User = require('../src/models/user');

const { userOne, userOneId, setupDatabase } = require('./fixtures/db');


beforeEach(setupDatabase);

test('Should sign up a new user', async () => {
    await request(app).post('/users').send({
        name: 'Andrew',
        email: 'andrew@example.com',
        password: 'MyPass777!'
    }).expect(201)
});

test('Should log in existing user', async() => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);

    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    expect(response.body).toMatchObject({
        user: {
            name: 'Mike',
            email: 'mike@example.com'
        },
        token: user.tokens[1].token
    })

    expect(user.password).not.toBe('56what!!!')
})

test('Should should not login user if credentials are invalid', async() => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'thisIsNotMyPassword'
    }).expect(400);
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
})

test('Should delete profile for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
})

test('Should not delete profile for user if not authenticated', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
})