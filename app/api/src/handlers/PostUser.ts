import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Context } from 'aws-lambda';
import { getDatabase } from '../../../utils/Database';
import { getLogger } from '../../../utils/Logger';

export const PostUserHandler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResultV2> => {
  const logger = getLogger();
  const db = await getDatabase();
  const [result] = await db.query({
    sql: `SELECT * FROM users;`,
    rowsAsArray: true,
  });
  logger.info(`query result: ${result}`);
  return {};
};
