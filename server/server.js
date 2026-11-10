//arquivo server.js

const authRouter = require('../src/routes/auth')
require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 3001

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Parabéns, vocês chegaram a Projeto Final com JWT!')
  })

app.use('/', authRouter)

app.listen(PORT, () => console.log(`Servidor iniciado!\nRodando em http://localhost:${PORT} \nPrecione Ctrl+C para encerrar o servidor web.`))
