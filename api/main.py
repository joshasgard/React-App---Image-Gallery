from crypt import methods
import os
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from mongo_client import mongo_client

gallery = mongo_client.gallery # create gallery database in mongo client
images_collection = gallery.images # create collection of images

load_dotenv(dotenv_path= "./.env.local")   # load predefined environment 
                                            # variable to app

UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
UNSPLASH_URL = "https://api.unsplash.com//photos/random/"
DEBUG = bool(os.environ.get("DEBUG", True))

if not UNSPLASH_KEY:
    raise EnvironmentError("Please create a .env.local file and add UNSPLASH KEY")

app = Flask(__name__)
CORS(app)  # Cors needs to be enabled on the flask app to allow the cross-origin resource sharing btw the different front-end and backend domains (or servers)

app.config["DEBUG"] = DEBUG



@app.route("/new-image")
def new_image():

    '''
    Custom API function between front-end react-app and unsplash api.
    Receives request from front-end client and then sends a get request to unsplash api
    for response. 
    args: 
        None
    Return:
        data (json) - response data containing image details
    '''
    word = request.args.get("query")  # get request from front-end application to API
    headers = {
        "Accept-Version": "v1",
        "Authorization": "Client-ID " + UNSPLASH_KEY
    }
    params = {"query": word}
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    # request from API to unsplash API
    data = response.json()
    return data

@app.route("/images", methods=["GET", "POST"])
def images():
    """
        API retrieves saved images into MongoDB and saves desired image to DB.
    """
    if request.method == "GET":
        # read images from database
        images = images_collection.find({})
        return jsonify([img for img in images])
    if request.method == "POST":
        # post images to database
        image = request.get_json()
        image["_id"] = image.get("id")
        result = images_collection.insert_one(image)
        inserted_id = result.inserted_id
        return {"inserted_id": inserted_id}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
