//Generated with ChatGPT - Not real code!!
//Lisätty linkitys AzureBoardiin
// Import required modules
const AWS = require('aws-sdk');
const fs = require('fs');

// Set up AWS credentials and configure AWS SDK
AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY'
});

// Create an S3 instance
const s3 = new AWS.S3();

// Function to upload a file to S3
function uploadFileToS3(filePath, fileName) {
  // Read the file from disk
  const fileContent = fs.readFileSync(filePath);

  // Upload parameters
  const params = {
    Bucket: 'YOUR_BUCKET_NAME',
    Key: fileName,
    Body: fileContent
  };

  // Upload file to S3
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading file:", err);
        reject(err);
      } else {
        console.log("File uploaded successfully:", data.Location);
        resolve(data.Location);
      }
    });
  });
}

// Function to download a file from S3
function downloadFileFromS3(key, filePath) {
  // Download parameters
  const params = {
    Bucket: 'YOUR_BUCKET_NAME',
    Key: key
  };

  // Download file from S3
  return new Promise((resolve, reject) => {
    s3.getObject(params, (err, data) => {
      if (err) {
        console.error("Error downloading file:", err);
        reject(err);
      } else {
        fs.writeFileSync(filePath, data.Body);
        console.log("File downloaded successfully:", filePath);
        resolve(filePath);
      }
    });
  });
}

// Example usage:
const filePath = 'path/to/local/file.jpg';
const fileName = 'file.jpg';
const s3Key = 'path/in/s3/file.jpg';

// Upload file to S3
uploadFileToS3(filePath, fileName)
  .then(() => {
    // Download file from S3
    return downloadFileFromS3(s3Key, 'downloaded-file.jpg');
  })
  .catch(err => {
    console.error("Error:", err);
  });
