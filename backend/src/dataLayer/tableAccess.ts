import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const XAWS = AWSXRay.captureAWS(AWS);
export default class TableAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly itemsTable = process.env.ITEMS_TABLE,
    private readonly itemsIndex = process.env.ITEMS_INDEX
  ) {}

  async getAllItems(userId) {
    const result = await this.docClient.query({
      TableName: this.itemsTable,
      IndexName: this.itemsIndex,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
          ':userId': userId
        },
      ScanIndexForward: false
      }).promise();

      return result.Items;
  }

  async addItem(newItem) {
    await this.docClient.put({
        TableName: this.itemsTable,
        Item: newItem
    }).promise();
    return newItem;
  }

  async updateItem(itemId, userId, updatedItem) {
    const result = await this.docClient.update({
      TableName: this.itemsTable,      
      Key: {
        userId,
        itemId
      },
      UpdateExpression: "set #name = :name, #price = :price, #quantity = :quantity",
      ExpressionAttributeValues:{
          ":name": updatedItem.name,
          ":price": updatedItem.price,
          ":quantity": updatedItem.quantity
      },
      ExpressionAttributeNames: {
        '#name': 'name',
        '#price': 'price',
        '#quantity': 'quantity'
      },
      ReturnValues:"UPDATED_NEW"    
    }).promise();
    console.log(`Update statement has completed without error`, result);
    return result.Attributes;
  }
  async getItem(itemId, userId) {
    const result = await this.docClient.get({
      TableName: this.itemsTable,
      Key: {
        itemId,
        userId
      }
    }).promise();

    return result.Item;
}

  async deleteItem(itemId, userId){
    await this.docClient.delete({
      TableName: this.itemsTable,
      Key: {
        itemId,
          userId
      }
    }).promise();
  }
}