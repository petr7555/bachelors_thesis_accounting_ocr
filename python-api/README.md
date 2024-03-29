# Python API for Receipts Scanner

This API provides the image processing and item categorization functionality for Receipts Scanner.

Documentation of endpoints (generated by [Postman](https://www.postman.com/)) is
available [here](https://documenter.getpostman.com/view/9355808/TzJsfdUK). You can import the
collection `tests/Receipts-Scanner-Python-API.postman_collection.json` into Postman.

## Local development

### Without Docker

You can use any Python environment manager you like (venv/Conda).

#### venv

- `python -m venv venv` to create a new environment in folder `venv`
- `source source venv/bin/activate` to activate that environment
- `pip install -r requirements.txt` to install all required dependencies

#### Conda

- `conda create -n pythonapi python=3.8` to create a new environment
- `conda activate pythonapi` to activate that environment
- `pip install -r requirements.txt` to install all required dependencies

Download the word embeddings model from http://magnitude.plasticity.ai/fasttext/medium/wiki-news-300d-1M.magnitude.
Place it into `~/.magnitude/wiki-news-300d-1M.magnitude`.
Now you can run the server with `python service.py`.

### With Docker

Build a docker image:

- `docker build -t model .`

Run a docker container from the built image:

- `docker run -p 80:80 model`

## CI

By pushing code to `master` branch, the changes in `python-api` are automatically deployed thanks to the Google Cloud
Build repository hook. A new Docker image is built and saved inside Google Container Registry. It is then used by the
`python-api` service setup in Google Cloud Run. If an error occurs, the requests stay routed towards the previous
working instance.

The Python API service is available on https://python-api-munkyxsgfa-ew.a.run.app/.

[Google Cloud Run](https://console.cloud.google.com/run?project=bachelorsthesisaccountingocr)

### Tests

The `tests/Receipts-Scanner-Python-API.postman_collection.json` contains Postman tests that are run during the pipeline.
They wait 20 minutes before they start to allow a new container to be deployed. The deployment takes around 8 minutes.
The result of the tests does not affect the deployment of a new container. Even if those tests fail, and the new
container starts successfully, it will be deployed. On the contrary, if the deployment of a new container fails, the
tests will run on the previously deployed container and succeed. The tests are therefore only informative.

To run them locally,
run `cd python-api/tests/ && npx -y newman run Receipts-Scanner-Python-API.postman_collection.json -e local.postman_environment.json && cd ../../`

If you make changes in the Postman collection and its tests, reexport the collection from Postman and put it
inside `~/python-api/tests/`. Run `npm run prettier:format` to reformat the json of that collectio. Follow the same
process if changing Postman environment.

### Resources:

- https://github.com/plasticityai/magnitude
- https://www.alibabacloud.com/blog/how-to-create-and-deploy-a-pre-trained-word2vec-deep-learning-rest-api_594064
- https://docs.microsoft.com/cs-cz/azure/container-instances/container-instances-github-action
- https://flask.palletsprojects.com/en/1.1.x/testing/
- https://medium.com/weekly-webtips/using-github-actions-for-integration-testing-on-a-rest-api-358991d54a20
