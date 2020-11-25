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
    const data = request.only(["question"]);

    const question = await Question.create({ quiz_id: request.params.quiz_id, ...data });


    const admin = await Database
      .table('users')
      .where('users.id', '=', quiz.user_id)

      const admin = await Database
      .table('users')
      .where('users.id', '=', quiz.user_id)

    if(!admin.is_admin){
      return response.status(401).send("Somente usuários admins podem realizar essa tarefa.")
    }

    return question;
  }
}

module.exports = QuestionController;
