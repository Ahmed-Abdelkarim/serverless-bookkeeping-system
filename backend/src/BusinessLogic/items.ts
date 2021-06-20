import 'source-map-support/register';
import * as uuid from 'uuid';
import { APIGatewayProxyEvent } from 'aws-lambda';
import TableAccess from '../dataLayer/tableAccess';
import StorageAccess from '../dataLayer/storageAccess';
import websocketMessage from '../dataLayer/websocketMessage';
import { getUserId } from '../lambda/utils';
import { CreateItemRequest } from '../requests/CreateItemRequest';
import { UpdateItemRequest } from '../requests/UpdateItemRequest';
const ws = new websocketMessage()
const itemsTable= new TableAccess()
const storageAccess = new StorageAccess()
const socketTableName = process.env.tableName;
export async function getItems(event: APIGatewayProxyEvent) {
  const userId = getUserId(event)
  return await itemsTable.getAllItems(userId);
}

export async function createItem(event: APIGatewayProxyEvent) {
  const userId = getUserId(event)
  const itemId = uuid.v4()
  const timestamp = new Date(Date.now()).toISOString()
  const bucketName = storageAccess.getBucketName()
  const newItem: CreateItemRequest = JSON.parse(event.body)
  const createdItem = {
    userId: userId,
    itemId,
    timestamp,
    ...newItem,
    quantity: "1",
    attachmentUrl: `https://${bucketName}.s3.amazonaws.com/${itemId}`
  }
  return await itemsTable.addItem(createdItem);
}
export async function createConnection(event: APIGatewayProxyEvent) {
  const timestamp = new Date(Date.now()).toISOString()
  const { connectionId, domainName, stage } = event.requestContext;

  const data = {
      ID: connectionId,
      date: timestamp,
      messages: [],
      domainName,
      stage,
  };

  return await itemsTable.addSocket(data, socketTableName);
}
export async function deleteConnection(event: APIGatewayProxyEvent) {

  const { connectionId} = event.requestContext;

  return await itemsTable.deleteSocket(connectionId, socketTableName);
}

export async function message(event: APIGatewayProxyEvent) {

  const { connectionId: connectionID } = event.requestContext;
  const body = JSON.parse(event.body);
  const record = await itemsTable.getRecords(connectionID, socketTableName);
  const {ID, date, messages, domainName, stage} = record
  messages.push(body.message);
  const data = {
    ID,
    date,
    messages,
    domainName,
    stage
  }

  await itemsTable.addSocket(data, socketTableName);
  const res = await ws.send({
    domainName,
    stage,
    connectionID,
    message: 'This is a reply to your message',
  });
  console.log('sent message');
  
  return res;
}

export async function updateItem(event: APIGatewayProxyEvent) {
  const itemId = event.pathParameters.itemId
  const updatedTodo: UpdateItemRequest = JSON.parse(event.body)
  const userId = getUserId(event)
  return await itemsTable.updateItem(itemId,userId,updatedTodo);
}
export async function getItem(event: APIGatewayProxyEvent) {
  const itemId = event.pathParameters.itemId
  const userId = getUserId(event)
  return await itemsTable.getItem(itemId,userId);
}
export async function deleteItem(event: APIGatewayProxyEvent) {
  const itemId = event.pathParameters.itemId
  const userId = getUserId(event)
  return await itemsTable.deleteItem(itemId, userId);
}

export async function generateUploadUrl(event: APIGatewayProxyEvent) {
  const itemId = event.pathParameters.itemId
  const bucketName = storageAccess.getBucketName();
  const urlExpiration = process.env.SIGNED_URL_EXPIRATION;

  const createSignedUrlRequest = {
      Bucket: bucketName,
      Key: itemId,
      Expires: parseInt(urlExpiration)
  }
  return await storageAccess.getUploadUrl(createSignedUrlRequest);
}