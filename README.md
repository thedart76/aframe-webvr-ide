# aframe-webvr-ide
A social WebVR experience using Simbol to introduce your friends to basic WebVR concepts and features.

[![](https://raw.githubusercontent.com/thedart76/aframe-webvr-ide/master/aframe-webvr-ide-v2.gif)](https://raw.githubusercontent.com/thedart76/aframe-webvr-ide/master/aframe-webvr-ide-v2.gif)

## Introduction
When I discovered the A-[Frame textarea component](https://github.com/brianpeiris/aframe-textarea-component "Frame textarea component") created by [Brian Peiris](https://github.com/brianpeiris "Brian Peiris") a few months ago, I thought: “It would be cool to use it as a starting point to create kind of WebVR IDE!”.

At the same time, that idea didn't sound so cool to me, because the current VR text entry methods do not offer an enjoyable experience yet.

So better avoid long sessions of typing and inputting text in VR.

Then, a couple of weeks ago, I was contacted by [Alberto Elias](https://github.com/AlbertoElias "Alberto Elias") via Twitter, and he introduced me to his project, [Simbol](https://github.com/wearesimbol "Simbol"), which allows you to build social WebVR experiences in seconds.

That same idea came back to my mind again, but this time it made more sense because I was thinking of it under a different vest: "What about creating a WebVR IDE that one user can use inside an A-Frame scene to quickly show other users how to create WebVR content such as basic primitives, animations, and interactions?".

This is the question I asked Alberto during our online chat on Appear, and this is how our collaboration started that day.

The goal of our WebVR IDE project is to build a social VR experience that is kind of a “The Matrix Stockroom", that is an empty virtual environment where you can use an IDE to type small chunks of code and create objects inside an A-Frame scene... while being there!

[![](https://raw.githubusercontent.com/thedart76/aframe-webvr-ide/master/webvr-ide.gif)](https://raw.githubusercontent.com/thedart76/aframe-webvr-ide/master/webvr-ide.gif)

Moreover, it doesn't even matter if typing and inputting text in VR is not the most enjoyable experience yet, because A-Frame, that is a WebVR framework for THREE.js, also allows you to work on your scenes in Desktop mode, so you don’t necessarily need to wear a headset and enter VR mode.

To us, it sounds like a cool way for early adopters or even more experienced users to introduce their friends to basic WebVR concepts and features.

Let's see what the future brings!

------------

🖥 [TRY THE DEMO](https://thedart76.github.io/aframe-webvr-ide/ "TRY THE DEMO")

------------

⚠ Please bear in mind that the code for this project is still currently WIP.

------------

## Usage

### Browser Installation

	<head>
	    <title>A-Frame VR IDE</title>
	    <script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
	    <!-- Install Simbol for multi-user WebVR experiences -->
	    <script src="https://cdn.rawgit.com/wearesimbol/a-simbol/master/build/a-simbol.js"></script>
	    <script src="https://raw.githack.com/thedart76/aframe-webvr-ide/master/js/aframe-webvr-ide-v2.0.js"></script>
	</head>
	
------------

👀 **[VIEW THE DEMO SOURCE CODE](https://github.com/thedart76/aframe-webvr-ide/blob/master/index.html "VIEW THE DEMO SOURCE CODE")**

👀 **[VIEW THE COMPONENT SOURCE CODE](https://github.com/thedart76/aframe-webvr-ide/blob/master/js/aframe-webvr-ide-v1-3-05.js "VIEW THE COMPONENT SOURCE CODE")**

------------

## Previous Versions

### v1.0

[![](https://raw.githubusercontent.com/thedart76/aframe-webvr-ide/master/aframe-webvr-ide-demo.gif)](https://raw.githubusercontent.com/thedart76/aframe-webvr-ide/master/aframe-webvr-ide-demo.gif)
