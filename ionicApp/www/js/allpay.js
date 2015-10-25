function sendData(data, wsUrl) {
	websocket = new WebSocket(wsUrl);
	websocket.onopen = function(evt) {
		onOpen(evt, data)
	};
	websocket.onclose = function(evt) {
		onClose(evt)
	};
	websocket.onmessage = function(evt) {
		onMessage(evt)
	};
	websocket.onerror = function(evt) {
		onError(evt)
	};
}
function onOpen(evt, data) {
	console.log("CONNECTED");
	doSend(data);
}
function onClose(evt) {
	console.log("DISCONNECTED");
}
function onMessage(evt) {
	console.log(evt.data);
	websocket.close();
}
function onError(evt) {
	console.log(evt.data);
}
function doSend(message) {
	console.log("SENDING: " + message);
	websocket.send(message);
}
