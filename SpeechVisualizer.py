from core.base.model.AliceSkill import AliceSkill
import subprocess


class SpeechVisualizer(AliceSkill):

	def __init__(self):
		super().__init__()

	def onSkillInstalled(self):
		super.onSkillInstalled()
		try:
			f = open("/etc/mosquitto/conf.d/websockets.conf", "x")
			# internal MQTT only with default ports supported for now
			f.write("listener 1883\nlistener 1884\nprotocol websockets\n")
			f.close()
			subprocess.run(['sudo', 'systemctl', 'restart', 'mosquitto'])
		except IOError as e:
			self.logError(e)
