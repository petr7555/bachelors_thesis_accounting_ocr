from flask import Flask, request
from model import similarity

app = Flask(__name__)

@app.route("/", methods=['GET'])
def welcome():
    return "Welcome to our Machine Learning REST API!"

@app.route("/similarity", methods=['GET'])
def similarity_route():
    word1 = request.args.get("word1")
    word2 = request.args.get("word2")
    return str(similarity(word1, word2))

@app.route("/category", methods=['GET'])
def category_route():
    word = request.args.get("word")
    return str(similarity(word1, word2))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)

