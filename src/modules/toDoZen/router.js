const express = require('express');
const router = express.Router();

const controller = require('./controller');
const response = require('../../network/response');
const { route } = require('../../app');

// User
router.post('/user/create', async (req, res) => {
    await controller.createUser(req.body)
        .then((data) => {
            response.success(req, res, data, 201);
        })
        .catch((e) => {
            response.error(req, res, e, 500);
        });
});

router.get('/user/login/:e_mail/:password', async (req, res) => {
    await controller.login(req.params.e_mail, req.params.password)
        .then((data) => {
            if (data.length > 0) {
                console.log(data);
                let answer = {
                    id: data[0].id,
                    name: data[0].name,
                }
                response.success(req,res, answer, 200);
            } else {
                response.error(req, res, false, 404);
            }
        })
        .catch((e) => {
            response.error(req, res, e, 500);
        });
});

// Task
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