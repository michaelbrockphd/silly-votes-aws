const AWS = require( 'aws-sdk' );

const HTTP_SERVER_ERROR_INTERNAL = 500;

const HDRS_CORS = {
    "Access-Control-Allow-Origin": "*"
};

exports.handler = async (event) => {
    var resultCode = 200;
    
    var results = null;
    
    // Seriously - DO NOT create a client to ANY database OUTSIDE even handles!
    
    const db = new AWS.DynamoDB.DocumentClient();
    
    // Set the scan parameters and create the callback.
    
    const scanParams = {
        TableName: "sv-campaigns"
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
        body: results
    };
    
    return response;
};
