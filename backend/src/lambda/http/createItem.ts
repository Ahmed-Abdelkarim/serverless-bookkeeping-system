import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { createItem } from '../../BusinessLogic/items';
import { CreateItemRequest } from '../../requests/CreateItemRequest'
import { createLogger } from '../../utils/logger'
const logger = createLogger('CreateItem')


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newItem: CreateItemRequest = JSON.parse(event.body)
  if (!newItem.name) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'You must Enter a name!'
      })
    };
  }

  logger.info('created Todo ', newItem)
  const result = await createItem(event);
  
  return{
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Credentials':'*'
    },
    body: JSON.stringify({
      item: result
    })
  }
}

