const AWS = require( 'aws-sdk' );

const HTTP_STATUS_OK = 200;
const HTTP_SERVER_ERROR_INTERNAL = 500;

const HDRS_CORS = {
    "Access-Control-Allow-Origin": "*"
};

exports.handler = async (event) => {
    const { email } = event.requestContext
                           .authorizer
                           .claims;
                           
    const deleteId = event.pathParameters.id;
    
    var resultCode = HTTP_STATUS_OK;
    
    // Seriously - DO NOT create a client to ANY database OUTSIDE even handles!
    
    const db = new AWS.DynamoDB.DocumentClient();
    
    // Set the parameters and create the callback.
    
    const deleteParams = {
        TableName: "sv-campaigns",
        
        Key: {
            id: deleteId
        },
        
        ConditionExpression: "#campaignOwner = :reqEmail",
        
        ExpressionAttributeNames:
        {
            "#campaignOwner": "owner"
        },
        
        ExpressionAttributeValues:
        {
            ":reqEmail": email
        }
    };
    
    const deleteCallback = ( err, data ) => {
        if( err ) {
            console.log( err );
          
            resultCode = HTTP_SERVER_ERROR_INTERNAL;
        }
        else {
            console.log( `Deleted: ${deleteId}`);
        }
    };
    
    // Finally, wait for the insertion to complete and then return the result.
    
    await db.delete( deleteParams, deleteCallback ).promise();
    
    const response = {
        statusCode: resultCode,
        headers: HDRS_CORS
    };
    
    return response;
};
