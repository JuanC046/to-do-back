const express = require("express");
const router = express.Router();

const controller = require("./controller");
const response = require("../../network/response");

// User
router.post("/user/create", async (req, res) => {
  await controller
    .createUser(req.body)
    .then((data) => {
      let answer = {
        id: data.insertId,
        name: req.body.name,
        loggedIn: true,
      };
      response.success(req, res, answer, 201);
    })
    .catch((e) => {
      response.error(req, res, e, 500);
    });
});

router.get("/user/login/:e_mail/:password", async (req, res) => {
  await controller
    .login(req.params.e_mail)
    .then((data) => {
      if (data.length > 0) {
        if (data[0].password !== req.params.password) {
          response.error(req, res, "Password incorrect", 404);
          return;
        }

        let answer = {
          id: data[0].id,
          name: data[0].name,
          loggedIn: true,
        };
        response.success(req, res, answer, 200);
      } else {
        response.error(req, res, "User don't exist", 404);
      }
    })
    .catch((e) => {
      response.error(req, res, e, 500);
    });
});

// Task
router.get("/tasks/:userId", async (req, res) => {
  await controller
    .listTasks(req.params.userId)
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch((e) => {
      response.error(req, res, e, 500);
    });
});
router.post("/task/create", (req, res) => {
  controller
    .createTask(req.body)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch((e) => {
      response.error(req, res, e, 500);
    });
});

module.exports = router;
