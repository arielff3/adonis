const { test, trait } = use('Test/Suite')('Session');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

trait('Test/ApiClient')

test('it should return JWT token when session created', async ({assert, client}) =>{
    const sessionPayLoad = {
        name: 'Ariel Franco',
        email: 'arielfrancoferreria4@gmail.com',
        password: '123456'
    }
    
    const user = await Factory
    .model('App/Models/User')
    .create(sessionPayLoad)

    const response = await client
        .post('/sessions')
        .send(sessionPayLoad)
        .end()
    
    response.assertStatus(200)
    assert.exists(response.body.token)
});