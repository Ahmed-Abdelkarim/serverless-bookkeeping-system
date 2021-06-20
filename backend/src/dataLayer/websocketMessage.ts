import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';

const XAWS = AWSXRay.captureAWS(AWS);

export default class websocketMessage {
  constructor(
  ) {}
  create(domainName, stage){
    const endpoint = `${domainName}/${stage}`;
    return new XAWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint
    });
  }
  send({ domainName, stage, connectionID, message }){
    const ws = this.create(domainName, stage);
  
    const postParams = {
        Data: message,
        ConnectionId: connectionID,
    };
  
    return ws.postToConnection(postParams).promise();
  };
}


