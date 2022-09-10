const { parse } = require('csv-parse')
const fs = require('fs')

const result = []

function isHabitablePlanet (planet) {
  return planet['koi_disposition'] == 'CONFIRMED'
}

count = 0
fs.createReadStream('./kepler_data.csv')
  .pipe(
    parse({
      comment: '#',
      columns: true
    })
  )
  .on('data', data => isHabitablePlanet(data) && result.push(data))
  .on('error', () => console.log('Error occured'))
  .on('end', () => console.log(`${result.length} habitable planets found.`))
