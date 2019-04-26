const express = require('express');
const controller = require('./reviews.controller');
const resource = '/reviews';
const router = express.Router();

router.route(resource + "/:productId")
    .get(controller.getAll)
    // .post(controller.create)

// router.route(resource + '/:id')
//     .get(controller.get)
//     .patch(controller.update)
//     .delete(controller.remove);

module.exports = router;
