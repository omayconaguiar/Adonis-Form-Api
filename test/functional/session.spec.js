const { test, trait } = use('Test/Suite')('06-Session')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

var faker = require('faker');
const fakeEmail = faker.internet.email()
const fakePassword = faker.internet.password()
const username = faker.internet.userName()

trait('Test/ApiClient')

test('it should create user with success', async ({ assert, client }) => {
  const sessionPayload = {
    email: fakeEmail,
    password:fakePassword,
    username: username,
    is_admin: 1
  }

  const response = await client
    .post('/register')
    .send(sessionPayload)
    .end()

  response.assertStatus(200)

  assert.exists(response.body)
})


test('it should return bearer token', async ({ assert, client }) => {
  const sessionPayload = {
    email: fakeEmail,
    password: fakePassword,
  }

  const response = await client
    .post('/authenticate')
    .send(sessionPayload)
    .end()

  response.assertStatus(200)
  assert.exists(response.body.token)
})




