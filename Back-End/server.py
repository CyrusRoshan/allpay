#!/user/bin/python

# import statements

from flask import Flask, request
import json
from api import *

# setup

app = Flask(__name__)

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

@app.route('/getSome')
def getSome():
    return request.args.get("test")

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
  encrypted = request.args.get('encrypted', False)
  if (encrypted == "False" or encrypted == False):
    return str(1)
    cnString = request.args.get('cnString', '5499990123456781')
    pString = request.args.get('pString', '2.00')
    edString = request.args.get('edString', '0816')
  else: 
    data = request.args.get('data')
    key = request.args.get('key')
    walletID = request.args.get('walletID')
    decryptedData = getDecryptedData(walletID, data, key)
    cnString, pString, edString = decryptedData[0], decryptedData[1], decryptedData[2]
  outcome = transact(cnString, pString, edString)
  return str(outcome)

if __name__ == "__main__":
    app.run()
