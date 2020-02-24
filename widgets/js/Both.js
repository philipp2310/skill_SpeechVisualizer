function onConnect(){
	console.log("connected");
	mqtt.subscribe("hermes/asr/partialTextCaptured")
	mqtt.subscribe("hermes/asr/textCaptured")
	mqtt.subscribe("hermes/tts/say")
}

function onMessage(msg){
	//msg to json, get 'text'
	console.log(msg.payloadString);
	let json = JSON.parse(msg.payloadString);
	if(msg.destinationName == 'hermes/asr/partialTextCaptured' || msg.destinationName == 'hermes/asr/textCaptured') {
		$('#ASRcontentBoth')[0].innerHTML = json['text'];
		$('#ASRcontentInput')[0].innerHTML = json['text'];
	} else {
		$('#ASRcontentBoth')[0].innerHTML = json['text'];
		$('#ASRcontentOutput')[0].innerHTML = json['text'];
	}
}

function MQTTConnect() {
	host = "192.168.0.253";
	port = 1884;
	mqtt = new Paho.MQTT.Client(host, port, "SpeechVis")

	var options = { timeout: 3,
		onSuccess: onConnect, };
	mqtt.onMessageArrived = onMessage
	mqtt.connect(options);
	$('#ASRcontentBoth')[0].innerHTML = "connected";
}
