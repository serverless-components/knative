const express = require('express')
const app = express()

app.get('/', (req, res) => {
  console.log('Hello world received a request.')

  const target = process.env.TARGET || 'Express'
  res.send(`Hello ${target} !`)
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log('"Hello Express" is listening on port', port)
})
