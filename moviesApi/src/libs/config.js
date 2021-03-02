const params = process.env.DB_HOST ? {
  dialect: process.env.DB_DIALECT || 'sqlite',
  host: process.env.DB_HOST
} : {
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: 'bookTicketMovies-db.sqlite',
  define: {
    underscored: true
  },
  operatorsAliases: false
};

module.exports = {
  database: process.env.DB_DATABASE || 'bookTicketMovies',
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  params: params,  
  pool_id: process.env.POOL_ID || 'us-east-1_LTscZeblD',
  app_client_id: process.env.APP_CLIENT_ID || '4dica57860s1l1ue513u5k75ta',
  region: process.env.REGION || 'us-east-1',
  users_url: process.env.USERS_URL || 'http://127.0.0.1:3001/users/api/v1',
};