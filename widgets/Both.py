import sqlite3
import json

from core.base.model.Widget import Widget
from core.base.model.widgetSizes import WidgetSizes
import core.base.SuperManager


class Both(Widget):

	SIZE = WidgetSizes.w
	OPTIONS: dict = dict()

	def __init__(self, data: sqlite3.Row):
		super().__init__(data)

	def getMQTT(self):
		host = self.ConfigManager.getAliceConfigByName('mqttHost')
		port = self.ConfigManager.getAliceConfigByName('mqttPort')
		return  json.dumps({'HOST': host, 'PORT': port})
