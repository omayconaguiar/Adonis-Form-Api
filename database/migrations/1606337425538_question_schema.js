'use strict'

const Schema = use('Schema')

class QuestionSchema extends Schema {
  up () {
    this.create('questions', (table) => {
      table.increments()
      table.string('question', 30).notNullable();
      table.string('answer',100);
      table
        .integer('quiz_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('quizzes')
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    })
  }

  down () {
    this.drop('questions')
  }
}

module.exports = QuestionSchema
