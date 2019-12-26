const meli = require('mercadolibre')

const meliObject = new meli.Meli(
  process.env.MELI_CLIENT_ID,
  process.env.MELI_CLIENT_SECRET
)

exports.search = async (item = '') => {
  const query = encodeURI(item)
  let items = []

  const meliSearch = await new Promise((resolve, reject) =>
    meliObject.get(
      `/sites/MLB/search?q=${query}&sort=price_asc`,
      (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      }
    )
  )
  if (meliSearch.results.length > 0) {
    const sortedSearch = meliSearch.results.sort((a, b) => a.price - b.price)
    items = sortedSearch.slice(0, 3)
  }
  return items
}
