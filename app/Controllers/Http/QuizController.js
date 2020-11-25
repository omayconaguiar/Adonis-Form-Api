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



    const another = await Database
      .table('alternatives')
      .innerJoin('questions', 'questions.id', ' alternatives.question_id')
      .innerJoin('quizzes', 'quizzes.id', ' questions.quiz_id')

    var questions = []
    var alternatives = []

    for(var k = 0; k < another.length; k++){
      var alt = {
        QuestionAlternative: another[k].alternatives,
        ResponsableQuizz : another[k].type_quiz
      }
      alternatives.push(alt)
    }

    for(var j = 0; j < tweets.length; j++){
      var aux = {
          quizName: tweets[j].type_quiz,
          question: tweets[j].question? tweets[j].question: null,
          answer: tweets[j].answer? tweets[j].answer: null
      }
      questions.push(aux)

      var result = {
        alternatives,
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
  async store({ request, auth, response }) {
    const data = request.only(["type_quiz", "question_quantity"]);
    const quiz = await Quiz.create({ user_id: auth.user.id, ...data });

    const admin = await Database
      .table('users')
      .where('users.id', '=', quiz.user_id)

    if(!admin.is_admin){
      return response.status(401).send("Somente usuários admins podem realizar essa tarefa.")
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

    const admin = await Database
      .table('users')
      .where('users.id', '=', quiz.user_id)

    if(!admin.is_admin){
      return response.status(401).send("Somente usuários admins podem realizar essa tarefa.")
    }

    await quiz.delete();
  }
}

module.exports = QuizController;
