from flask import Flask, request
import requests

app = Flask(__name__)

@app.route('/')
def callVantiv():
  params = dict()
  params['data'] = request.args.get('data')
  params['walletID'] = request.args.get('walletID')
  params['key'] = request.args.get('key')
  r = requests.get(url = 'http://127.0.0.1:5000/', params = params)
  return r.text

if __name__ == "__main__":
    app.run()
