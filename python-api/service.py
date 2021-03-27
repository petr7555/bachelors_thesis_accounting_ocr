from flask import Flask, request
from model import category

app = Flask(__name__)

@app.route("/", methods=['GET'])
def welcome():
    return "Welcome to our Machine Learning REST API!"

@app.route("/category", methods=['POST'])
def category_route():
    request_data = request.get_json()
    return category(request_data["sentence"])

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)

