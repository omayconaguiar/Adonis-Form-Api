"use strict";

const Question = use("App/Models/Question");

/**
 * Resourceful controller for interacting with tweets
 */
class QuestionController {
  /**
   * Create/save a new question.
   * POST tweets
   */
  async store({ request }) {
    const data = request.only(["question", "alternative"]);

    const question = await Question.create({ quiz_id: request.params.quiz_id, ...data });

    return question;
  }
}

module.exports = QuestionController;
