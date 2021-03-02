const params = process.env.DB_HOST ? {
  dialect: process.env.DB_DIALECT || 'sqlite',
  host: process.env.DB_HOST
} : {
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: 'bookTicketUsers-db.sqlite',
  define: {
    underscored: true
  },
  operatorsAliases: false
};

module.exports = {
  database: process.env.DB_DATABASE || 'bookTicketUsers',
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  params: params,  
  pool_id: process.env.POOL_ID || 'us-east-1_xJtm4Nqqk	',
  app_client_id: process.env.APP_CLIENT_ID || '7pnhu314qgl4q51j80p94q37vg',
  region: process.env.REGION || 'us-east-1',
};