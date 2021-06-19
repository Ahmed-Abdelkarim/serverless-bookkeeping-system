import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getItem } from '../../BusinessLogic/items';
import { createLogger } from '../../utils/logger'
const logger = createLogger('getItem')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  console.log('Processing event: ', event)
  const result = await getItem(event)
  logger.info('items retrieved', result)
  return{
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Credentials':'*'
    },
    body: JSON.stringify({
      item: result
    })

  }
}
