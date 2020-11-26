"use strict";

const Database = use('Database')

/**
 * Resourceful controller for interacting with tweets
 */
class AnswerController {
  /**
   * Create/save a new answer.
   * POST tweets
   */
  async update({ params, request, auth, response}) {
    const data = request.only(["answer"]);
    var aux = []
    var alternatives = []

    await ({ user_id: auth.user.id, ...data });

    const another = await Database
      .table('alternatives')
      .innerJoin('questions', 'questions.id', ' alternatives.question_id')
      .where('questions.id', '=',  params.question_id)

    for(var i= 0; i < another.length; i++) {
      aux = another[i].alternatives
      alternatives.push(aux)
    }

    if (!alternatives.includes(data.answer)) {
      return response.status(401).send("Marcação errada, utilize somente:[" + alternatives + "] como resposta")
    }

    const tweets = await Database
    .table('questions')
    .where('id', '=', params.question_id)
    .update('answer', data.answer)

    return tweets;
  }

  async index({auth}) {
    await ({ user_id: auth.user.id});

    const tweets = await Database
    .select('question', 'answer')
    .from('questions')
    .innerJoin('quizzes', 'quizzes.id', ' questions.quiz_id')
    .whereNotNull('questions.answer')
    .where('quizzes.user_id', '=', auth.user.id)

    return tweets;
  }
}

module.exports = AnswerController;
