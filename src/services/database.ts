import { DynamoDBClient, PutItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

const dynamoDb = new DynamoDBClient({ 
  region: process.env.AWS_REGION || 'us-east-1'
});

const TABLE_NAME = process.env.DYNAMODB_TABLE || 'FusionadosHistory';

export const saveToHistory = async (data: any): Promise<void> => {
  const params = {
    TableName: TABLE_NAME,
    Item: marshall({
      id: `fusion-${Date.now()}`,
      data,
      createdAt: new Date().toISOString()
    })
  };

  try {
    await dynamoDb.send(new PutItemCommand(params));
  } catch (error) {
    console.error('DynamoDB save error:', error);
    throw error;
  }
};

export const saveCustomData = async (data: any): Promise<void> => {
  const params = {
    TableName: TABLE_NAME,
    Item: marshall({
      id: `custom-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString()
    })
  };

  try {
    await dynamoDb.send(new PutItemCommand(params));
  } catch (error) {
    console.error('DynamoDB save error:', error);
    throw error;
  }
};

export const getHistory = async (page: number, limit: number): Promise<any> => {
  const params = {
    TableName: TABLE_NAME,
    Limit: limit,
    ExclusiveStartKey: page > 1 ? 
      { id: { S: String((page - 1) * limit) } } : undefined
  };

  try {
    const result = await dynamoDb.send(new ScanCommand(params));
    return {
      items: result.Items?.map(item => unmarshall(item)) || [],
      lastEvaluatedKey: result.LastEvaluatedKey,
      page,
      limit
    };
  } catch (error) {
    console.error('DynamoDB scan error:', error);
    throw error;
  }
};