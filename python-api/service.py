from flask import Flask, request, send_file
from nlp_model import category
from image_model import process_image
from PIL import Image
import numpy as np
import base64
import cv2
import io

app = Flask(__name__)


@app.route("/", methods=['GET'])
def welcome():
    return "Welcome to the Machine Learning REST API for Receipts Scanner!"


@app.route("/category", methods=['POST'])
def category_route():
    request_data = request.get_json()
    return category(request_data["sentence"])


@app.route("/process-image", methods=['POST'])
def process_image_route():
    # get image from form data as base64, read to bytes
    file = request.files['image'].read()
    img_arr = np.frombuffer(file, np.uint8)
    img = cv2.imdecode(img_arr, cv2.IMREAD_GRAYSCALE)
    # do the processing
    img = process_image(img)
    # end of processing
    img = Image.fromarray(img.astype("uint8"))
    rawBytes = io.BytesIO()
    img.save(rawBytes, "JPEG")
    rawBytes.seek(0)
    img_base64 = base64.b64encode(rawBytes.read())
    return {
        "image": str(img_base64).split("'")[1],  # removes 'b from the beginning
        "mime": "image/jpeg"
    }


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)
