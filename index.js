const {
  ResourceGroupsTaggingAPIClient,
  TagResourcesCommand,
} = require("@aws-sdk/client-resource-groups-tagging-api");

exports.handler = async (event) => {
  const resourceArn = event.resources[0];

  // ResourceType filter is done at EvenBridge rule, so we don't need to redo it here.
  console.log(`Requesting to tag ${resourceArn}...`);

  const taggingClient = new ResourceGroupsTaggingAPIClient({
    region: "us-east-1",
  });
  const tagResourcesCommand = new TagResourcesCommand({
    ResourceARNList: [resourceArn],
    Tags: { Company: "Sonder" },
  });

  try {
    const data = await taggingClient.send(tagResourcesCommand);
    const responseStr = JSON.stringify(data);
    console.log(`Response from tagResource command: ${responseStr}`);
    if (
      data.$metadata.httpStatusCode < 200 ||
      data.$metadata.httpStatusCode > 299 ||
      (data.failedResourcesMap &&
        Object.keys(data.failedResourcesMap).length > 0)
    ) {
      throw new Error(responseStr);
    }
  } catch (error) {
    console.log(`OnCatch error ${JSON.stringify(error)}`);
    throw error;
  }
};
