const express = require('express');
const controller = require('./users.controller');
const { hidePassword, encryptPassword } = require('./middlewares');
const { role } = require('../auth/middlewares');
const resource = '/users';

const route = express.Router();

route.use(encryptPassword);

route.route(resource)
    .get(controller.getAll)
    .post(controller.create);

route.route(resource + "/:id")
    .patch(controller.update);

route.use(hidePassword);

module.exports =  route;
