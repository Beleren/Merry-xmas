const meli = require('mercadolibre')

const meliObject = new meli.Meli(
  process.env.MELI_CLIENT_ID,
  process.env.MELI_CLIENT_SECRET
)

exports.search = (item = '') => {
  const query = encodeURI(item)

  return new Promise((resolve, reject) =>
    meliObject.get(`/sites/MLB/search?q=${query}&sort=price_asc`, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  )
}
