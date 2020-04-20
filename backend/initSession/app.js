// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.AWS_REGION });

const { CONNECTIONS_TABLE_NAME, GAMES_TABLE_NAME } = process.env;

async function updateGameId(connectionId, gameId) {
  return ddb.put({
    TableName: CONNECTIONS_TABLE_NAME,
    Item: {
      connectionId: connectionId,
      gameId: gameId,
    }
  }).promise();
}

function getGameState(gameId) {
  return ddb.get({
    TableName: GAMES_TABLE_NAME,
    Key: {
      'gameId': gameId
    }
  }).promise()
}

exports.handler = async event => {
  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
  });

  const eventBody = JSON.parse(event.body);

  const gameId = eventBody.data.gameId;

  const connectionId = event.requestContext.connectionId;
  let gameStatePromise;

  try {
    await updateGameId(connectionId, gameId)
    console.log('Loading  game  state for gameId', gameId);

    gameStatePromise = getGameState(gameId);
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }

  const postToConnectionPromise = gameStatePromise.then(async gameStateDocument => {

    if (gameStateDocument.Item) {
      console.log('Trying postToConnetionwith data', JSON.stringify(gameStateDocument.Item));

      try {
        return await apigwManagementApi.postToConnection({ ConnectionId: connectionId, Data: JSON.stringify(gameStateDocument.Item.gameStateNumAttribute) }, function (err, data) {
          if (err) console.log('Error posting to connection', err, err.stack);
          else console.log(data);
        }).promise();
      } catch (e) {
        if (e.statusCode === 410) {
          console.log(`Found stale connection, deleting ${connectionId}`);
          await ddb.delete({ TableName: CONNECTIONS_TABLE_NAME, Key: { connectionId } }).promise();
        } else {
          throw e;
        }
      }
    } else {
      console.log('Did not find gameState for gameId', gameId);
    }
  }).catch(
    (error) => {
      console.log('Error loading gameState');
      return { statusCode: 500, body: error };
    })

  try {
    await Promise.all([gameStatePromise, postToConnectionPromise]);
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }

  return { statusCode: 200, body: 'Sent initial state.' };
};
