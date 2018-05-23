const express = require('express')
const logger = require('morgan')

const app = express()

app.use(express.json())
app.use(logger('combined'))

app.post('/check-sms', (req, res) => {
  res.send({
    result: req.body.sms.map(() => Math.random() > 0.5)
  })
})

app.post('/add-spam', (req, res) => {
  res.send(true)
})

app.post('/remove-spam', (req, res) => {
  res.send(true)
})

app.listen(8000, () => console.log('Mock api server listening on port 8000!'))
