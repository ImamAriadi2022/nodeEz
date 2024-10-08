const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/cars.json');
let data = require(dataPath);

const deleteCar = (id) => {
  const carIndex = data.findIndex(car => car.id === id);
  if (carIndex !== -1) {
    const deletedCar = data.splice(carIndex, 1);

    // Write the updated data back to the JSON file
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');

    console.log(`Data mobil dengan ID: ${id} berhasil dihapus:`);
    console.log(deletedCar[0]);
  } else {
    console.log(`Data dengan ID: ${id} tidak ditemukan`);
  }
};

module.exports = deleteCar;