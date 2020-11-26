"use strict";

const Database = use('Database')

/**
 * Resourceful controller for interacting with tweets
 */
class AlternativeController {
  /**
   * Create/save a new alternatives.
   * POST tweets
   */
  async store({ params, request, auth }) {
    const data = request.only(["alternatives"]);

    await ({ user_id: auth.user.id, ...data })

    const tweets = await Database
      .insert({alternatives: data.alternatives, question_id: params.question_id})
      .into('alternatives')

    return tweets;
  }
}

module.exports = AlternativeController;
