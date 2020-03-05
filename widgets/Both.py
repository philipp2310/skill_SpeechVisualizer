import json
import sqlite3

from core.base.model.Widget import Widget
from core.base.model.widgetSizes import WidgetSizes


class Both(Widget):
	SIZE = WidgetSizes.w
	OPTIONS: dict = dict()


	def __init__(self, data: sqlite3.Row):
		super().__init__(data)


	def getMQTT(self):
		host = self.ConfigManager.getAliceConfigByName('mqttHost')
		port = int(self.ConfigManager.getSkillConfigByName('SpeechVisualizer', 'MQTTWebsocketPort'))
		if port == 0:
			port = int(self.ConfigManager.getAliceConfigByName('mqttPort')) + 1
			self.ConfigManager.updateSkillConfigurationFile('SpeechVisualizer', 'MQTTWebsocketPort', port)

		return json.dumps({'HOST': host, 'PORT': port})
