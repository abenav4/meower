const express = require("express")
const app = express()
const mysql = require('mysql') 
const cors = require('cors')

app.use(cors());
app.use(express.json())

app.listen(3001, ()=> {
    console.log("running on 3001");
})

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: ')oawe5%_0!hS',
    database: 'itemSystem'
});

app.post('/create', (req, res) => {
    const name = req.body.name
    const quantity = req.body.quantity
    
    db.query('INSERT INTO new_table (name, quantity) VALUES (?,?)', [name, quantity],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send("Values inserted");
            }
        })
})

app.get('/items', (req, res) => {
    db.query("SELECT * FROM  new_table", (err, result) => {
        if (err) {
            console.log(err) 
        }
        else {
            res.send(result)
        }
    })
})

app.put("/update", (req, res) => {
    const id = req.body.id;
    const quantity = req.body.quantity;
    db.query(
      "UPDATE new_table SET quantity = ? WHERE id = ?",
      [quantity, id],
      (err, result) => {
        if (err) {console.log(err);
        } else {res.send(result);
        }
      }
    )
  })

  app.put("/update2", (req, res) => {
    db.query(
      "UPDATE new_table SET deletedText = ? WHERE id = ?",
      [req.body.deletedText, req.body.id],
      (err, result) => {
        if (err) {console.log(err);
        } else {res.send(result);
        }
      }
    )
  })