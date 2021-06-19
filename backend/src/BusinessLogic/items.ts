import 'source-map-support/register';
import * as uuid from 'uuid';
import { APIGatewayProxyEvent } from 'aws-lambda';
import TableAccess from '../dataLayer/tableAccess';
import StorageAccess from '../dataLayer/storageAccess';
import { getUserId } from '../lambda/utils';
import { CreateItemRequest } from '../requests/CreateItemRequest';
import { UpdateItemRequest } from '../requests/UpdateItemRequest';

const itemsTable= new TableAccess()
const storageAccess = new StorageAccess()

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