function onConnect() {
	MQTT.subscribe('hermes/asr/partialTextCaptured');
	MQTT.subscribe('hermes/asr/textCaptured');
	MQTT.subscribe('hermes/tts/say');
	MQTT.subscribe('hermes/nlu/intentParsed');
	MQTT.subscribe('hermes/asr/stopListening');
	MQTT.subscribe('hermes/asr/startListening');
}

function onMessage_SVBOTH(msg) {
	//msg to json, get 'text'
	let json = JSON.parse(msg.payloadString);
	if (msg.destinationName == 'hermes/asr/partialTextCaptured') {
		$('#ASRcontentBoth')[0].innerHTML = json['text'] + ' ...';
		$('#ASRconf')[0].innerHTML = Number.parseFloat(json['likelihood']).toPrecision(2) * 100 + '%';
	} else if (msg.destinationName == 'hermes/asr/textCaptured') {
		$('#ASRcontentBoth')[0].innerHTML = json['text'];
		$('#ASRconf')[0].innerHTML = Number.parseFloat(json['likelihood']).toPrecision(2) * 100 + '%';
	} else if (msg.destinationName == 'hermes/nlu/intentParsed') {
		$('#NLUskill')[0].innerHTML = json['intent']['intentName'];
		$('#NLUconf')[0].innerHTML = Number.parseFloat(json['intent']['confidenceScore']).toPrecision(2) * 100 + '%';
	} else if (msg.destinationName == 'hermes/asr/stopListening') {
		$('#SVI_ICON').attr('class', 'fas fa-microphone-slash');
	} else if (msg.destinationName == 'hermes/asr/startListening') {
		$('#SVI_ICON').attr('class', 'fas fa-microphone');
	} else {
		$('#ASRcontentBoth')[0].innerHTML = json['text'];
	}
}

mqttRegisterSelf(onConnect, 'onConnect');
mqttRegisterSelf(onMessage_SVBOTH, 'onMessage');
