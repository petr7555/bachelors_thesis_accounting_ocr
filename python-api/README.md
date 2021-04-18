Build

- `docker build -t model .`

Run

- `docker run -p 8000:80 model`

By pushing code to master, the Docker image is automatically built thanks to
`.github/workflows/python-apl.yml` pipeline. It is then published to Azure Container Registry. From there, it is
deployed to Azure Container Instances.

It is available on http://pythonapi.westeurope.azurecontainer.io/.

Documentation of endpoints is available [here](https://documenter.getpostman.com/view/9355808/TzJsfdUK).

### Logs

Logs are available at Azure Portal -> aci-python-api -> Containers -> Logs.

### Tests

The `tests/python-api.postman_collection.json` contains Postman tests that are run during the pipeline.
To run them locally, run `cd python-api/tests/ && npx -y newman run python-api.postman_collection.json -e local.postman_environment.json && cd ../../`

### Resources:

- https://github.com/plasticityai/magnitude
- https://www.alibabacloud.com/blog/how-to-create-and-deploy-a-pre-trained-word2vec-deep-learning-rest-api_594064
- https://docs.microsoft.com/cs-cz/azure/container-instances/container-instances-github-action
- https://flask.palletsprojects.com/en/1.1.x/testing/
- https://medium.com/weekly-webtips/using-github-actions-for-integration-testing-on-a-rest-api-358991d54a20
