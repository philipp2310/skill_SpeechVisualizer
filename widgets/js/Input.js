function onConnect(){
	console.log("connected");
	MQTT.subscribe("hermes/asr/partialTextCaptured")
	MQTT.subscribe("hermes/asr/textCaptured")
	MQTT.subscribe("hermes/nlu/intentParsed")
	MQTT.subscribe("hermes/asr/stopListening")
	MQTT.subscribe("hermes/asr/startListening")
}

function onMessage_SVINPUT(msg) {
	//msg to json, get 'text'
	let json = JSON.parse(msg.payloadString);
	if (msg.destinationName == 'hermes/asr/partialTextCaptured') {
		$('#ASRcontentInput')[0].innerHTML = json['text'] + " ...";
		$('#ASRconf')[0].innerHTML = Number.parseFloat(json['likelihood']).toPrecision(2)*100 + "%";
	} else if (msg.destinationName == 'hermes/asr/textCaptured') {
		$('#ASRcontentInput')[0].innerHTML = json['text'];
		$('#ASRconf')[0].innerHTML = Number.parseFloat(json['likelihood']).toPrecision(2)*100 + "%";
	} else if (msg.destinationName == 'hermes/nlu/intentParsed') {
		$('#NLUskill')[0].innerHTML = json['intent']['intentName'];
		$('#NLUconf')[0].innerHTML = Number.parseFloat(json['intent']['confidenceScore']).toPrecision(2)*100 + "%";
	} else if (msg.destinationName == 'hermes/asr/stopListening'){
		$('#SVI_ICON').attr('class', 'fas fa-microphone-slash');
	} else if (msg.destinationName == 'hermes/asr/startListening') {
		$('#SVI_ICON').attr('class', 'fas fa-microphone');
	}
}
