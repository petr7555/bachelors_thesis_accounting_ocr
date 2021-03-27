Build

- `docker build -t model .`

Run

- `docker run -p 8000:80 model`

By pushing code to master, the Docker image is automatically built thanks to
`.github/workflows/python-apl.yml` pipeline. It is then published to Azure Container Registry. From there, it is
deployed to Azure Container Instances.

It is available on http://pythonapi.westeurope.azurecontainer.io/.

For example requests and responses, see `postman_collection_tests.json`.

### Logs

Logs are available at Azure Portal -> aci-python-api -> Containers -> Logs.

### Tests

The `postman_collection_tests.json` contains Postman tests that are run during the pipeline and can be run manually
with `npx -y newman run postman_collection_tests.json`.

### Resources:

- https://github.com/plasticityai/magnitude
- https://www.alibabacloud.com/blog/how-to-create-and-deploy-a-pre-trained-word2vec-deep-learning-rest-api_594064
- https://docs.microsoft.com/cs-cz/azure/container-instances/container-instances-github-action
- https://flask.palletsprojects.com/en/1.1.x/testing/
- https://medium.com/weekly-webtips/using-github-actions-for-integration-testing-on-a-rest-api-358991d54a20