extends Control

onready var Signals = GameLoader.get_game_root().find_node("Signals")
onready var game_timer = GameLoader.get_game_root().find_node("GameTimer")
onready var moveworld = GameLoader.get_game_root().find_node("MoveWorld")

# Called when the node enters the scene tree for the first time.
func _ready():
	if GameLoader.first_time: 
		visible = true
		$Button.visible = false
	else: 
		visible = false
	set_process(false)

func _process(delta):
	if Input.is_action_pressed("ui_accept"):
		deactivate()

func _on_Button_pressed():
	deactivate()
	
func deactivate():
	visible = false
	set_process(false)
	game_timer.start()
	
#Currently instructions cannot be safelly restarted in project
#Tiem still active all the time 
func reactivate():
	$Button.visible = true
	visible = true
