const AWS = require( 'aws-sdk' );

exports.handler = async (event) => {
    const deleteId = event.pathParameters.id;
    
    var resultCode = 200;
    
    // Seriously - DO NOT create a client to ANY database OUTSIDE even handles!
    
    const db = new AWS.DynamoDB.DocumentClient();
    
    // Set the parameters and create the callback.
    
    const deleteParams = {
        TableName: "sv-campaigns",
        
        Key: {
            id: deleteId
        }
        
        // TODO: Add a condition expression so we match only to the email in the authentication token.
    };
    
    const deleteCallback = ( err, data ) => {
        if( err ) {
            console.log( err );
          
            resultCode = 500;
        }
        else {
            console.log( `Deleted: ${deleteId}`);
        }
    };
    
    // Finally, wait for the insertion to complete and then return the result.
    
    await db.delete( deleteParams, deleteCallback ).promise();
    
    const response = {
        statusCode: resultCode
    };
    
    return response;
};
