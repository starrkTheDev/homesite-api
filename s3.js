require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const { Readable } = require('stream');

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

const uploadFile = async (file) => {

    console.log(file);

    try {
        const fileStream = new Readable();
        fileStream._read = () => { };
        fileStream.push(file.buffer);
        fileStream.push(null);

        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: file.originalname,
            ContentType: file.mimetype
        };
        const s3Response = await s3.upload(uploadParams).promise()
        console.log(s3Response);
        return s3Response;
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        throw error;
    }
};

exports.uploadFile = uploadFile;

const getFile = async (fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName,
    };

    return s3.getObject(downloadParams).createReadStream();
};

exports.getFile = getFile;

