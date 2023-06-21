import 'dotenv/config.js'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

import { createConnection, createTable } from './database.js'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(express.json())

app.get('/', async (_req, res) => {
  await createTable()

  console.log(process.env.DATABASE_HOST)

  const conn = createConnection()

  conn.query('SELECT * FROM productos', (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Error al obtener los productos'
      })
    }

    res.json(result)
  })
})

app.post('/', async (req, res) => {
  await createTable()
  const { nombre, precio } = req.body
  const conn = createConnection()

  conn.query('INSERT INTO productos SET ?', { nombre, precio }, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Error al insertar el producto'
      })
    }

    res.json({
      message: 'Producto insertado correctamente en la base de datos'
    })
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})