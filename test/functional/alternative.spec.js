const { test, trait } = use('Test/Suite')('02-Alternative')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const sessionPayloadCredentials = {
  email: 'maycon@maycon.com',
  password: '12345'
}

const Database = use('Database')

trait('Test/ApiClient')

test('it should creation alternative with sucess', async ({ assert, client }) => {

  const users = await Database
  .insert({email: 'testeAlternative@teste.com', password: 'password', username:'mayconAlternative', is_admin:1})
  .into('users')
  .returning('id')

const quiz = await Database
  .insert({type_quiz: 'alternative', user_id: users})
  .into('quizzes')
  .returning('id')

const question = await Database
  .insert({question: 'alternative', quiz_id: quiz})
  .into('questions')
  .returning('id')

const responseAuth = await client
  .post('/authenticate')
  .send(sessionPayloadCredentials)
  .end()

var alternatives = {
  alternatives: 'alternativesPost'
}

const response = await client
  .post('/alternatives/'+ question)
  .send(alternatives)
  .header('Authorization', 'Bearer ' + responseAuth.body.token)
  .end()

if(response.status === 204){
  response.assertStatus(204)
}else{
  response.assertStatus(200)
}

assert.exists(response.body)
})


