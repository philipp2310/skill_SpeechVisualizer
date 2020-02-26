function onConnect(){
	console.log("connected");
	mqtt.subscribe("hermes/asr/partialTextCaptured")
	mqtt.subscribe("hermes/asr/textCaptured")
	mqtt.subscribe("hermes/tts/say")
	mqtt.subscribe("hermes/nlu/intentParsed")
	mqtt.subscribe("hermes/asr/stopListening")
	mqtt.subscribe("hermes/asr/startListening")
}

function onMessage(msg) {
	//msg to json, get 'text'
	let json = JSON.parse(msg.payloadString);
	if (msg.destinationName == 'hermes/asr/partialTextCaptured') {
		$('#ASRcontentBoth')[0].innerHTML = json['text'] + " ...";
		$('#ASRcontentInput')[0].innerHTML = json['text'] + " ...";
		$('#ASRconf')[0].innerHTML = Number.parseFloat(json['likelihood']).toPrecision(2)*100 + "%";
	} else if (msg.destinationName == 'hermes/asr/textCaptured') {
		$('#ASRcontentBoth')[0].innerHTML = json['text'];
		$('#ASRcontentInput')[0].innerHTML = json['text'];
		$('#ASRconf')[0].innerHTML = Number.parseFloat(json['likelihood']).toPrecision(2)*100 + "%";
	} else if (msg.destinationName == 'hermes/nlu/intentParsed') {
		$('#NLUskill')[0].innerHTML = json['intent']['intentName'];
		$('#NLUconf')[0].innerHTML = Number.parseFloat(json['intent']['confidenceScore']).toPrecision(2)*100 + "%";
	} else if (msg.destinationName == 'hermes/asr/stopListening'){
		$('#SVI_ICON').attr('class', 'fas fa-microphone-slash');
	} else if (msg.destinationName == 'hermes/asr/startListening') {
		$('#SVI_ICON').attr('class', 'fas fa-microphone');
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
