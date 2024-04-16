const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  // const client = new AWS.CloudTrail();
  const resourceType = event.detail.configurationItem.resourceType;
  const resourceArn = event.resources[0];
  const resourceTaggingApiClient = new AWS.ResourceGroupsTaggingAPI();

  // TODO: Before the next stuff, just create the lambda as is and see if it works (First manually. Later will be automated)
  // TODO: Validate if one of the supported resource types
  // TODO: Validate if tag already does not exist (Or just don't fail the lambda in case it already exists)

  response = await resourceTaggingApiClient.tagResources({
    ResourceARNList: [resourceArn],
    Tags: [{ Key: "Company", Value: "Sonder" }],
  });
  console.log(`${resourceArn} was tagged`);
};
