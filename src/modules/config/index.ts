
const environment = process.env.NODE_ENV || 'local'

const config = {
  http: {
    port: 3001,
  },
  auth: {
    saltRounds: 10,
    accessTokenExpiration: 60 * 60 * 8, // 8 hours
    pepper: '69zjVVhVmfNrpUsKUABCu56rpP5qu35rCleAY2wYcnYq54t3I2008foGaqgEwLK8NhJkIr',
    jwtOpts: {
      algorithm: 'HS512',
      issuer: `co.cms.${environment}`,
    }
  }
}

export {
  config
}
