const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const port = 3008

app.use(express.static(path.join(__dirname, '/')))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
