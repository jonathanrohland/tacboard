// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.AWS_REGION });

const { CONNECTIONS_TABLE_NAME, GAMES_TABLE_NAME } = process.env;

function saveStateToDB(gameId, state) {
  return ddb.put({
    TableName: GAMES_TABLE_NAME, Item: {
      gameId: gameId,
      gameStateNumAttribute: state,
      expires: Math.floor(Date.now() / 1000 + 60 * 60 * 48) // Expire in 48h
    }
  }).promise();
}

exports.handler = async event => {
  let openConnections;

  const postData = JSON.parse(event.body).data;
  const gameId = postData.gameId;

  if (!gameId) {
    return { statusCode: 400, body: 'Missing gameId in sendGameState message' };
  }

  try {
    console.log('Saving state to DB:', postData);
    await saveStateToDB(gameId, postData)
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }

  try {
    openConnections = await ddb.scan({
      TableName: CONNECTIONS_TABLE_NAME,
      ProjectionExpression: 'connectionId',
      FilterExpression: 'gameId = :game_id',
      ExpressionAttributeValues: { ':game_id': gameId }
    }).promise();
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }

  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
  });



  const postCalls = openConnections.Items.map(async ({ connectionId }) => {
    try {
      console.log('Posting to connection', connectionId);
      console.log('Data', postData);
      await apigwManagementApi.postToConnection({ ConnectionId: connectionId, Data: JSON.stringify(postData) }, function (err, data) {
        if (err) console.log('Error posting:', err, err.stack); // an error occurred
      }).promise();
    } catch (e) {
      if (e.statusCode === 410) {
        console.log(`Found stale connection, deleting ${connectionId}`);
        await ddb.delete({ TableName: CONNECTIONS_TABLE_NAME, Key: { connectionId } }).promise();
      } else {
        throw e;
      }
    }
  });

  try {
    await Promise.all(postCalls);
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }

  return { statusCode: 200, body: 'Data sent.' };
};
