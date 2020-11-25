'use strict'

const Schema = use('Schema')

class QuestionSchema extends Schema {
  up () {
    this.create('questions', (table) => {
      table.increments()
      table.string('question', 30).notNullable();
      table.string('alternative', 100).notNullable();
      table.string('answer',100)
      table.timestamps();
      table
      .integer('quiz_id')
      .references('id')
      .inTable('quizzes')
    })
  }

  down () {
    this.drop('questions')
  }
}

module.exports = QuestionSchema
