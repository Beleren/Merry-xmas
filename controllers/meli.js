const meli = require('mercadolibre')

const meliObject = new meli.Meli(
  process.env.MELI_CLIENT_ID,
  process.env.MELI_CLIENT_SECRET
)

exports.search = (req, res) => {
  const { item = '' } = req.query
  const query = encodeURI(item)
  meliObject.get(`/sites/MLA/search?q=${query}`, (err, data) => {
    if (err) return res.status(500).send(err)
    return res.send(data)
  })
}
