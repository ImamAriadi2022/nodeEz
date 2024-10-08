const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/cars.json');
let data = require(dataPath);

const insert = (newCar) => {
  // Generate a new ID for the new car
  const newId = data.length ? data[data.length - 1].id + 1 : 1;
  newCar.id = newId;

  // Add the new car to the data array
  data.push(newCar);

  // Write the updated data back to the JSON file
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');

  console.log('Data mobil baru berhasil ditambahkan:');
  console.log(newCar);
};

module.exports = insert;