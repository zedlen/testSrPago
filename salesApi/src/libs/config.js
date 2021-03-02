const params = process.env.DB_HOST ? {
  dialect: process.env.DB_DIALECT || 'sqlite',
  host: process.env.DB_HOST
} : {
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: 'bookTicketSales-db.sqlite',
  define: {
    underscored: true
  },
  operatorsAliases: false
};

module.exports = {
  database: process.env.DB_DATABASE || 'bookTicketSales',
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  params: params,  
  pool_id: process.env.POOL_ID || 'us-east-1_HMXI2kFv0',
  app_client_id: process.env.APP_CLIENT_ID || '151o30k1rb8n3v2v3cl03o6s56',
  region: process.env.REGION || 'us-east-1',
  users_url: process.env.USERS_URL || 'http://127.0.0.1:3001/users/api/v1',
};