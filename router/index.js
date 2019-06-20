const userModule  = require('../modules/user');
const express = require('express');

module.exports = (app) => {
  // Decode uri component for all params in GET requests
  app.get('*', (req, res, next) => {
    if (req.query) {
      Object.keys(req.query).forEach((key) => {
        req.query[key] = decodeURIComponent(req.query[key]);
      })
    }
    return next();
  })

  /* Server Routes */
  app.use('/api/user', userModule.routes.mount(createRouter()));

  app.get('/*', (req, res) => {
      res.status(404).send('Not found');
  })
}

function createRouter() {
  return express.Router()
}
