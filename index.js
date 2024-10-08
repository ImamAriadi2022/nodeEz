import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

const dataPath = path.resolve('data', 'coba.json');
let data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

app.use(bodyParser.json());

// Endpoint untuk menampilkan semua data yang tidak dihapus
app.get('/cars', (req, res) => {
  const availableCars = data.filter(car => !car.deleted); // Hanya tampilkan yang tidak dihapus
  res.json(availableCars);
  console.log('Berhasil menampilkan semua data');
});

// Endpoint untuk menampilkan data berdasarkan ID (termasuk yang dihapus)
app.get('/cars/:id', (req, res) => {
  const car = data.find(car => car.id === req.params.id);
  if (car) {
    res.json(car);
    console.log('Berhasil menampilkan data berdasarkan ID');
  } else {
    res.status(404).send('Data tidak ditemukan');
  }
});

// Endpoint untuk menambahkan data baru
app.post('/cars', (req, res) => {
  const newCar = req.body;

  const existingCar = data.find(car => car.id === newCar.id);
  if (existingCar) {
    // Jika mobil dengan ID yang sama sudah ada, perbarui datanya dan set deleted menjadi false
    existingCar.deleted = false;
    Object.assign(existingCar, newCar);
  } else {
    // Jika tidak ada, tambahkan sebagai mobil baru
    newCar.id = newCar.id || (data.length ? (parseInt(data[data.length - 1].id) + 1).toString() : '1');
    newCar.deleted = false;
    data.push(newCar);
  }

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
  res.status(201).json(newCar);
  console.log('Berhasil menambah data mobil baru');
});

// Endpoint untuk memperbarui data berdasarkan ID
app.put('/cars/:id', (req, res) => {
  const carIndex = data.findIndex(car => car.id === req.params.id);
  if (carIndex !== -1) {
    data[carIndex] = { ...data[carIndex], ...req.body };

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
    res.json(data[carIndex]);
    console.log('Berhasil memperbarui mobil');
  } else {
    res.status(404).send('Data tidak ditemukan');
  }
});

// Endpoint untuk soft delete (menghapus sementara) data berdasarkan ID
app.delete('/cars/:id', (req, res) => {
  const car = data.find(car => car.id === req.params.id);
  if (car && !car.deleted) {
    car.deleted = true; // Tandai sebagai deleted

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
    res.json(car);
    console.log('Berhasil menghapus mobil');
  } else {
    res.status(404).send('Data tidak ditemukan');
  }
});

const server = app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

export { app, server };
