#!/bin/bash

# Script to set CORS policy for S3 bucket
# Make sure you have AWS CLI configured with your credentials

echo "Setting CORS policy for S3 bucket: mywebsbucket"

aws s3api put-bucket-cors \
  --bucket mywebsbucket \
  --cors-configuration file://s3-cors-policy.json

if [ $? -eq 0 ]; then
    echo "✅ CORS policy successfully applied to S3 bucket!"
    echo "Your images should now load properly on your website."
else
    echo "❌ Failed to apply CORS policy. Please check your AWS credentials and bucket name."
fi

echo ""
echo "You can also set this manually in the AWS Console:"
echo "1. Go to https://s3.console.aws.amazon.com/"
echo "2. Select bucket: mywebsbucket"
echo "3. Go to Permissions > Cross-origin resource sharing (CORS)"
echo "4. Paste the contents of s3-cors-policy.json"
echo "5. Save changes"
