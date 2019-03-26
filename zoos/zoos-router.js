const router = require('express').Router()
const knex = require('knex')

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3',
  },
  debug: true,
}

const db = knex(knexConfig)

router.post('/', (req, res) => {
  if(!req.body.name) {
    res.status(400).json({ error: 'missing required field: name'})
  } else {
    db('zoos').insert(req.body)
    .then(ids => {
      const id = ids[0]
      db('zoos').where({ id: id }).first()
      .then(zoo => {
        res.status(201).json(zoo)
      })
    }).catch(err => res.status(500).json(err))
  }
})

router.get('/', (req, res) => {
  db('zoos').then(zoos => {
    res.status(200).json(zoos)
  }).catch(err => {
    res.status(500).json(err)
  })
})

router.get('/:id', (req, res) => {
  const zooId = req.params.id
  db('zoos').where({ id: zooId })
  .first()
  .then(zoo => {
    res.status(200).json(zoo)
  }).catch(err => {
    res.status(500).json(err)
  })
})

module.exports = router
