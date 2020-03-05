from pathlib import Path

from core.base.model.AliceSkill import AliceSkill


class SpeechVisualizer(AliceSkill):

	def __init__(self):
		super().__init__()


	def onStart(self):
		super().onStart()
		confPath = Path('/etc/mosquitto/conf.d/websockets.conf')
		if not confPath.exists():
			self.Commons.runRootSystemCommand(['cp', 'skills/SpeechVisualizer/websockets.conf', str(confPath)])
			self.Commons.runRootSystemCommand(['systemctl', 'restart', 'mosquitto'])
