# aframe-webvr-ide
A social WebVR experience using Simbol to introduce your friends to basic WebVR concepts and features.

[![](https://raw.githubusercontent.com/thedart76/aframe-webvr-ide/master/webvr-ide.png)](https://raw.githubusercontent.com/thedart76/aframe-webvr-ide/master/webvr-ide.png)

## Introduction

### Info

❓ MVP created to promote [Simbol](https://github.com/wearesimbol "Simbol"), a social API for VR on the Web. This WebVR experience was designed and coded to introduce people to basic WebVR concepts and features.

The design concept behind this project was to build kind of a The Matrix Stockroom, where the users joining the session can enter VR mode, talk to each other, and see both the code being typed on the WebVR IDE by a more experienced user and the objects being spawned in the A-Frame scene.

[![](https://raw.githubusercontent.com/thedart76/aframe-webvr-ide/master/webvr-ide.gif)](https://raw.githubusercontent.com/thedart76/aframe-webvr-ide/master/webvr-ide.gif)

------------

### How Did It All Start?

When back in 2017 I discovered the A-[Frame textarea component](https://github.com/brianpeiris/aframe-textarea-component "Frame textarea component") created by [Brian Peiris](https://github.com/brianpeiris "Brian Peiris"), I thought: “I would be cool to use it as a starting point to create kind of WebVR IDE!”.

At the same time, that idea didn't sound exciting to me, because none of the current VR text entry methods can offer an enjoyable experience yet. So better avoid long sessions of typing and inputting text in VR.

Then, in October 2018, I was contacted by [Alberto Elias](https://github.com/AlbertoElias "Alberto Elias") via Twitter, and he introduced me to his project called Simbol, which allows you to build social WebVR experiences in seconds.

So that same idea came back to my mind again, but this time it made much more sense because I was thinking of it under a different vest: "What about creating a WebVR IDE to introduce OTHER people to basic WebVR concepts and features while being inside an A-Frame scene?"

The hassle of typing and inputting text in VR wouldn't matter anymore, indeed, because A-Frame also works in Desktop mode; therefore you don’t necessarily need to wear a headset and enter VR mode and, most importantly, you can type the code in the WebVR IDE using a physical keyboard.

This is what I said to Alberto during our first online chat on Appear, and this is how our collaboration started that day.

------------

### Updates

Version 0.1.3 includes a big secondary display in the scene and personal displays for each user joining the session.

------------

🖥 [TRY THE DEMO](https://thedart76.github.io/aframe-webvr-ide/ "TRY THE DEMO")

📺 [**WATCH THE VIDEO**](https://thewebvrlab.io/index.php/projects/30-webvr-ide "WATCH THE VIDEO")

------------

## Usage

### Browser Installation

	<head>
	    <title>A-Frame VR IDE</title>
	    <script src="https://aframe.io/releases/0.9.0/aframe.min.js"></script>
	    <!-- Install Simbol for multi-user WebVR experiences -->
	    <script src="https://cdn.rawgit.com/wearesimbol/a-simbol/master/build/a-simbol.js"></script>
	    <script src="https://raw.githack.com/thedart76/aframe-webvr-ide/master/js/aframe-webvr-ide-v1-3-07.js"></script>
	</head>
	
------------

👀 **[VIEW THE DEMO SOURCE CODE](https://github.com/thedart76/aframe-webvr-ide/blob/master/index.html "VIEW THE DEMO SOURCE CODE")**

👀 **[VIEW THE COMPONENT SOURCE CODE](https://github.com/thedart76/aframe-webvr-ide/blob/master/js/aframe-webvr-ide-v1-3-07.js "VIEW THE COMPONENT SOURCE CODE")**

------------

## License

Distributed under an [MIT License](https://github.com/thedart76/aframe-webvr-ide/blob/master/LICENSE "MIT License").

Designed an coded by [Danilo Pasquariello](https://twitter.com/theDart76 "Danilo Pasquariello"). Networking code by [Alberto Elias](https://twitter.com/aeliasnet "Alberto Elias").
