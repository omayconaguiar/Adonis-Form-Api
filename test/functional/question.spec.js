const { test, trait } = use('Test/Suite')('03-Question')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const sessionPayloadCredentials = {
  email: 'maycon@maycon.com',
  password: '12345'
}

const Database = use('Database')

trait('Test/ApiClient')

test('it should creation question with sucess', async ({ assert, client }) => {
  const users = await Database
  .insert({email: 'testeQuestion@teste.com', password: 'password', username:'mayconQuestion', is_admin:1})
  .into('users')
  .returning('id')

  const quiz = await Database
    .insert({type_quiz: 'question', user_id: users})
    .into('quizzes')
    .returning('id')

  const responseAuth = await client
    .post('/authenticate')
    .send(sessionPayloadCredentials)
    .end()

  const sessionPayload = {
    question: 'question'
  }

  const response = await client
    .post('/questions/'+ quiz)
    .send(sessionPayload)
    .header('Authorization', 'Bearer ' + responseAuth.body.token)
    .end()

  if(response.status === 204){
    response.assertStatus(204)
  }else{
    response.assertStatus(200)
  }

  assert.exists(response.body)
})

