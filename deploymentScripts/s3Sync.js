/* eslint-disable */
let s3 = require('s3');

/**
 * S3 client configuration
 */
let client = s3.createClient({
    maxAsyncS3: 20,
    s3RetryCount: 3,
    s3RetryDelay: 1000,
    multipartUploadThreshold: 20971520,
    multipartUploadSize: 15728640,
    s3Options: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
        region:'us-east-1'
    },
});

let params = {
    // relative directory of files to be uploaded
    localDir: './dist/',
    deleteRemoved: true,

    s3Params: {
        Bucket: process.env.s3Bucket,
        Prefix: ''
    }
};

let uploader = client.uploadDir(params);
uploader.on('error', function(err) {
    console.error('unable to sync:', err.stack);
});
uploader.on('progress', function() {
    console.log('progress', uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', function() {
    console.log('done uploading');
});
