import app from './app/app';
import config from './config/config';

app.listen({ host: config.address, port: parseInt(config.port, 10) }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

// server.get('/ping', async (request, reply) => {
//   return 'pong\n';
// });

// server.listen({ port: 8080 }, (err, address) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   }
//   console.log(`Server listening at ${address}`);
// });

// app.listen(config.port, () =>
//   console.log(`App is listening on port ${ config.port}`)
// );

// // log unhandled rejections
// process.on('unhandledRejection', (err) => {
//   console.log(err);
// });


// const { ADDRESS = 'localhost', PORT = '3000' } = process.env;

// server.get('/', async (request, reply) => {
//   return { message: 'Hello world!' };
// });

// server.listen({ host: ADDRESS, port: parseInt(PORT, 10) }, (err, address) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   }
//   console.log(`Server listening at ${address}`);
// });