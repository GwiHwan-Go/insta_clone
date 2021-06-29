import AWS from "aws-sdk";

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_ACCESSKEY,
        secretAccessKey: process.env.AWS_SECRETKEY
    }
});

export const uploadToS3 = async (file, userId, folderName) => {
    const {filename, createReadStream } = await file;
    const readStream = createReadStream();
    const newFilename = `${folderName}/${userId}-${Date.now()}-${filename}`;
    const {Location} = await new AWS.S3().upload({
        Bucket: "instaclone-db",
        Key : newFilename,
        ACL: "public-read",
        Body: readStream,
    }).promise()

    return Location;
}