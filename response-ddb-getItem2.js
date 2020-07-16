console.log('Loading event');
var AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB();

exports.handler = (event, context, callback) => {
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));

    var tableName = "NhatKySanXuat";
    var datetime = new Date().getTime().toString();
    
    ddb.getItem({
            TableName: tableName,
            Key: {
              'id' : {N: '251'},
               'Oid' : {S: '00a134b4-b730-45ce-9166-2a9ea4770e5f'}
            },
            ProjectionExpression: 'id, Oid, masanpham, tensanpham, tentienganh, ngaythuhoach, soluong, malenhsanxuat'
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