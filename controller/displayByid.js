const data = require('../data/cars.json');

const displayById = (id) => {
  console.log(`Mencari data untuk ID: ${id}`); // Debugging
  const car = data.find(car => car.id === id);
  if (car) {
    console.log(`Menampilkan data untuk ID: ${id}`);
    console.log(car);
  } else {
    console.log(`Data dengan ID: ${id} tidak ditemukan`);
  }
};

module.exports = displayById;