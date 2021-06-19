import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { updateItem } from '../../BusinessLogic/items';
import { createLogger } from '../../utils/logger'

const logger = createLogger('updateItem')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  
  const updatedItem = updateItem(event)

  logger.info('Updating Item ', updatedItem)

  return{
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Credentials': true
    },
    body:""
  }
}
