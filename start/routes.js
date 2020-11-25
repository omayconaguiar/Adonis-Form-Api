"use strict";

const Route = use("Route");

Route.post("/register", "AuthController.register");
Route.post("/authenticate", "AuthController.authenticate");

Route.get("/quizzes", "QuizController.index");

Route.group(() => {
  Route.post("/quizzes", "QuizController.store")
  Route.delete("/quizzes/:id", "QuizController.destroy");
  Route.post("/questions/:quiz_id", "QuestionController.store");
  Route.put("/answers/:question_id", "AnswerController.update");
  Route.get("/answers", "AnswerController.index");
}).middleware(["auth"]);
