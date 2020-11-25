"use strict";

const Model = use("Model");

class Question extends Model {
  quiz() {
    return this.belongsTo("App/Models/Quiz");
  }
}

module.exports = Question;
