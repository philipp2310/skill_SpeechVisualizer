function onConnect() {
	MQTT.subscribe('hermes/tts/say');
}

function onMessage_SVBOTH(msg) {
	//msg to json, get 'text'
	let json = JSON.parse(msg.payloadString);
	if (msg.destinationName == 'hermes/tts/say') {
		$('#ASRcontentOutput')[0].innerHTML = json['text'];
	}
}

mqttRegisterSelf(onConnect, 'onConnect');
mqttRegisterSelf(onMessage_SVBOTH, 'onMessage');
