extends Node2D

var window 	
var time
var instruction_button_activated_on_startup = false

#Run before all _ready-functions. Ensure that the correct data is loaded
func _init():
	#Load translations and off_load later on retunr 
	TranslationServer.add_translation(load("res://lp_starting/translations.en.translation"))
	TranslationServer.add_translation(load("res://lp_starting/translations.sv.translation"))

	# Set locale to use English or Swedish, respectively. If none set, the locale from the device (or fallback = English) is used.
	# TranslationServer.set_locale("en")
	#TranslationServer.set_locale("sv")

func _ready():
	if OS.has_feature('JavaScript'):
		window = JavaScript.get_interface("window")

#Process for getting sensor-data and running user interaction
func _process(_delta):
	# If getting pose data of type array we control with body
	if OS.has_feature('JavaScript'):
		pass
