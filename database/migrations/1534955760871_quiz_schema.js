"use strict";

const Schema = use("Schema");

class QuizSchema extends Schema {
  up() {
    this.create("quizzes", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string('type_quiz', 30).notNullable().unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("quizzes");
  }
}

module.exports = QuizSchema;
