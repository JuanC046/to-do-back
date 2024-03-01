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

router.post("/user/login", async (req, res) => {
  console.log(req.body);
  await controller
    .login(req.body.email)
    .then((data) => {
      if (data.length > 0) {
        if (data[0].password !== req.body.password) {
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
router.get("/task/list/:userId", async (req, res) => {
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
      response.success(req, res, "Task created successfully", 201);
    })
    .catch((e) => {
      response.error(req, res, e, 500);
    });
});

router.put("/task/update", (req, res) => {
  controller
    .updateTask(req.body)
    .then((data) => {
      response.success(req, res, "Task updated successfully", 200);
    })
    .catch((e) => {
      response.error(req, res, e, 500);
    });
});

router.delete("/task/delete", (req, res) => {
  controller
    .deleteTask(req.body)
    .then((data) => {
      response.success(req, res, "Task deleted successfully", 200);
    })
    .catch((e) => {
      response.error(req, res, e, 500);
    });
});

module.exports = router;
