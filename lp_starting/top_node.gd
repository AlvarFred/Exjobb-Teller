#var shoulder_right = Vector3(0.0, 0.0, 0.0)
#var shoulder_left = Vector3(0.0, 0.0, 0.0)
#var elbow_right = Vector3(0.0, 0.0, 0.0)
#var elbow_left = Vector3(0.0, 0.0, 0.0)
#var hand_right  = Vector3(0.0, 0.0, 0.0)
#var hand_left  = Vector3(0.0, 0.0, 0.0)
#
## SET up vectors for all important nodes for reuse so we don't create new variables all the time. 
## Might not bee needed.  
#
## data_array.result[0]  == nose
## data_array.result[7]  == ear_left
## data_array.result[8]  == ear_right
## data_array.result[9]  == mouth_left
## data_array.result[10]  == mouth_right
## data_array.result[11]  == left_shoulder
## data_array.result[12]  == right_shoulder
## data_array.result[13]  == left_elbow
## data_array.result[14]  == right_elbow
## data_array.result[15]  == left_wrist
## data_array.result[16]  == right_wrist
## data_array.result[23]  == left_hip
## data_array.result[24]  == right_hip
#




extends Node2D

var shoulder_right = Vector3(0.0, 0.0, 0.0)
var shoulder_left = Vector3(0.0, 0.0, 0.0)
var elbow_right = Vector3(0.0, 0.0, 0.0)
var elbow_left = Vector3(0.0, 0.0, 0.0)
var nose  = Vector3(0.0, 0.0, 0.0)

onready var instructions = GameLoader.get_game_root().find_node("instruction_control")
onready var Signals = GameLoader.get_game_root().find_node("Signals")

var window 	
var time
var instruction_button_activated_on_startup = false

#here is the carrier data_array for reading sensordata  
var data_array = ""
var s = null

#Run and use GameLoader data to determin if this is first_time run. 
#runs before all _ready-functions. Ensure that the correct data is loaded
func _init():
	if GameLoader.temp_data.empty(): 
		GameLoader.temp_data.best_score = 0
		GameLoader.temp_data.player_dead = false
		GameLoader.temp_data.data = GameLoader.get_game_data()

		
		#Load translations and off_load later on retunr 
		TranslationServer.add_translation(load("res://lp_starting/translations.en.translation"))
		TranslationServer.add_translation(load("res://lp_starting/translations.sv.translation"))

		# Set locale to use English or Swedish, respectively. If none set, the locale from the device (or fallback = English) is used.
		# TranslationServer.set_locale("en")
		#TranslationServer.set_locale("sv")

func copy_to_vector(vec3, dict): 
	#assumes dict is in the format of dict.x, dict.y, dict.z ...
	#Data passed from sensor is of type dict, not vector 
	vec3.x = dict.x
	vec3.y = dict.y
	vec3.z = dict.z

func _ready():
	if OS.has_feature('JavaScript'):
		window = JavaScript.get_interface("window")

#Process for getting sensor-data and running user interaction
func _process(_delta):
	# If getting pose data of type array we control with body
	if OS.has_feature('JavaScript'):
		s = window.results
		if s == null or s == "":
			pass
		else: 
			data_array = JSON.parse(s)
			if typeof(data_array.result) == TYPE_ARRAY:
				if GameLoader.first_time and not instruction_button_activated_on_startup: 
					instructions.reactivate()
					instruction_button_activated_on_startup = true
			
				#Encode data trasnfer and detections of activation states for the game
				#Typically right is left, that is the data thats encoded for left might be whats precived as right becasue the webcam is flipped
				copy_to_vector(nose, data_array.result[0])# Check shoulder positions and width



	# If we don't get any pose data, we control the player with arrow keys. For testing purposes.
	else:
		if GameLoader.first_time and not instruction_button_activated_on_startup:
			instruction_button_activated_on_startup = true		
			instructions.reactivate()
		if Input.is_action_pressed("left"):
			pass
		elif Input.is_action_pressed("right"):
			pass
		elif Input.is_action_pressed("up"): 
			pass 
		elif Input.is_action_pressed("down"):
			pass#
