const { test, trait } = use('Test/Suite')('06-Quiz')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Quiz = use('App/Models/Quiz')

const sessionPayloadCredentials = {
  email: 'maycon@maycon.com',
  password: '12345'
}

const Database = use('Database')

trait('Test/ApiClient')

test('it should creation quiz with sucess', async ({ assert, client }) => {
  const sessionPayload = {
    type_quiz: 'quizPost'
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

  if(response.status === 204){
    response.assertStatus(204)
  }else{
    response.assertStatus(200)
  }

  assert.exists(response.body)
})

test('it should delete a quiz', async ({ assert, client }) => {
  const responseAuth = await client
    .post('/authenticate')
    .send(sessionPayloadCredentials)
    .end()

    const sessionPayload = {
      type_quiz: 'quizPostD'
    }

  await client
    .post('/quizzes')
    .send(sessionPayload)
    .header('Authorization', 'Bearer ' + responseAuth.body.token)
    .end()

  const quizz = await Database
    .select('id')
    .from('quizzes')
    .orderBy('id', 'desc')

  const response = await client
    .delete('/quizzes/'+ quizz[0].id)
    .header('Authorization', 'Bearer ' + responseAuth.body.token)
    .send()
    .end()

  if(response.status === 204){
    response.assertStatus(204)
  }else{
    response.assertStatus(200)
  }
  assert.exists(response.body)
})




