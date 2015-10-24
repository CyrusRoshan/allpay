from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"
@app.route("/func/<int1>")
def func(int1):
	return int1

if __name__ == "__main__":
    app.run()