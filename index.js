const { parse } = require('csv-parse');
const fs = require('fs');

const isHabitablePlanets = []

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] >0.36 && planet['koi_insol']< 1.11
        && planet['koi_prad'] < 1.6;

}

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        if (isHabitablePlanet(data)) {
            isHabitablePlanets.push(data);
        }
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        if(isHabitablePlanet.length === 1 ) {
            console.log(`${isHabitablePlanet.length} habitable planet found!`);
        } else {
            console.log(`${isHabitablePlanet.length} habitable planets found!`);
        }
    })
