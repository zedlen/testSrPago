import express from 'express';
import consign from 'consign';

const app = express();

// Routes
consign({cwd: __dirname})
  .include('libs/config.js')  
  .include('const')
  .include('libs/hal.js')
  .then('db.js')
  .include('libs/auth_service.js')
  .then('libs/middlewares.js')
  .then('routing.js')
  .then('routes')
  .then('libs/boot.js')
  .into(app)