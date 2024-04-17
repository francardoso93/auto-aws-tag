# auto-aws-tag

- Gets event from EventBridge AWS rule
- Uses Tagging API to tag any resource

Deploy config:

```
alias lambdaup="zip -r ../auto-aws-tag.zip * && aws lambda update-function-code --function-name auto-aws-tag --zip-file fileb://../auto-aws-tag.zip"

lambdaup
```