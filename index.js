console.log('Loading function');

const aws = require('aws-sdk');
const s3 = new aws.S3();
const S3_BUCKET_URL = "data.kessas.com";
const key = "data.json";

exports.handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    let time = new Date().getTime();
    
    await putObjectToS3(S3_BUCKET_URL, key, JSON.stringify({time}));
    
};

const putObjectToS3 = async (bucket, key, data) => {
        var params = {
            Bucket : bucket,
            Key : key,
            Body : data
        };

    try {
        const response = await s3.upload(params).promise();
        console.log('Response: ', response);
        return response;

    } catch (err) {
        console.log(err);
    }
};
