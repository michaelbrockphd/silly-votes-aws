const AWS = require( 'aws-sdk' );
const crypto = require( 'crypto' );

const HTTP_STATUS_OK = 200;
const HTTP_SERVER_ERROR_INTERNAL = 500;

const HDRS_CORS = {
    "Access-Control-Allow-Origin": "*"
};

exports.handler = async (event) => {
    var resultCode = HTTP_STATUS_OK;
    
    var results = null;
    
    const { email } = event.requestContext
                           .authorizer
                           .claims;
    
    // Taken from SO: https://stackoverflow.com/questions/11721308/how-to-make-a-uuid-in-dynamodb
    
    const insertId = crypto.randomUUID();
    
    const requestBody = JSON.parse(event.body);
    
    const insertCampaign = {
        ...requestBody,
        id: insertId,
        owner: email
    };
    
    // Seriously - DO NOT create a client to ANY database OUTSIDE even handles!
    
    const db = new AWS.DynamoDB.DocumentClient();
    
    // Set the parameters and create the callback.
    
    const putParams = {
        TableName: "sv-campaigns",
        
        Item: insertCampaign
    };
    
    const putCallback = ( err, data ) => {
        if( err ) {
            console.log( err );
          
            resultCode = HTTP_SERVER_ERROR_INTERNAL;
        }
        else {
            // To save headaches, just return the complete, insertion campaign.

            const json = JSON.stringify(insertCampaign);
          
            results = json;
        }
    };
    
    // Finally, wait for the insertion to complete and then return the result.
    
    await db.put( putParams, putCallback ).promise();
    
    const response = {
        statusCode: resultCode,
        headers: HDRS_CORS,
        body: results,
    };
    
    return response;
};
