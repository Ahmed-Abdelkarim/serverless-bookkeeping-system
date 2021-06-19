import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { deleteItem } from '../../BusinessLogic/items';
import { createLogger } from '../../utils/logger'
const logger = createLogger('deleteItem')



export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  try{
    await deleteItem(event)
    logger.info('Item Deleted!')

  }
  catch(e){
      logger.info(`Item Deletion Error ${e}`)

      throw new Error(e);
  }
  return{
    statusCode: 202,
    headers: {
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Credentials':true
    },
    body:""
  }
}
