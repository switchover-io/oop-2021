const cdk = require('@aws-cdk/core');
const { SPADeploy } = require('cdk-spa-deploy');

class CdkSPAStack extends cdk.Stack {
  constructor(scope, id, props = {}) {
    super(scope, id, props);

    new SPADeploy(this, 'spaDeploy')
      .createBasicSite({
        indexDoc: 'index.html',
        websiteFolder: './dist'
      });

    new SPADeploy(this, 'cfDeploy')
      .createSiteWithCloudfront({
        indexDoc: 'index.html',
        websiteFolder: './dist'
      });
  }
}


const app = new cdk.App();
new CdkSPAStack(app, 'CdkSPAStack');
app.synth();