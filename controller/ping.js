const express = require('express');

const startServer = () => {
  const app = express();
  const port = 2000;

  app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
  });
};

module.exports = startServer;