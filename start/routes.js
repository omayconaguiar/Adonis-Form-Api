"use strict";

const Route = use("Route");

Route.post("/register", "AuthController.register");
Route.post("/authenticate", "AuthController.authenticate");

Route.get("/quizzes", "QuizController.index");

Route.group(() => {
  Route.post("/alternatives/:question_id", "AlternativeController.store").middleware(["admin"]);
  Route.post("/quizzes", "QuizController.store").middleware(["admin"]);
  Route.delete("/quizzes/:id", "QuizController.destroy").middleware(["admin"]);
  Route.post("/questions/:quiz_id", "QuestionController.store").middleware(["admin"]);
  Route.put("/answers/:question_id", "AnswerController.update");
  Route.get("/answers", "AnswerController.index");
}).middleware(["auth"]);
