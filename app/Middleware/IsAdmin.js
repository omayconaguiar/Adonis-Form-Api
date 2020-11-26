'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')

class IsAdmin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response, auth }, next) {
    const admin = await Database
      .table('users')
      .where('users.id', '=', auth.user.id)

    if(!admin[0].is_admin){
      return response.status(401).send("Somente usuários admins podem realizar essa tarefa.")
    }

    await next()
  }
}

module.exports = IsAdmin
