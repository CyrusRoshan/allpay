import requests

input_request = {
"InvoiceNo":"1",
"RefNo":"1",
"Memo":"Test Purchase",
"Purchase":"1.00",
"AccountSource":"Swiped",
"AcctNo":"5499990123456781",
"ExpDate":"0816",
"OperatorID":"money2020",
}
def transact(cardNumber, purchase, ExpDateString):
	input_request["AcctNo"] = cardNumber
	input_request["Purchase"] = purchase
	input_request["ExpDate"] = ExpDateString
	headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic MDAzNTAzOTAyOTEzMTA1Onh5eg==',
	}
	info = requests.post('https://w1.mercurycert.net/PaymentsAPI/Credit/Sale', headers=headers, json = input_request)
	parsed = info.json()
	print(parsed)