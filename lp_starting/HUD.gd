extends CanvasLayer

onready var game_timer = find_node("GameTimer")
onready var Signals = GameLoader.get_game_root().find_node("Signals")

onready var game_time_min_label = find_node("GameTimeMinLabel")
onready var game_time_sec_label = find_node("GameTimeSecLabel")
onready var time_out_label = find_node("TimeOutLabel")

onready var timeout_modal = find_node("TimeoutModal")

# Plaring time is 1 min or 60 sec
var time = 0
var mins = 0
var secs = 0

#reset gameloader to enable restarting game using GameLoader.get_game_root().reload_current_Scen
func _ready():
	timeout_modal.visible = false
	
	if GameLoader.temp_data.time > 0: 
		time = GameLoader.temp_data.time
	else: 
		time = GameLoader.GAME_TIME
		GameLoader.temp_data.time = time
	set_time_lables()
	if not GameLoader.temp_data.first_time: 
		time_out_label.visible = false

func set_time_lables(): 
	mins = fmod(time, 60*60)/60
	secs = fmod(time, 60)	
	var current_time_min = "%02d"%[mins]
	var current_time_sec = "%02d"%[secs]	
	game_time_min_label.text = str(current_time_min)
	game_time_sec_label.text = str(current_time_sec)

	
func reset_timer():
	time_out_label.visible = false
	$Control/end_score_control.visible = false
	game_timer.start()
	set_time_lables()

func stop_timer(): 
	game_timer.stop()

func _on_GameTimer_timeout():
	time -= 1
	GameLoader.temp_data.time = time 
	set_time_lables()
	if (time <= 0):
		$AnimationPlayer.play("run_modal")
		game_timer.stop()
		Signals.emit_signal("time_out")
