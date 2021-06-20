import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { createConnection } from '../../BusinessLogic/items';
import { createLogger } from '../../utils/logger'
const logger = createLogger('CreateConnection')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    console.log('event', event);

  const result = await createConnection(event);
  logger.info(result);
  return{
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      message: "connected"
    })
  }
}