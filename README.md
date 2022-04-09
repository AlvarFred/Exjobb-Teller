The following godot limitations exist since the games will be exported as pcks and included as dlc-projects in the Liopep Client which is the game portal for these projects. This means that some things dont exist. 

* Projects cannot use on AutoLoad or ProjectSettings for its operations since these will be set fomr the get go in the "client". 
* Game size is 1920*1080 and window-scalling 2D and keep. 
* The game Client will start and stop the projects using the start_game and back_to_client. 
* GameTime is managed by the GameLoader and uses now 120 seconds, e.g. 2 minutes. This varable can be changed in the game for testing. In the. client the clients settings will override. 
* Dont use get_tree().paused in game projects 
* Dont activate vsyn and keep the force fps 30 or at a maximum forcing to 60.
* never use this from godot ... yield(get_tree().create_timer(2), "timeout") ... this global timer can be globally timedout form and therefore behaves strangelly in any game but also in the client_portal  
* In GameLoader the function am_i_live() will return false when on development platform. Use to block/enable printing messages and to block interaktion from keys to test game with key istead of playing with your body.


In this projects I've added a few AutoLoad-scripts that will be replaced by others AutoLoaders in the client with the same name. This includes the important GameLoader which handled both loading data, storing temporary data in. a temp_data dictionary and functions to add the session_data results including game-settings for things like level and so forth. 

Games such follow the following conventions. The name should be the proejct name which should be the scene of the game in the root folder, then the same name on the folder and all other resources in the game should use this name. E.g. starter.tcsn with a folder starter and then data can be saved to user://starter. this acts like a namespace, and the folder where all resources should be added. 

In the design-folder there are teames for Controls/UI. USe those, in particular the main_theam and the component_theame. 

To be able to test the game you need to add Export option for HTML5 and build *outside of the repo* so that build files are not accedentally added tot he git repo. The project contains a custom html-file for starting models which currently uses pose but we will replace that with the head tracking. 

Also, the game need to started with an instruction page, run with a game timer that takes 2 minuted before ending and that is here part of the file system in place. Game-time is forced by the game-loader and currently the timer is in the games but in the fugure the game-timer will be moved to the Client.  

