const { test, trait } = use('Test/Suite')('Session')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Quiz = use('App/Models/Quiz')

/** @type {typeof import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')

const sessionPayloadCredentials = {
  email: 'maycon@maycon.com',
  password: '12345'
}

var faker = require('faker');
var type = faker.lorem.word()

trait('Test/ApiClient')

test('it should creation quiz with sucess', async ({ assert, client }) => {
  const sessionPayload = {
    type_quiz: type
  }

  const responseAuth = await client
    .post('/authenticate')
    .send(sessionPayloadCredentials)
    .end()


  const response = await client
    .post('/quizzes')
    .send(sessionPayload)
    .header('Authorization', 'Bearer ' + responseAuth.body.token)
    .end()

  response.assertStatus(200)
  assert.exists(response.body)
})

test('it should return all the quiz with questions and alternatives', async ({ assert, client }) => {
  const response = await client
    .get('/quizzes')
    .end()

  response.assertStatus(200|| 204)
  assert.exists(response.body)
})

test('it should delete a quiz', async ({ assert, client }) => {
  const responseAuth = await client
    .post('/authenticate')
    .send(sessionPayloadCredentials)
    .end()

  const response = await client
    .delete('/quizzes/1')
    .send()
    .header('Authorization', 'Bearer ' + responseAuth.body.token)
    .end()

  response.assertStatus(200)
  assert.exists(response.body)
})





