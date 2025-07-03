const express = require('express')
const app = express()
const port = 3000

app.get('/users', (req, res) => {
  res.send('Here is the users!')
})
app.post('/users', (req, res) => {
    res.send('New user created!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
