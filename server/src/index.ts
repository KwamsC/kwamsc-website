import app from './app/app';
import config from './config/config';

const start = async () => {
  try {
    await app.listen({ port: config.port as number });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();

// app.listen(config.port, () =>
//   console.log(`App is listening on port ${ config.port}`)
// );

// // log unhandled rejections
// process.on('unhandledRejection', (err) => {
//   console.log(err);
// });