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
    
    const updateId = event.pathParameters.id;
    
    const updatedCampaign = JSON.parse(event.body);
    
    var resultCode = HTTP_STATUS_OK;
    
    // Seriously - DO NOT create a client to ANY database OUTSIDE even handles!
    
    const db = new AWS.DynamoDB.DocumentClient();
    
    // Set the update parameters and create the callback.
    
    const updateParams = {
        TableName: "sv-campaigns",
        
        Key: {
            id: updateId
        },
        
        UpdateExpression: "SET #descriptionCur = :descriptionUpd, #poolSizeCur = :poolSizeUpd, #choicesCur = :choicesUpd",
        
        ConditionExpression: "#campaignOwner = :reqEmail",
        
        ExpressionAttributeNames:
        {
            "#campaignOwner": "owner",
            "#choicesCur": "choices",
            "#descriptionCur": "description",
            "#poolSizeCur": "poolSize"
        },
        
        ExpressionAttributeValues:
        {
            ":choicesUpd": updatedCampaign.choices,
            ":descriptionUpd": updatedCampaign.description,
            ":poolSizeUpd": updatedCampaign.poolSize,
            ":reqEmail": email
        }
    };
    
    const updateCallback = ( err, matches ) => {
        if( err ) {
            console.log( err );
          
            resultCode = HTTP_SERVER_ERROR_INTERNAL;
        }
        else {
            console.log( `Updated: ${updateId}` ); 
        }
    };
    
    // Finally, wait for the update to complete and then return the result.
    
    await db.update( updateParams, updateCallback ).promise();
    
    const response = {
        statusCode: resultCode,
        headers: HDRS_CORS
    };
    
    return response;
};
