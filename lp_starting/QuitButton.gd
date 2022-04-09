extends Button

onready var Signals = GameLoader.get_game_root().find_node("Signals")

func _ready():
	connect("pressed", self, "_on_quit_pressed")
	Signals.connect("time_out", self, "_on_game_timeout")
	visible = false
	
func _on_quit_pressed():
	visible = false
	TranslationServer.remove_translation(load("res://lp_starting/translations.en.translation"))
	TranslationServer.remove_translation(load("res://lp_starting/translations.sv.translation"))
	GameLoader.back_to_client()
	disabled = true
	
func _on_game_timeout():
	visible = true

