console.log('Loading event');
var AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB();

exports.handler = (event, context, callback) => {
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));

    var tableName = "Movies";
    var datetime = new Date().getTime().toString();
    
    ddb.scan({
            TableName: tableName,
            Limit : 2
    }, function(err, data) {
        if (err) {
            context.fail('ERROR: Dynamo failed: ' + err);
        } else {
            //console.log('Dynamo Success: ' + JSON.stringify(data, null, '  '));
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