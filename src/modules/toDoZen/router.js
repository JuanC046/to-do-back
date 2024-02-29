const express = require('express');
const router = express.Router();

const controller = require('./controller');
const response = require('../../network/response');

router.get('/tasks/:userId', async (req, res) => {
    await controller.listTasks(req.params.userId)
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch((e) => {
            response.error(req, res, e, 500);
        });
});




module.exports = router;