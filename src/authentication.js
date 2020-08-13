const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication')
const { LocalStrategy } = require('@feathersjs/authentication-local')
const { expressOauth, OAuthStrategy } = require('@feathersjs/authentication-oauth')

class GithubStrategy extends OAuthStrategy {
  async getEntityData(profile) {
    const baseData = await super.getEntityData(profile)

    return {
      ...baseData,
      email: profile.email
    }
  }
}

module.exports = app => {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())
  authentication.register('github', new GithubStrategy())

  app.use('/authentication', authentication)
  app.configure(expressOauth())
}
