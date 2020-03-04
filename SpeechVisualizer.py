from core.base.model.AliceSkill import AliceSkill
import os.path


class SpeechVisualizer(AliceSkill):

	def __init__(self):
		super().__init__()

	def onStart(self):
		super().onStart()
		if not os.path.isfile("/etc/mosquitto/conf.d/websockets.conf"):
			self.Commons.runRootSystemCommand(['cp', 'skills/SpeechVisualizer/websockets.conf', '/etc/mosquitto/conf.d/websockets.conf'])
			self.Commons.runRootSystemCommand(['systemctl', 'restart', 'mosquitto'])
