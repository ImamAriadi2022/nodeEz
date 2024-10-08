const display = require('./controller/display.js');
const displayById = require('./controller/displayByid.js');
const insert = require('./controller/insert.js');
const update = require('./controller/update.js');
const deleteCar = require('./controller/delete.js');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Pilih fungsi yang ingin dipanggil:\n(1. ping \n2. display\n3. displayByid\n4. insert\n5. update\n6. delete): ', (answer) => {
  switch (answer) {
    case '1':
      ping();
      break;
    case '2':
      display();
      break;
    case '3':
      rl.question('Masukkan ID: ', (id) => {
        displayById(id); // Kirim ID sebagai string
        rl.close();
      });
      return; // Return here to avoid closing the readline interface immediately
    case '4':
      rl.question('Masukkan nama mobil: ', (name) => {
        rl.question('Masukkan merk mobil: ', (brand) => {
          const newCar = { name, brand };
          insert(newCar);
          rl.close();
        });
      });
      return; // Return here to avoid closing the readline interface immediately
    case '5':
      rl.question('Masukkan ID: ', (id) => {
        rl.question('Masukkan nama mobil baru: ', (name) => {
          rl.question('Masukkan merk mobil baru: ', (brand) => {
            const updatedCar = { name, brand };
            update(id, updatedCar); // Kirim ID sebagai string
            rl.close();
          });
        });
      });
      return; // Return here to avoid closing the readline interface immediately
    case '6':
      rl.question('Masukkan ID: ', (id) => {
        deleteCar(id); // Kirim ID sebagai string
        rl.close();
      });
      return; // Return here to avoid closing the readline interface immediately
    default:
      console.log('Pilihan tidak valid');
  }
  rl.close();
});