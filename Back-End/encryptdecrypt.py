from flask import Flask, request
from flask_sockets import Sockets
app = Flask(__name__)

@app.route("/")
def index():
    return "Node.js is the only real dev language"
@app.route("/func/<int1>")
def func(int1):
	return int1

if __name__ == "__main__":
    app.run()
