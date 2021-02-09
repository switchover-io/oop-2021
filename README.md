# OOP Fachforum 2021 Example

This is the coding sample to the presentation "Feature Toggles - Sinn oder Unsinn in der heutigen Softwareentwicklung".

## Architectural Overview

## Setup & Deployment

The serverless functions will be deployed via AWS Cloud Development Kit (CDK). More info:
https://docs.aws.amazon.com/cdk/latest/guide/home.html



### Prerequisites

- AWS Account 
- Switchover Account (https://app.switchover.io)
- NodeJS (> 12)
- AWS CDK

installing aws-cdk: 

```bash
npm i -g aws-cdk
```

### Room-Service

Change to the room-service folder and build it:

```bash
npm install
npm run build
```

Afterwards you can deploy:
```bash
cdk deploy 
```

If you have a special aws profile you can also select as parameter:
```bash
cdk deploy --profile <AWS PROFILE>
``` 

### Review-Service

Copy `.env.sample` to `.env`. Add your Switchover SDK-Key.

Run the build:
```bash
npm install
npm run build
```

Deploy:
```bash
cdk deploy 
```

### Frontend

Copy the `.env.sample` to `.env.local`. 
Add your Switchover SDK KEY and also you API urls from the review- and room-service.

Install dependencies:
```bash
npm install
```

Run it locally:
```bash
npm run dev
```

Or, deploy it:
```bash
npm run build
cdk deploy
```

## Switchover configuration

Select a evnironment (e.g. development) and create the following toggles:

- Toggle `darkmode`, type `Boolean`
- Toggle `review-killswitch`, type `Boolean`
- Toggle `showReviews`, type `Boolean`
- Toggle `signUpExperiment`, type `JSON`: 
   Add a A/B-Split rollout option with 3 allocations:
   
   1) Label: RegisterGroup, Percentage: 33, Evaluation Value: `{"teaser":1,"label":"Registrieren"}`
   2) Label: SignUpGroup, Percentage: 33, Evaluation Value: `{"teaser":2,"label":"Sign Up"}`
   3) Label: MitmachenGroup: Percentage: 34, Evaluation Value: `{"teaser":3,"label":"Jetzt mitmachen"}`


Now you can toggle on or off. Don't forget to publish it.


  
   









