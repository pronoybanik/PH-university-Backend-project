import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
const port = 5000

async function main() {
  try {
    await mongoose.connect(config.dataBase_url as string);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('Main server down', error);
  }
}

main();
