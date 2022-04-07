# Supercar 

This proejct is about stearing cars with your head and head tilt. Hopefully we will be able to use Head tracking for the data but at the present we have the nose-data in the project folder. 

Like all these projects they have a set of requirements.

Use thems in design. They are form the outer project, often called teh client, which is the "game" portal where this game will be together with other games. 
Game are there stareted by and outer game project so that this project will later be exported and started as a PCK which is the Godot format for game mods or extensions DLC packs. 

Proejct cannot depend on AutoLoad or ProjectSettings files for its operations since these will be set fomr the get go in the "client" 
In this projects I've added a few AutoLoad-scripts that will be replaced by others in the client with the same name. This includes the important GameLoader which handled boht loading data, storing temporary data and delivering session data to the outer client for storage in the backend. 

To be able to test the game you need to add Export option for HTML5 and build *outside of the repo* so that build files are not accedentally added tot he git repo. The project contains a custom html-file for starting models which currently uses pose but we will replace that with the head tracking. 

Alos, the game need to start with an instruction page, run with a game timer that takes 2 minuted before ending and that is here part of the file system in place. Adding to this works, but that is the startup and end process of the games. 

In the game SuperCar the intention is to do a 2D-top-dowbn car-racing game for game tracks where head is used to stear the cars. The plan is hopefully to also use HeadTracking and enable multiple players. They can the play together and tilt their head and move head up and down to control speed ... something like this. The multiplayer part is an experiment and the single-player exprience is the one to focus mostly on. 

Teh car racing should be about following a track and turning by tilting the head and doing squats to "break" the speed before going full throttel again. This is something to discuss because it will clearly affect teh game. 

For assets I think this is a very good starting point. https://www.kenney.nl/assets/racing-pack
