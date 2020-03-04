
var MQTTHOST = "";
var MQTTPORT = 0;
var MQTT = null;

function MQTTConnect(host, port) {
	MQTT = new Paho.MQTT.Client(host, port, "SpeechVis")
	var options = { timeout: 3,
					onSuccess: onConnect};
	MQTT.onMessageArrived = onMessage;
	MQTT.connect(options);
}

function onMessage(msg){
	let len = MQTT_RECEIVERS.length;
	for( let i = 0; i < len; i++){
		MQTT_RECEIVERS[i](msg);
	}
}

function getMQTTConfig() {
    $.ajax({
        url: '/home/widget/',
        data: JSON.stringify({
            skill: 'SpeechVisualizer',
            widget: 'Both',
            func: 'getMQTT',
            param: ''
        }),
        contentType: 'application/json',
        dataType: 'json',
        type: 'POST'
    }).done(function(answer) {
		MQTTHOST = ""+answer['HOST'];
		if( MQTTHOST == 'localhost'){
			MQTTHOST = window.location.hostname;
		}
		MQTTPORT = 0 + answer['PORT'];
		MQTTConnect(MQTTHOST, MQTTPORT);
	})
}

getMQTTConfig();
