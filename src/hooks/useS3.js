import { useState, useEffect } from "react";
import AWS from "aws-sdk";

// Load environment variables from a .env file

function useS3() {
  const [s3, setS3] = useState(null);
  const [bucketName, setBucketName] = useState(
    process.env.REACT_APP_S3_BUCKET_NAME || ""
  );
  const [region, setRegion] = useState(process.env.REACT_APP_AWS_REGION || "");
  const [accessKeyId, setAccessKeyId] = useState(
    process.env.REACT_APP_AWS_ACCESS_KEY_ID || ""
  );
  const [secretAccessKey, setSecretAccessKey] = useState(
    process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || ""
  );

  useEffect(() => {
    if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
      console.error(
        "Missing S3 configuration. Make sure to set REACT_APP_S3_BUCKET_NAME, REACT_APP_AWS_REGION, REACT_APP_AWS_ACCESS_KEY_ID, and REACT_APP_AWS_SECRET_ACCESS_KEY in your .env file."
      );
      return;
    }

    AWS.config.update({
      region,
      accessKeyId,
      secretAccessKey,
    });

    const s3Instance = new AWS.S3();
    setS3(s3Instance);
  }, [bucketName, region, accessKeyId, secretAccessKey]);

  const uploadToS3 = async (file, key) => {
    if (!s3) {
      console.error("S3 is not initialized.");
      return null;
    }

    try {
      const params = {
        Bucket: bucketName,
        Key: key,
        Body: file,
        // ACL: 'public-read', // Make the uploaded image public
      };

      const data = await s3.upload(params).promise();
      return data.Location; // Return the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading to S3:", error);
      return null;
    }
  };

  const uploadMultipleToS3 = async (files) => {
    if (!s3) {
      console.error("S3 is not initialized.");
      return [];
    }

    const uploadedUrls = [];

    for (const file of files) {
      const key = `path/to/${file.name}`;
      const url = await uploadToS3(file, key);
      if (url) {
        uploadedUrls.push(url);
      }
    }

    return uploadedUrls;
  };

  const getImageUrlFromS3 = (key) => {
    if (!s3) {
      console.error("S3 is not initialized.");
      return null;
    }

    try {
      const params = {
        Bucket: bucketName,
        Key: key,
      };

      const url = s3.getSignedUrl("getObject", params);
      return url;
    } catch (error) {
      console.error("Error getting image URL from S3:", error);
      return null;
    }
  };

  return {
    s3,
    bucketName,
    region,
    accessKeyId,
    secretAccessKey,
    uploadToS3,
    uploadMultipleToS3,
    getImageUrlFromS3,
  };
}

export default useS3;
