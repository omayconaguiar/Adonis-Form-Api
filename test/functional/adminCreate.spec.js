const { test, trait } = use('Test/Suite')('01-adminCreate')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

trait('Test/ApiClient')

test('it should creation a know email and password to reuse', async ({ assert, client }) => {
  const sessionPayload = {
    email: 'maycon@maycon.com',
    password: '12345',
    username: 'may',
    is_admin: 1
  }

  const response = await client
    .post('/register')
    .send(sessionPayload)
    .end()

  response.assertStatus(200)

  assert.exists(response.body)
})
