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
  async update({ params, request, auth }) {
    const data = request.only(["answer"]);

    await ({ user_id: auth.user.id, ...data });

    const tweets = await Database
    .table('questions')
    .where('id', '=', params.question_id)
    .update('answer', data.answer)

    return tweets;
  }

  async index({auth}) {
    await ({ user_id: auth.user.id});

    const tweets = await Database
    .table('questions')
    .whereNotNull('questions.answer')
    .where('id', '=', auth.user.id)

    return tweets;
  }
}

module.exports = AnswerController;
