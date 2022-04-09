extends Node


# Dont touch this dict. It passes data about the game and back. 
# Here persiten data will be stored but access it though the function get_game_data
var session_data = {
	"duration": 0, 
	"sessions": [],
	"data": {}
}
#A dictionary that is allwasy empty on game-start and that can be used for proejcts spcefic temporary storage. 
var temp_data = {}
#Previous game_data is stored in a game_data dict provided on startup. 
#This data is added to session-data som changeing this dict content will be loaded 
var game_data = {}

""" This is the name and namespace of the game and is expected to be the same as: 
	* name of the exported pck, 
	* name of the root-level starting scene, e.g. starting.tcsn that should reside at res://-level
	* name of the folder, e.g. res://starting/* in which the client should put all other assets than the starting scen and of course godot genreated project.godot file and so forth 
	* name of the folder used if storing anyhtin locally, that is on user://starting/* that cans can use for local storage of data if needed   
"""

var game_namespace = "starting"

"""
# Tn the client portal this function is called before the game is loaded. 
# In development projects this function needs not be called since the GameLoader is not reloaded when for instance using reload_current_scene to restart the game when the player dies.   
# this is to ensure that varabes are in place before _ready functions use them. 
"""

#This function is called when the user 
func start_game(name): 
	time = GAME_TIME
	sensor_providing_data = false
	total_score = 0
	first_time = true 

"""
The game time is set on first time to the GAME_TIME. tume is the varable used by the timer. In the future other games may have other settings 
but for now 120 seconds, that is 2 minutes is the norm. For testing this varable can be set to low values. In the client-portal, this will be set  
"""
const GAME_TIME = 2 #120
#This is the Game -timer value, that is used ingames to track the game-timer and all. 
# This should be moved to the game timer along with the varables 
var time = GAME_TIME

"""
Varaibel that checks if the sensor has started and is providing data. This should stop the game from progressing, 
the timer counding down and hide the game-starting button until data is comming in. 
"""
var sensor_providing_data = false

"""
The score of the game that is later provided back as a result of the play time. 
In games whre you die, we find score still needs to be accumelated so that the total-score is provided. 
Using a loacal score and then this varable for total-score can be a good design 
"""
var total_score = 0

"""
#fist_time will be set to true when starting the game. 
If the game uses reloading then setting this varable to false can help control the flow. 
The first_tme the user should be presented with the instruction and not the second time  
"""
var first_time = true 

#Use to check if in developmentmode. Ths method will return true when on a deplyed server 
const im_live = false

"""
Call this game to reload the game-node, that is istead of get_tree().reload_current_scene()
The game clinet portal will later change how this is done 
"""
func reload_game():
	first_time = false
	get_tree().reload_current_scene()

"""
Use this instead of get_tree().get_current_scene() or get_tree().get_current_scene(). Also, dont use get_root().get.tree()
In the client the top-node will not be the game top-node. 
"""
func get_game_root():
	return get_tree().get_current_scene()

"""
Allways finnish the game by calling this function, and hot using get_tree().quit() yourselves  
set score if total_score should not be used for som strange reason 
set duraiton if GAME_TIME should not be used for some reson
"""	
func back_to_client(): 
	if GameLoader.time > 0: 
		if im_live: #Safe way to print in development that is now active on the deplyed version 
			print("Finished early - no points")
	else: 
		if im_live:
			print(session_data)
	get_tree().quit()
