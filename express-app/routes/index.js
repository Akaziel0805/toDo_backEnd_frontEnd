var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo",
});

connection.connect();

/* GET home page. */
router.get("/tasks", function (req, res, next) {
  connection.query("SELECT * from tasks", (error, results, fields) => {
    if (error) throw error;
    res.send({ results });
  });
});

router.post("/tasks", function (req, res, next) {
  connection.query(
    `INSERT INTO tasks (task) VALUES ('${req.body.todo}')`,
    (error, results, fields) => {
      if (error) throw error;
      res.send({ results });
    }
  );
});

router.delete("/tasks/:id", function (req, res, next) {
  connection.query(
    `DELETE FROM tasks WHERE id = ('${req.params.id}')`,
    (error, results, fields) => {
      if (error) throw error;
      res.send({ results });
    }
  );
});

router.put("/tasks/:id", function (req, res, next) {
  connection.query(
    `UPDATE tasks SET task = ('${req.body.task}') WHERE id = ('${req.params.id}')`,
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.send({ results });
    }
  );
});

module.exports = router;
