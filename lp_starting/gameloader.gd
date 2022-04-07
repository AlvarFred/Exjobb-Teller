extends Node


var session_data = {
	"duration": 0, 
	"sessions": [],
	"data": {}
}
var temp_data = {
}

var game_loading = "starting"
func start_game(name): 
	pass

const GAME_TIME = 120 

func _init():
	start_game("Oi")	

func get_game_root():
	return get_tree().get_current_scene()

func add_score(point): 
	var d = {}
	d.interal = game_loading
	d.points = point
	session_data.sessions.append(d)
	
func get_game_data(): 
	return session_data.data
	
func replace_game_data(game_data): 
	session_data.data = game_data
	
func back_to_client(): 
	session_data.duration = GAME_TIME
	get_tree().quit()
