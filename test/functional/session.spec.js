const { test, trait } = use('Test/Suite')('Session')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

/** @type {typeof import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')


trait('Test/ApiClient')

test('it should return bearer token', async ({ assert, client }) => {
  const sessionPayload = {
    email: 'maayconaguiar11@hotmail.com',
    password: '12345'
  }
  const user = await Factory
    .model('App/Models/User')
    .create(sessionPayload)

  const response = await client
    .post('/authenticate')
    .send(sessionPayload)
    .end()

  response.assertStatus(200)
  assert.exists(response.body.token)
})
