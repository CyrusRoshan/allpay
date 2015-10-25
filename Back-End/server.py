#!/user/bin/python

# import statements

from flask import Flask, request
from flask_sockets import Sockets
import json
from api import *

# setup

app = Flask(__name__)
sockets = Sockets(app)

# helper functions

def readFile(filename):
  return open(filename, "rt").read()

def writeFile(filename, contents):
  return open(filename, "wt").write(contents)

def makeFile(filename):
  open(filename, 'w')

def getDecryptor(walletID):
  filename = str(walletID) + ".txt"
  return readFile(filename)

def getDecryptedData(walletID, data, key):
  decryptor = getDecryptor(walletID)
  exec(decryptor)
  decryptorFn = decryptor(key)
  return decryptorFn(data)

# functions/routes

@app.route('/')
def index():
    return "Node.js is the only real dev language"

# uploads a decryptor function generator to the server

@app.route('/uploadDecryptor')
def uploadDecrypter():
  identifier = request.args.get('walletID')
  content = request.args.get('function')
  filename = str(identifier) + ".txt"
  makeFile(filename)
  writeFile(filename, content)

@app.route('/callVantiv')
def callVantiv():
  data = request.args.get('data')
  key = request.args.get('key')
  walletID = request.args.get('walletID')
  decryptedData = getDecryptedData(walletID, data, key)
  cnString, pString, edString = decryptedData[0], decryptedData[1], decryptedData[2]
  outcome = transact(cnString, pString, edString)
  return outcome

if __name__ == "__main__":
    app.run()
