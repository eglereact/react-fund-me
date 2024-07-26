const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");
const { v4: uuidv4 } = require("uuid");
const fs = require("node:fs");
const md5 = require("md5");
const app = express();
const port = 3001;
const path = require("path");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react_fund_me",
});

connection.connect();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
// app.use(express.static('public'));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const checkSession = (req, _, next) => {
  const session = req.cookies["fund-session"];
  if (!session) {
    return next();
  }
  const sql = `
        SELECT id, name, email, role 
        FROM users
        WHERE session = ?
    `;
  connection.query(sql, [session], (err, rows) => {
    if (err) throw err;
    if (!rows.length) {
      return next();
    }
    req.user = rows[0];
    next();
  });
};

const checkUserIsAuthorized = (req, res, roles) => {
  if (!req.user) {
    res
      .status(401)
      .json({
        message: {
          type: "error",
          title: "Unauthorized",
          text: `You must be logged in`,
        },
        reason: "not-logged-in",
      })
      .end();
    return false;
  }
  if (!roles.includes(req.user.role)) {
    res
      .status(401)
      .json({
        message: {
          type: "error",
          title: "Unauthorized",
          text: `You are not authorized to view this information`,
        },
        reason: "not-authorized",
      })
      .end();
    return false;
  }
  return true;
};

app.use(checkSession);

const publicImagesPath = path.join(__dirname, "../fund-front/public/images");

const writeImage = (imageBase64) => {
  if (!imageBase64) {
    return null;
  }

  let type;
  let image;
  if (imageBase64.startsWith("data:image/png;base64,")) {
    type = "png";
    image = Buffer.from(
      imageBase64.replace(/^data:image\/png;base64,/, ""),
      "base64"
    );
  } else if (imageBase64.startsWith("data:image/jpeg;base64,")) {
    type = "jpg";
    image = Buffer.from(
      imageBase64.replace(/^data:image\/jpeg;base64,/, ""),
      "base64"
    );
  } else {
    throw new Error("Bad image format");
  }

  const filename = uuidv4() + "." + type;
  const imagePath = path.join(publicImagesPath, filename);

  try {
    fs.writeFileSync(imagePath, image);
    return filename;
  } catch (err) {
    throw new Error("Error saving image");
  }
};

app.post("/create-post", (req, res) => {
  if (!checkUserIsAuthorized(req, res, ["admin", "editor", "user"])) {
    return;
  }

  const filename = writeImage(req.body.image);

  const { title, text, category, user_id, amount } = req.body;

  if (!title || !text || !user_id || !amount || !category) {
    res.status(422).json({
      message: {
        type: "danger",
        text: "Title, text, user_id, amount, category are required.",
      },
    });
    return;
  }

  const slug = title.toLowerCase().replace(/ /g, "-");

  const sql =
    "INSERT INTO posts (url, title, text, image, user_id, amount, amountRaised, category, featured, approved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    sql,
    [
      slug,
      title,
      text,
      filename !== null ? "images/" + filename : null,
      user_id,
      amount,
      0,
      category,
      false,
      false,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({
          success: true,
          id: result.insertId,
          uuid: req.body.id,
          message: { type: "success", text: "Nice! Post added!" },
        });
      }
    }
  );
});

app.get("/admin/users", (req, res) => {
  if (!checkUserIsAuthorized(req, res, ["admin", "editor"])) {
    return;
  }

  const sql = `
        SELECT *
        FROM users`;

  connection.query(sql, (err, rows) => {
    if (err) throw err;
    res
      .json({
        users: rows,
      })
      .end();
  });
});

app.get("/admin/posts", (req, res) => {
  if (!checkUserIsAuthorized(req, res, ["admin", "editor"])) {
    return;
  }

  const sql = `
        SELECT 
      p.id,
      p.title,
      p.text,
      p.image,
      p.amount,
      p.amountRaised,
      p.featured,
      p.approved,
      p.category,
      u.name AS authorUsername
    FROM posts AS p
    LEFT JOIN users AS u
      ON p.user_id = u.id`;

  connection.query(sql, (err, rows) => {
    if (err) throw err;
    res
      .json({
        posts: rows,
      })
      .end();
  });
});

app.get("/web/posts", (req, res) => {
  const sql = `
    SELECT 
      p.id,
      p.title,
      p.text,
      p.image,
      p.amount,
      p.amountRaised,
      p.featured,
      p.approved,
      p.category,
      u.name AS authorUsername
    FROM posts AS p
    LEFT JOIN users AS u ON p.user_id = u.id
    WHERE p.approved = 1`;

  connection.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Database query error" });
      return;
    }
    res.json({ posts: rows }).end();
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!/\S+@\S+\.\S+/.test(email)) {
    res
      .status(422)
      .json({
        message: "There are mistakes in form.",
        errorsBag: {
          email: "Email is not correct.",
        },
      })
      .end();
    return;
  }

  const sql = `SELECT email FROM users WHERE email = ? `;

  connection.query(sql, [email], (err, rows) => {
    if (err) throw err;
    if (rows.length) {
      res
        .status(422)
        .json({
          message: "There are mistakes in form.",
          errors: {
            email: "Email already exist.",
          },
        })
        .end();
    } else {
      const sql = `
            INSERT INTO users (name, email, password)
            VALUES ( ?, ?, ? )
            `;
      connection.query(sql, [name, email, md5(password)], (err) => {
        if (err) throw err;
        res
          .status(201)
          .json({
            message: {
              type: "success",
              title: `Hello, ${name}`,
              text: `Welcome! To reactFUNDme`,
            },
          })
          .end();
      });
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const session = md5(uuidv4());

  const sql = `
            UPDATE users
            SET session = ?
            WHERE email = ? AND password = ?
        `;

  connection.query(sql, [session, email, md5(password)], (err, result) => {
    if (err) throw err;
    const logged = result.affectedRows;
    if (!logged) {
      res
        .status(401)
        .json({
          message: {
            type: "error",
            title: "Bad connection",
            text: `Wrong credentials`,
          },
        })
        .end();
      return;
    }
    const sql = `
            SELECT id, name, email, role
            FROM users
            WHERE email = ? AND password = ?
        `;
    connection.query(sql, [email, md5(password)], (err, rows) => {
      if (err) throw err;
      res.cookie("fund-session", session, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
      res
        .json({
          message: {
            type: "success",
            title: `Hello, ${rows?.[0]?.name}!`,
            text: `Welcome to back!`,
          },
          session,
          user: rows?.[0],
        })
        .end();
    });
  });
});

app.delete("/admin/delete/user/:id", (req, res) => {
  setTimeout((_) => {
    const { id } = req.params;

    const sql = `
        DELETE 
        FROM users 
        WHERE id = ? AND role != 'admin'
        `;

    connection.query(sql, [id], (err, result) => {
      if (err) throw err;
      const deleted = result.affectedRows;
      if (!deleted) {
        res
          .status(422)
          .json({
            message: {
              type: "info",
              title: "Users",
              text: `User is admin or user does not exist.`,
            },
          })
          .end();
        return;
      }
      res
        .json({
          message: {
            type: "success",
            title: "User",
            text: `User was deleted.`,
          },
        })
        .end();
    });
  }, 1500);
});

app.delete("/admin/delete/post/:id", (req, res) => {
  setTimeout(() => {
    const { id } = req.params;

    const sql = `
        DELETE 
        FROM posts 
        WHERE id = ?
        `;

    connection.query(sql, [id], (err, result) => {
      if (err) throw err;
      const deleted = result.affectedRows;
      if (!deleted) {
        res
          .status(422)
          .json({
            message: {
              type: "info",
              title: "Posts",
              text: `Post does not exist.`,
            },
          })
          .end();
        return;
      }
      res
        .json({
          message: {
            type: "success",
            title: "Post",
            text: `Post was deleted.`,
          },
        })
        .end();
    });
  }, 1500);
});

app.get("/admin/edit/user/:id", (req, res) => {
  setTimeout((_) => {
    if (!checkUserIsAuthorized(req, res, ["admin", "editor"])) {
      return;
    }

    const { id } = req.params;
    const sql = `
        SELECT id, name, email, role
        FROM users
        WHERE id = ?
        `;
    connection.query(sql, [id], (err, rows) => {
      if (err) throw err;
      if (!rows.length) {
        res
          .status(404)
          .json({
            message: {
              type: "info",
              title: "Users",
              text: `User does not exist.`,
            },
          })
          .end();
        return;
      }
      res
        .json({
          user: rows[0],
        })
        .end();
    });
  }, 1500);
});

app.put("/admin/update/user/:id", (req, res) => {
  setTimeout((_) => {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    if (!password) {
      const sql = `
            UPDATE users
            SET name = ?, email = ?, role = ?
            WHERE id = ?
            `;

      connection.query(sql, [name, email, role, id], (err, result) => {
        if (err) throw err;
        const updated = result.affectedRows;
        if (!updated) {
          res
            .status(404)
            .json({
              message: {
                type: "info",
                title: "Users",
                text: `User does not exist.`,
              },
            })
            .end();
          return;
        }
        res
          .json({
            message: {
              type: "success",
              title: "Users",
              text: `User was updated`,
            },
          })
          .end();
      });
    } else {
      const sql = `
                UPDATE users
                SET name = ?, email = ?, role = ?, password = ?
                WHERE id = ?
                `;

      connection.query(
        sql,
        [name, email, role, md5(password), id],
        (err, result) => {
          if (err) throw err;
          const updated = result.affectedRows;
          if (!updated) {
            res
              .status(404)
              .json({
                message: {
                  type: "info",
                  title: "Users",
                  text: `User does not exist.`,
                },
              })
              .end();
            return;
          }
          res
            .json({
              message: {
                type: "success",
                title: "Users",
                text: `User was updated`,
              },
            })
            .end();
        }
      );
    }
  }, 1500);
});

app.get("/donate/post/:id", (req, res) => {
  setTimeout(() => {
    const { id } = req.params;
    const sql = `
        SELECT title, amount , amountRaised
        FROM posts
        WHERE id = ?
        `;
    connection.query(sql, [id], (err, rows) => {
      if (err) throw err;
      if (!rows.length) {
        res
          .status(404)
          .json({
            message: {
              type: "info",
              title: "Post",
              text: `Post does not exist.`,
            },
          })
          .end();
        return;
      }
      res
        .json({
          post: rows[0],
        })
        .end();
    });
  }, 1500);
});

// app.put("/donated/post/:id", (req, res) => {
//   setTimeout(() => {
//     const { id } = req.params;
//     const { amount } = req.body;

//     const sql = `
//             UPDATE posts
//             SET title = ?, text = ?, approved = ?, featured = ?, amount = ?, category = ?
//             WHERE id = ?
//             `;

//     connection.query(
//       sql,
//       [title, text, approved, featured, amount, category, id],
//       (err, result) => {
//         if (err) throw err;
//         const updated = result.affectedRows;
//         if (!updated) {
//           res
//             .status(404)
//             .json({
//               message: {
//                 type: "info",
//                 title: "Posts",
//                 text: `Post does not exist.`,
//               },
//             })
//             .end();
//           return;
//         }
//         res
//           .json({
//             message: {
//               type: "success",
//               title: "Posts",
//               text: `Post was updated`,
//             },
//           })
//           .end();
//       }
//     );
//   }, 1500);
// });

app.get("/admin/edit/post/:id", (req, res) => {
  setTimeout((_) => {
    if (!checkUserIsAuthorized(req, res, ["admin", "editor"])) {
      return;
    }

    const { id } = req.params;
    const sql = `
        SELECT id, title, text, approved, featured, amount, category
        FROM posts
        WHERE id = ?
        `;
    connection.query(sql, [id], (err, rows) => {
      if (err) throw err;
      if (!rows.length) {
        res
          .status(404)
          .json({
            message: {
              type: "info",
              title: "Posts",
              text: `Post does not exist.`,
            },
          })
          .end();
        return;
      }
      res
        .json({
          user: rows[0],
        })
        .end();
    });
  }, 1500);
});

app.put("/admin/update/post/:id", (req, res) => {
  setTimeout(() => {
    const { id } = req.params;
    const { title, text, approved, featured, amount, category } = req.body;

    const sql = `
            UPDATE posts
            SET title = ?, text = ?, approved = ?, featured = ?, amount = ?, category = ?
            WHERE id = ?
            `;

    connection.query(
      sql,
      [title, text, approved, featured, amount, category, id],
      (err, result) => {
        if (err) throw err;
        const updated = result.affectedRows;
        if (!updated) {
          res
            .status(404)
            .json({
              message: {
                type: "info",
                title: "Posts",
                text: `Post does not exist.`,
              },
            })
            .end();
          return;
        }
        res
          .json({
            message: {
              type: "success",
              title: "Posts",
              text: `Post was updated`,
            },
          })
          .end();
      }
    );
  }, 1500);
});

app.post("/logout", (req, res) => {
  setTimeout((_) => {
    const session = req.cookies["fund-session"];

    const sql = `
                UPDATE users
                SET session = NULL
                WHERE session = ?
            `;

    connection.query(sql, [session], (err, result) => {
      if (err) throw err;
      const logged = result.affectedRows;
      if (!logged) {
        res
          .status(401)
          .json({
            message: {
              type: "error",
              title: "Logout failed",
              text: `Invalid login data`,
            },
          })
          .end();
        return;
      }
      res.clearCookie("book-session");
      res
        .json({
          message: {
            type: "success",
            title: `Disconnected`,
            text: `You have successfully logged out`,
          },
        })
        .end();
    });
  }, 1500);
});

app.listen(port, (_) => {
  console.log(`reactFUNDme app listening on port ${port}`);
});
