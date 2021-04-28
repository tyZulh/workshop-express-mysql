require('dotenv').config();
const express = require('express');
const mysql = require('./db');
const PORT = process.env.PORT;

const app = express()

app.use(express.json())

mysql.connect((err) => {
  if (err) {
    console.error('error connecting to the db');
  } else {
    console.log('connected to the db')
  }
})

app.get('/users', (req, res) => {
  mysql.promise().query(`SELECT * FROM user`)
    .then(result => {
      res.status(200).json(result[0])
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Internal server error')
    })
})

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT firstname, lastname FROM user WHERE id = ?`

  mysql.promise().query(sql, [id])
    .then(result => {
      if( result[0].length) {
        res.status(200).json(result[0])
      } else {
        res.status(404).send('Ressource not found')
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal server error')
    })
})

app.post('/users', (req, res) => {
  const { user } = req.body;

  const sql = `INSERT INTO user (firstname, lastname, admin) VALUES (?, ?, ?)`;
  mysql.promise().query(sql, [user.firstname, user.lastname, user.admin])
    .then(result => {
      const newUser = { id : result[0].insertId, ...user}
      res.status(201).json(newUser);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal server error');
    })
})

app.patch('/users/:id', (req, res) => {
  const{ id } = req.params;
  
  mysql.promise().query(`SELECT * FROM user WHERE id = ?`, [id])
    .then(result => {
      if (!result[0].length) {
        res.status(404).send('Ressource not found')
      } else{
        const user = result[0][0]
        mysql.promise().query(`UPDATE user SET ? WHERE id = ?`, [req.body, id])
          .then(() => {
            res.status(200).json({...user, ...req.body})
          })
          .catch(err => {
            console.error(err);
            res.status(500).send('Internal server error')
          })
      }
    })
})

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  mysql.promise().query(`DELETE FROM user WHERE id = ?`, [id])
    .then(result => {
      if (result[0].affectedRows) {
        res.status(204).send()
      } else {
        res.status(404).send('Ressource not found')
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal server error');
    })
})

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`)
})