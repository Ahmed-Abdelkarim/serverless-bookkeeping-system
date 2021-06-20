import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { message } from '../../BusinessLogic/items';
import { createLogger } from '../../utils/logger'
const logger = createLogger('CreateConnection')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('event', event);

  try {
      //try send
    const res = await message(event)
    logger.info(res)
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: "Got a Message"
      })
    };
  } 
  catch (error) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          message: "Message failed"
        })
      };
  }
}