const s3 = require('aws-sdk/clients/s3');
const fs = require('fs');


const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACESS;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const storage = new s3({
    region,
    accessKeyId,
    secretAccessKey
});

const getBuckets = () => {
    return storage.listBuckets().promise();
};

const uploadToBucket = (bucketName,file) => {
    const stream = fs.createReadStream(file.tempFilePath);
    const params = {
        Bucket:bucketName,
        Key:file.name,
        Body:stream
    };
    return storage.upload(params).promise();
};

module.exports = {
    getBuckets,
    uploadToBucket
};