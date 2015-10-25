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
	input_request["AcctNo"] = str(cardNumber)
	input_request["Purchase"] = str(purchase)
	input_request["ExpDate"] = ExpDateString
	headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic MDAzNTAzOTAyOTEzMTA1Onh5eg==',
	}
	print(input_request)
	info = requests.post('https://w1.mercurycert.net/PaymentsAPI/Credit/Sale', headers=headers, params = input_request)
	parsed = info.json()
	print(parsed)