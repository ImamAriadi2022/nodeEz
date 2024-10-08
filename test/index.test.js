import request from 'supertest';
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { app, server } from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.resolve('data', 'coba.json');
let data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

describe('API Tests', () => {
  beforeEach(() => {
    // Reset data to initial state before each test
    data = [
      {
        "id": "5b67f1d7-92d4-41c7-8577-4435740aadf1",
        "plate": "VPT-9753",
        "manufacture": "BMW",
        "model": "M5",
        "image": "./images/car04.min.jpg",
        "rentPerDay": 900000,
        "capacity": 6,
        "description": "6.1L SRT V8 'Hemi' engine.",
        "availableAt": "2022-03-23T15:49:05.563Z",
        "transmission": "Manual",
        "available": true,
        "type": "Hatchback",
        "year": 2018,
        "deleted": false
      }
    ];
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
  });

  after(() => {
    server.close(); // Tutup server setelah semua pengujian selesai
  });

  it('mengambil semua mobil yang tidak dihapus', (done) => {
    request(app)
      .get('/cars')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(1); // Harapkan hanya ada 1 mobil
        done();
      });
  });

  it('mengambil mobil berdasarkan ID', (done) => {
    request(app)
      .get('/cars/5b67f1d7-92d4-41c7-8577-4435740aadf1')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('id', '5b67f1d7-92d4-41c7-8577-4435740aadf1');
        done();
      });
  });

  it('menambahkan mobil baru', (done) => {
    const newCar = {
      "id": "5b67f1d7-92d4-41c7-8577-4435740aadf2",
      "plate": "ABC-1234",
      "manufacture": "Toyota",
      "model": "Camry",
      "image": "./images/car03.min.jpg",
      "rentPerDay": 500000,
      "capacity": 5,
      "description": "Comfortable and spacious.",
      "availableAt": "2022-03-23T15:49:05.563Z",
      "transmission": "Automatic",
      "available": true,
      "type": "Sedan",
      "year": 2020,
      "deleted": false
    };
    request(app)
      .post('/cars')
      .send(newCar)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('id', '5b67f1d7-92d4-41c7-8577-4435740aadf2');
        done();
      });
  });

  it('memperbarui mobil berdasarkan ID', (done) => {
    const updatedCar = {
      "plate": "XYZ-9876",
      "manufacture": "Honda"
    };
    request(app)
      .put('/cars/5b67f1d7-92d4-41c7-8577-4435740aadf1')
      .send(updatedCar)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('plate', 'XYZ-9876');
        expect(res.body).to.have.property('manufacture', 'Honda');
        done();
      });
  });

  it('menghapus mobil berdasarkan ID (soft delete)', (done) => {
    request(app)
      .delete('/cars/5b67f1d7-92d4-41c7-8577-4435740aadf1')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('id', '5b67f1d7-92d4-41c7-8577-4435740aadf1');
        expect(res.body).to.have.property('deleted', true);
        done();
      });
  });
});
