// src/services/database.ts - Versión actualizada
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ 
  region: process.env.AWS_REGION || 'us-east-1'
});

const dynamoDb = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.DYNAMODB_TABLE || 'FusionadosHistory';

export const saveToHistory = async (data: any): Promise<void> => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: `fusion-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      data,
      createdAt: new Date().toISOString(),
      type: 'fusion'  // Campo necesario para el índice
    }
  };

  try {
    await dynamoDb.send(new PutCommand(params));
    console.log('Data saved to history successfully');
  } catch (error) {
    console.error('DynamoDB save error:', error);
    throw error;
  }
};

export const saveCustomData = async (data: any): Promise<void> => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      ...data,
      createdAt: new Date().toISOString(),
      type: 'custom'  // Campo necesario para el índice
    }
  };

  try {
    await dynamoDb.send(new PutCommand(params));
    console.log('Custom data saved successfully');
  } catch (error) {
    console.error('DynamoDB save error:', error);
    throw error;
  }
};

export const getHistory = async (page: number, limit: number): Promise<any> => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: 'TypeCreatedAtIndex',  // Usar el nuevo índice
    KeyConditionExpression: '#type = :type',
    ExpressionAttributeNames: {
      '#type': 'type'
    },
    ExpressionAttributeValues: {
      ':type': 'fusion'  // Filtrar solo elementos de tipo 'fusion'
    },
    ScanIndexForward: false,  // Orden descendente (más recientes primero)
    Limit: limit
  };

  try {
    const result = await dynamoDb.send(new QueryCommand(params));
    return {
      items: result.Items || [],
      lastEvaluatedKey: result.LastEvaluatedKey,
      page,
      limit,
      count: result.Count || 0
    };
  } catch (error) {
    console.error('DynamoDB query error:', error);
    throw error;
  }
};