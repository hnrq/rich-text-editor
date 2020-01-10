import * as actions from 'actions';
import { convertFromRaw } from 'draft-js';
import socketIOClient from 'socket.io-client';

const socketMiddleware = () => {
  let socket = null;
  let debounceMessage = null;
  return (store) => (next) => (action) => {
    switch (action.type) {
      case 'WS_CONNECT':
        if (socket !== null) socket.close();
        socket = socketIOClient(action.host);

        // handlers
        socket.on('message', (data) => {
          store.dispatch(
            actions.setEditorText(convertFromRaw(JSON.parse(data).message))
          );
        });

        break;
      case 'WS_DISCONNECT':
        if (socket !== null) socket.close();
        socket = null;
        console.log('WebSocket closed');
        break;
      case 'NEW_MESSAGE':
        if (debounceMessage) return next(action);
        if (socket) {
          debounceMessage = setTimeout(() => {
            debounceMessage = null;
            socket.send(
              JSON.stringify({
                command: 'NEW_MESSAGE',
                message: action.payload
              })
            );
          }, 1000);
        }
        break;
      default:
        return next(action);
    }
  };
};

export default socketMiddleware;
