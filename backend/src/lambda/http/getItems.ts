import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getItems } from '../../BusinessLogic/items';
import { createLogger } from '../../utils/logger'
const logger = createLogger('getItems')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  console.log('Processing event: ', event)
  const items = await getItems(event)
  logger.info('items retrieved', items)
  return{
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Credentials':'*'
    },
    body: JSON.stringify({
      items
    })

  }
}
