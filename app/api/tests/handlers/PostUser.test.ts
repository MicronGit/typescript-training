import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { PostUserHandler } from '../../src/handlers/PostUser';

const mockEvent: APIGatewayProxyEventV2 = {
  version: '2.0',
  routeKey: 'POST /users',
  rawPath: '/users',
  rawQueryString: '',
  headers: {
    'content-type': 'application/json',
  },
  requestContext: {
    domainName: 'test',
    domainPrefix: 'test',
    accountId: '123456789012',
    apiId: 'api-id',
    stage: 'test',
    requestId: 'request-id',
    routeKey: 'POST /users',
    http: {
      method: 'POST',
      path: '/users',
      protocol: 'HTTP/1.1',
      sourceIp: '127.0.0.1',
      userAgent: 'test-agent',
    },
    time: '09/Apr/2019:12:34:56 +0000',
    timeEpoch: 1428582896000,
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
  }),
  isBase64Encoded: false,
};

const mockContext: Context = {
  callbackWaitsForEmptyEventLoop: false,
  functionName: 'test-function',
  functionVersion: '$LATEST',
  invokedFunctionArn: 'arn:aws:lambda:us-east-1:123456789012:function:test-function',
  memoryLimitInMB: '128',
  awsRequestId: 'test-request-id',
  logGroupName: '/aws/lambda/test-function',
  logStreamName: '2019/04/09/[$LATEST]abcdef123456',
  getRemainingTimeInMillis: () => 30000,
  done: vi.fn(),
  fail: vi.fn(),
  succeed: vi.fn(),
};

describe('PostUserHandler', () => {
  test('test', async () => {
    await PostUserHandler(mockEvent, mockContext);
  });
});
