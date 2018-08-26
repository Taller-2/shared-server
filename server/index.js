const express = require('express')
const app = express()

const obj = { message:'Hello World!' }

app.get('/hello', (req, res) => res.send(obj))

app.listen(5000, () => console.log('Example app listening on port 5000!'))