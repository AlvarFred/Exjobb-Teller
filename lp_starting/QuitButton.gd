extends Button

onready var Signals = GameLoader.get_game_root().find_node("Signals")

func _ready():
	connect("pressed", self, "_on_quit_pressed")
	Signals.connect("time_out", self, "_on_game_timeout")
	visible = false
	
func _on_quit_pressed():
	disabled = true
	TranslationServer.remove_translation(load("res://space_shooter/translations.en.translation"))
	TranslationServer.remove_translation(load("res://space_shooter/translations.sv.translation"))
	
	GameLoader.add_score(GameLoader.temp_data.best_score)
	var game_data = {}
	game_data.top = 12 
	GameLoader.replace_game_data(game_data)
	GameLoader.back_to_client()
	
func _on_game_timeout():
	visible = true

