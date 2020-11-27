const { test, trait } = use('Test/Suite')('06-Answer')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */


const sessionPayloadCredentials = {
  email: 'maycon@maycon.com',
  password: '12345'
}

const Database = use('Database')

trait('Test/ApiClient')

test('it should creation answer with sucess', async ({ assert, client }) => {
  const users = await Database
    .insert({email: 'teste@teste.com', password: 'password', username:'maycon', is_admin:1})
    .into('users')
    .returning('id')

  const quiz = await Database
    .insert({type_quiz: 'answersPost', user_id: users})
    .into('quizzes')
    .returning('id')

  const question = await Database
    .insert({question: 'answersPost', quiz_id: quiz})
    .into('questions')
    .returning('id')

  const responseAuth = await client
    .post('/authenticate')
    .send(sessionPayloadCredentials)
    .end()

  await Database
    .insert({alternatives: 'answersPost', question_id: question})
    .into('alternatives')
    .returning('id')

  const alt = await Database
    .select('alternatives')
    .from('alternatives')
    .innerJoin('questions', 'questions.id', ' alternatives.question_id')
    .where('questions.id', '=',  question)


  const sessionPayloadd = {
    answer: alt[0].alternatives
  }

  const response = await client
    .put('/answers/'+ question)
    .send(sessionPayloadd)
    .header('Authorization', 'Bearer ' + responseAuth.body.token)
    .end()

  if(response.status === 204){
    response.assertStatus(204)
  }else{
    response.assertStatus(200)
  }

  assert.exists(response.body)
})

test('it should get all answers with sucess', async ({ assert, client }) => {
  const responseAuth = await client
    .post('/authenticate')
    .send(sessionPayloadCredentials)
    .end()

  const response = await client
    .get('/answers')
    .header('Authorization', 'Bearer ' + responseAuth.body.token)
    .end()

  if(response.status === 204){
    response.assertStatus(204)
  }else{
    response.assertStatus(200)
  }

  assert.exists(response.body)
})



