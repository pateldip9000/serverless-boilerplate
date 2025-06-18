##

### Created By : Dip Patel

##

Boilerplate code for rapidly creating ready-to-deploy Serverless Framework services.

##

Node version 20

##

### Quick Start

- **Install and Configure the Serverless Framework**

```
npm install -g serverless
```

- **Prefix the command with sudo if you’re running this command on Linux.**

  Generate PUBLIC_KEY & SECRET_KEY from your AWS account

```
sls config credentials \
--provider aws \
--key PUBLIC_KEY \
--secret SECRET_KEY
```

- **Alternate Way to set PUBLIC_KEY & SECRET_KEY**

  create credentials file in the .aws folder, Profile name is added in the serverless.ts file

```
[profile]
aws_access_key_id=XXXXXXXXXXXX
aws_secret_access_key=XXXXXXXXXXXXXXXXXXXXXXXXXxx
```

- **Installing Dependencies**

```
npm install
```

##

##

### Ready to Run in Localhost!

You can see the list of available endpoints on http://localhost:3000/

```
sls offline
```

- **To run on local IP**

```
sls offline --host 192.168.10.31
```

- **To list all the options for the plugin run:**

```
sls offline --help
```

##

##

### Ready to Deploy Full Project!

Switch back to the terminal window. By running one command, your app will be deployed.

```
serverless deploy
```

- **To Deploy Single Function**

```
serverless deploy function -f functionName
```

- **Deployment with stage and region options**

```
serverless deploy function --function helloWorld \
  --stage dev \
  --region us-east-1
```

- **Deploy only configuration changes**

```
serverless deploy function --function helloWorld --update-config
```

##

##

### To Run SQS Offline!

Easy to use AWS SQS offline

```
docker compose up
```

Elastic MQ Dashboard

```
http://localhost:9325/
```

##

##

### To Run S3 Offline!

Start Local S3

```
serverless s3 start
```

Add Dummy Access Key & Secret Key

```
[local]
aws_access_key_id = S3RVER
aws_secret_access_key = S3RVER
```

Run Command to updalod file in local S3

```
aws --endpoint-url=http://localhost:4569 s3 cp demotest.csv s3://local-bucket/uploads/demotest.csv --profile local
```

##

More Details Found Here : https://www.serverless.com/plugins/serverless-offline
