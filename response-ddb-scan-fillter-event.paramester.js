console.log('Loading event');
var AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = (event, context, callback) => {
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));
    var tableName = "VietRau-NhatKySanXuat";
    var datetime = new Date().getTime().toString();
    const id = Number(event.pathParameters.id)
    ddb.scan({
        TableName: tableName,
        FilterExpression: 'id = :id',
        ExpressionAttributeValues: { 
            ':id': id
        }
    }, function(err, data) {
        if (err) {
            context.fail('ERROR: Dynamo failed: ' + err);
        } else {
            context.succeed({
                statusCode: 201,
        		body: JSON.stringify({
        		    data
        		}),
        		headers: {
        			'Access-Control-Allow-Origin': '*'
        		}
            });
        }
    });
    
}