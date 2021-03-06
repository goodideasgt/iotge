const express = require('express')
const router = express.Router()
const Subscriber = require('../models/iotgepdc')


//{fecha: { $gte: new Date(2021, 5, 14), $lt: new Date(2021, 7, 30) }}).sort({fecha:-1}
// Getting all
router.get('/', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const subscribers = await Subscriber.find().sort({"_id":-1});
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting all
router.post('/fecha', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const añod = req.body.añodesde
    const mesd = req.body.mesdesde
    const diad =req.body.diadesde
    const añoh = req.body.añohasta
    const mesh = req.body.meshasta
    const diah =req.body.diahasta
    
    const subscribers = await Subscriber.find({fecha_inicio: { $gte: new Date(añod, mesd, diad), $lt: new Date(añoh, mesh, diah) }}).sort({fecha_inicio:-1})
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getSubscriber, (req, res) => {
  res.json(res.subscriber)
})

router.get('/last', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const subscribers = await Subscriber.findOne().sort({"_id":1}).limit(1);
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Creating one
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    Lote:req.body.Lote,
    Cronometro: req.body.Cronometro,
    Meta: req.body.Meta,
    ConteoReal: req.body.ConteoReal,
    Cumplimiento: req.body.Cumplimiento,
    ParoTotal: req.body.ParoTotal,
    Status: req.body.Status,
  })
  
  var dt = new Date();
  dt.setHours( dt.getHours() - 6 );

  
  subscriber.Fecha = dt   
  
  //subscriber.estado = 0

  try {
    const newSubscriber = await subscriber.save()
    res.status(200).json(newSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name
  }
  if (req.body.location != null) {
    res.subscriber.location = req.body.location
  }
  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove()
    res.json({ message: 'Deleted Subscriber' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getSubscriber(req, res, next) {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.subscriber = subscriber
  next()
}

module.exports = router