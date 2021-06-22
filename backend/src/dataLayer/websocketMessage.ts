import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';
import TableAccess from '../dataLayer/tableAccess';

const XAWS = AWSXRay.captureAWS(AWS);
const socketTableName = process.env.TABLENAME;
const itemsTable= new TableAccess()
export default class websocketMessage {
  constructor(
  ) {}
  create(domainName, stage){
    return new XAWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint: `${domainName}/${stage}`
    });
  }
  async send(ConnectionId, message, domainName, stage){
    const ws = this.create(domainName, stage);
  
    const postParams = {
        ConnectionId,
        Data: JSON.stringify(message)
    };
    try {
      console.log('Sending message to a connection', ConnectionId)
      return await ws.postToConnection(postParams).promise();
    } catch (e) {
      console.log('Failed to send message', JSON.stringify(e))
      if (e.statusCode === 410) {
        console.log('Stale connection')

        return await itemsTable.deleteSocket(ConnectionId, socketTableName);
      }
    }
  };
}


