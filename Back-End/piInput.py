from flask import Flask, request
import requests

app = Flask(__name__)

@app.route('/')
def testPage():
  return "server is up and running"

@app.route('/bothServers')
def bothServers:
  r = requests.get(url = #TODO)
  return r.text

@app.route('/directCall')
def callDirect():
  params = dict()
  params['encrypted'] = 'False'
  r = requests.get(url = #TODO/callVantiv, params = params)
  return r.text

@app.route('/callVantiv')
def callVantiv():
  params = dict()
  params['data'] = request.args.get('data')
  params['walletID'] = request.args.get('walletID')
  params['key'] = request.args.get('key')
  params['encrypted'] = request.args.get('encrypted', "True")
  r = requests.get(url = "http://172.0.0.1"/callVantiv, params = params)
  return r.text

if __name__ == "__main__":
    app.run()
