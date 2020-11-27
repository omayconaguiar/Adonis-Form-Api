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
  async store({ params, request, auth, response }) {
    const data = request.only(["alternatives"]);

    await ({ user_id: auth.user.id, ...data })

    const alts = await Database
      .select('alternatives')
      .from('alternatives')

    for(var i=0; i<alts.length; i++) {
      if(data.alternatives === alts[i].alternatives){
        return response.status(409).send("Alternativa ja escolhida")
      }
    }

    const tweets = await Database
      .insert({alternatives: data.alternatives, question_id: params.question_id})
      .into('alternatives')

    return tweets;
  }
}

module.exports = AlternativeController;
