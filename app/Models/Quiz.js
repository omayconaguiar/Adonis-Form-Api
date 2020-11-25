"use strict";

const Model = use("Model");

class Quiz extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  question() {
    return this.hasMany("App/Models/Question");
  }
}

module.exports = Quiz;
