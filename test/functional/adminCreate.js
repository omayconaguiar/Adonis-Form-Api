const { test, trait } = use('Test/Suite')('Session')

trait('Test/ApiClient')

test('it should creation a email and know password', async ({ assert, client }) => {
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
