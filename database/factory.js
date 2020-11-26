'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')

/** @type {import('@adonisjs/lucid/src/Factory')} */


  Factory.blueprint('App/Models/User', (faker, i, data= {}) => {
    return {
      email: faker.email(),
      password: faker.string(),
      username: faker.username(),
      ...data
    }
  })


