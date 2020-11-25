'use strict'

const Schema = use('Schema')

class AlternativeSchema extends Schema {
  up () {
    this.create('alternatives', (table) => {
      table.increments();
      table.string('alternatives', 100).notNullable();
      table
        .integer('question_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('questions')
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
  }

  down () {
    this.drop('alternatives')
  }
}

module.exports = AlternativeSchema
