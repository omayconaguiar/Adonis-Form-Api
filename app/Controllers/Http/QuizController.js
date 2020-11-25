"use strict";

const Quiz = use("App/Models/Quiz");
const Database = use('Database')

/**
 * Resourceful controller for interacting with tweets
 */
class QuizController {
  /**
   * Show a list of all tweets.
   * GET tweets
   */
  async index() {
    const tweets = await Database
    .table('users')
    .innerJoin('quizzes', 'quizzes.user_id', ' users.id')
    .innerJoin('questions', 'questions.quiz_id', 'quizzes.id')

    var questions = []

    for(var j = 0; j < tweets.length; j++){
      var aux = {
          quizName: tweets[j].type_quiz,
          question: tweets[j].question,
          alternative: tweets[j].alternative,
          answer: tweets[j].answer? tweets[j].answer: null
      }
      questions.push(aux)


      var result = {
        quizz:{
          questions
        }
      }
    }
    return result;
  }

  /**
   * Create/save a new quiz.
   * POST tweets
   */
  async store({ request, auth }) {
    const data = request.only(["type_quiz", "question_quantity"]);
    const quiz = await Quiz.create({ user_id: auth.user.id, ...data });

    const admin = await Database
      .table('users')
      .where('users.id', '=', quiz.user_id)

    if(!admin.length){
      return response.status(401, "Somente usuários admins podem criar questionários.")
    }

    return quiz;
  }

  /**
   * Delete a quiz with id.
   * DELETE tweets/:id
   */
  async destroy({ params, auth }) {
    const quiz = await Quiz.findOrFail(params.id);

    if (quiz.user_id !== auth.user.id) {
      return response.status(401);
    }

    await quiz.delete();
  }
}

module.exports = QuizController;
