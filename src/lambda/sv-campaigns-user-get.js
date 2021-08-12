const AWS = require( 'aws-sdk' );

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
    
    // Seriously - DO NOT create a client to ANY database OUTSIDE event handles!
    
    const db = new AWS.DynamoDB.DocumentClient();
    
    // Set the scan parameters and create the callback.
    
    const scanParams = {
        TableName: "sv-campaigns",
        
        FilterExpression: "#campaignOwner = :userEmail",
        
        ExpressionAttributeNames:
        {
            "#campaignOwner": "owner"
        },
        
        ExpressionAttributeValues:
        {
            ":userEmail" : email
        }
    };
    
    const scanCallback = ( err, matches ) => {
        if( err ) {
            console.log( err );
          
            resultCode = HTTP_SERVER_ERROR_INTERNAL;
        }
        else {
            var json = JSON.stringify(matches.Items);
          
            results = json;
        }
    };
    
    // Finally, wait for the scan to complete and then return the result.
    
    await db.scan( scanParams, scanCallback ).promise();
    
    const response = {
        statusCode: resultCode,
        headers: HDRS_CORS,
        body: results,
    };
    
    return response;
};
