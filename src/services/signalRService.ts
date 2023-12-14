import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

export const createHubConnection = (token: string) => new HubConnectionBuilder()
.withUrl(`${process.env.REACT_APP_AZURE_API_URL}/hub`, {accessTokenFactory: () => token})
.withAutomaticReconnect()
.build();

  export const startConnection = async (connection: HubConnection) => {
    if (connection.state === HubConnectionState.Disconnected) {
      try {
        await connection.start();
        console.log('SignalR connected');
      } catch (error) {
        console.error('Error connecting to SignalR:', error);
      }
    } else {
      console.warn('SignalR connection is not in the Disconnected state. Current state: ', connection.state);
    }
  }

  export const addMessageReceivedListener = (connection:HubConnection, path: string, callback: (message: string) => void) => {
    let isReceived = false;
    connection.on(path, (message: string) => {
      isReceived = true;
      callback(message);
    });
    setTimeout(() => {
      if(!isReceived){
        callback("data not received")
      }
      },5000)
  } 




