"use strict";

const Database = use('Database')

/**
 * Resourceful controller for interacting with tweets
 */
class QuestionController {
  /**
   * Create/save a new question.
   * POST tweets
   */
  async store({ request, params}) {
    const data = request.only(["question"]);

    const tweets = await Database
    .insert({question: data.question, quiz_id: params.quiz_id})
    .into('questions')

    return tweets;
  }
}

module.exports = QuestionController;
