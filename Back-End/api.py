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
def transact(cardNumberstring, purchasestring, ExpDateString):
	input_request["AcctNo"] = cardNumberstring
	input_request["Purchase"] = purchasestring
	input_request["ExpDate"] = ExpDateString
	headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic MDAzNTAzOTAyOTEzMTA1Onh5eg==',
	}
	info = requests.post('https://w1.mercurycert.net/PaymentsAPI/Credit/Sale', headers=headers, json = input_request)
	parsed = info.json()
	if parsed["CmdStatus"] == "Approved":
		return 1
	else:

		return 0