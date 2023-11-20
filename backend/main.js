const express = require("express");

const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(8080, () => {
  console.log("연결되었습니다.");
});

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "postData",
  connectionLimit: 10,
});

app.get("/posts", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    const exec = conn.query("SELECT * FROM posts", (err, rows) => {
      conn.release();
      console.log("SQL", exec.sql);
      if (err) {
        res.status(500).send("Error retreiving the data");
      } else {
        console.log("welcome", rows);
        res.json(rows);
      }
    });
  });
});

app.get("/comments", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    const exec = conn.query("SELECT * FROM comments", (err, rows) => {
      conn.release();
      console.log("SQL", exec.sql);
      if (err) {
        res.status(500).send("Error retreiving the data");
      } else {
        console.log("welcome", rows);
        res.json(rows);
      }
    });
  });
});

app.put("/posts", (req, res) => {
  // DB 커넥션 풀에서 커넥션을 가져옵니다.
  pool.getConnection((err, conn) => {
    if (err) {
      res.status(500).send("Error connecting to the database");
      return;
    }
    console.log(req.body); // 요청 본문 로그
    console.log(Array.isArray(req.body)); // req.body가 배열인지 확인

    if (!Array.isArray(req.body)) {
      res.status(400).send("Invalid data format: Expected an array");
      return;
    }

    const posts = req.body;

    conn.beginTransaction((err) => {
      if (err) {
        conn.release();
        res.status(500).send("Error starting transaction");
        return;
      }

      const queries = posts.map((post) =>
        conn.query(
          "INSERT IGNORE INTO posts (id, title, description) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description)",
          [post.id, post.title, post.description]
        )
      );

      Promise.all(queries)
        .then(() => {
          conn.commit((err) => {
            if (err) {
              throw err; // 이 에러는 아래 catch 문에서 잡힐 것입니다.
            }
            console.log("Transaction Completed Successfully");
            conn.release();
            res.send("Posts updated successfully");
          });
        })
        .catch((err) => {
          conn.rollback(() => {
            conn.release();
            res.status(500).send("Error during transaction");
          });
        });
    });
  });
});

app.put("/comments", (req, res) => {
  // DB 커넥션 풀에서 커넥션을 가져옵니다.
  pool.getConnection((err, conn) => {
    if (err) {
      res.status(500).send("Error connecting to the database");
      return;
    }
    console.log(req.body); // 요청 본문 로그
    console.log(Array.isArray(req.body)); // req.body가 배열인지 확인

    if (!Array.isArray(req.body)) {
      res.status(400).send("Invalid data format: Expected an array");
      return;
    }

    const comments = req.body;

    conn.beginTransaction((err) => {
      if (err) {
        conn.release();
        res.status(500).send("Error starting transaction");
        return;
      }

      const queries = comments.map((comment) =>
        conn.query(
          "INSERT IGNORE INTO comments (id, commentid, username, comment) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE id = VALUES(id), commentid = VALUES(commentid), username = VALUES(username), comment = VALUES(comment)",
          [comment.id, comment.commentid, comment.username, comment.comment]
        )
      );

      Promise.all(queries)
        .then(() => {
          conn.commit((err) => {
            if (err) {
              throw err; // 이 에러는 아래 catch 문에서 잡힐 것입니다.
            }
            console.log("Transaction Completed Successfully");
            conn.release();
            res.send("Posts updated successfully");
          });
        })
        .catch((err) => {
          conn.rollback(() => {
            conn.release();
            res.status(500).send("Error during transaction");
          });
        });
    });
  });
});

app.delete("/posts/:id", (req, res) => {
  const postId = req.params.id; // URL 파라미터에서 id 값을 가져옵니다.

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("데이터베이스 연결 실패:", err);
      res.status(500).send("Database connection failed");
      return;
    }

    // DELETE SQL 쿼리를 실행합니다.
    const query = "DELETE FROM posts WHERE id = ?";
    connection.query(query, [postId], (err, result) => {
      connection.release(); // 커넥션을 커넥션 풀로 반환합니다.

      if (err) {
        console.error("데이터 삭제 실패:", err);
        res.status(500).send("Failed to delete post");
        return;
      }

      // DELETE 쿼리가 성공적으로 실행되면, 클라이언트에 성공 메시지를 보냅니다.
      if (result.affectedRows > 0) {
        res.status(200).send(`Post with ID ${postId} deleted successfully`);
      } else {
        res.status(404).send("Post not found");
      }
    });
  });
});

app.delete("/comments/:id", (req, res) => {
  const commentId = req.params.id; // URL 파라미터에서 id 값을 가져옵니다.

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("데이터베이스 연결 실패:", err);
      res.status(500).send("Database connection failed");
      return;
    }

    // DELETE SQL 쿼리를 실행합니다.
    const query = "DELETE FROM comments WHERE commentid = ?";
    connection.query(query, [commentId], (err, result) => {
      connection.release(); // 커넥션을 커넥션 풀로 반환합니다.

      if (err) {
        console.error("데이터 삭제 실패:", err);
        res.status(500).send("Failed to delete post");
        return;
      }

      // DELETE 쿼리가 성공적으로 실행되면, 클라이언트에 성공 메시지를 보냅니다.
      if (result.affectedRows > 0) {
        res.status(200).send(`Post with ID ${commentId} deleted successfully`);
      } else {
        res.status(404).send("Post not found");
      }
    });
  });
});
