import { boot } from 'quasar/wrappers'
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';

import auth from '@feathersjs/authentication-client';
const socket = io('http://192.168.193.246:3030',{ transports: ['websocket']});
const client = feathers();

// Set up Socket.io client with the socket
client.configure(socketio(socket));
client.configure(auth({storageKey:'uniFlowcapacitor'}));

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do
  //app.config.globalProperties.$client = client
})
export { client }