import os
import requests
from flask import Flask, request
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv(dotenv_path= "./.env.local")   # add unsplash key to app environment variable

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
    Returns:
        data (json) - response data containing image details
    '''
    word = request.args.get("query")  #get request from front-end application to API

    headers = {
        "Accept-Version": "v1",
        "Authorization": "Client-ID " + UNSPLASH_KEY
    }
    params = {"query": word}
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    # request from API to unsplash API
    data = response.json()
    return data


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
