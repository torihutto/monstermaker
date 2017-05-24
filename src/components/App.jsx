import React, { Component } from 'react';
import MonsterSelect from './MonsterSelect.jsx';
import '../css/index.css';
import fetch from 'node-fetch';

import head from '../img/monsters/pink_demon/head.png';
import {Canvas, StaticCanvas,Circle, Rect, Image, Path, Text} from 'react-fabricjs';
import ImagePlus from './ImagePlus.jsx';
import TextPlus from "./TextPlus.jsx";
import BackgroundSearch from './BackgroundSearch.jsx';
import saveAs from 'save-as';




var headHeight=800;
var headWidth=800;
var torsoHeight=800;
var torsoWidth=800;
var armWidth=400;
var armHeight=800;
var legWidth=400;
var legHeight=800;
var headBottomToJaw = headHeight * .25; // Also the Neck pivot
var torsoSideToShoulder = torsoWidth * .25;
var torsoTopToShouler = torsoHeight * .25;
var torsoBottomToHip = torsoHeight * .25;
var torsoSideToHip = torsoWidth * .25;
var legTopToHip = legHeight * .10;    // Also the Leg pivot
var armTopToShoulder = armHeight * .10; // Also the Shoulder pivot
 
var bodyparts = ["head", "torso", "arm_right", "arm_left", "leg_right", "leg_left"];

var bodypartImages = {};

var bodypartProps = {};

var monsters = [
	{
		title:"Pink Demon",
		index:"pink_demon"
	},

	{
		title:"Five Nights at Freddy's",
		index:"freddy" 
	},

	{
		title:"Creature",
		index:"swamp"

	},
	{
		title:"Purple Hairy Monster",
		index:"purple_hairy"
	},

	{
		title:"Fuzzy Pink Monster",
		index:"fuzzy_pink"
	},

	{
		title:"Skeleton", 
		index:"skeleton"
	},

	{
		title:"Bunny Monster",
		index:"bunbun"
	},

	{
		title:"Red Devil",
		index:"red_guy"
	},

	{
		title:"Spider Lady",
		index:"spider_woman"
	},

	{
		title:"Three-Eyed Cat",
		index:"threeeyedcat"
	},
	{
		title:"Witch",
		index:"witch"
	}	
];




//preloads all of the monster body part images
/*
{
	"pink_demon": {
		"head": "../img/monsters/pink_demon/head.png",
		...
	},
	...
}
*/
for(var i=0; i < monsters.length; i++){
	var index = monsters[i].index;
	bodypartImages[index]={};
	for(var j=0; j < bodyparts.length; j++){
		var bodypart = bodyparts[j];
		bodypartImages[index][bodypart]= require("../img/monsters/" + index + "/" + bodypart + ".png");
	}
}

//changes the monster index into a className recognized by CSS
function getClassFromIndex(index){
	return "m-" + index;
}

function getImageFromIndex(index, bodypart){
	if(bodypartImages[index] && bodypartImages[index][bodypart]){
		 return bodypartImages[index][bodypart];
	}else{
		return null;
	}


}


var giphyAPIKEY = "dc6zaTOxFJmzC";
var giphyAPIURL = "http://api.giphy.com/v1/gifs/random";




class App extends Component {
	constructor(){
		super(...arguments);

		var defaultMonster= "pink_demon";
		this.state={
			personHead:defaultMonster,
			personTorso:defaultMonster,
			personArmRight:defaultMonster,
			personArmLeft:defaultMonster,
			personLegRight:defaultMonster,
			personLegLeft:defaultMonster, 
			backgroundURL:"",
			textblock:"",
			canvasWidth: 800,
			canvasHeight: 600,
			bodyscale: .25
		};

		this.handleHeadChange = this.handleHeadChange.bind(this);
		this.handleTorsoChange = this.handleTorsoChange.bind(this);
		this.handleRightArmChange = this.handleRightArmChange.bind(this);
		this.handleLeftArmChange = this.handleLeftArmChange.bind(this);
		this.handleRightLegChange = this.handleRightLegChange.bind(this);
		this.handleLeftLegChange = this.handleLeftLegChange.bind(this);
		this.handleButtonChange = this.handleButtonChange.bind(this);
		this.handleImageClick = this.handleImageClick.bind(this);
		this.handleTextBlockChange = this.handleTextBlockChange.bind(this);
		this.handleButtonCLick = this.handleButtonCLick.bind(this);
	}
	componentDidMount(){
		//this.setCanvasDimensions();

		/*this.getGiphy("monster");*/
	}
	
	 //{setCanvasDimensions() {
		// Find Broswer Dimensions
		//var browserWidth = window.innerWidth
		//|| document.documentElement.clientWidth
		//|| document.body.clientWidth;
//var browserHeight = window.innerHeight
		//|| document.documentElement.clientHeight
		//|| document.body.clientHeight;


		//console.log(["RESIZED", browserWidth, browserHeight]);

		// Mobile
		//var canvasWidth = 400;
		//var canvasHeight = 400;
		//var bodyscale=.2;

		// Small Desktop
		//if (browserWidth > 800) {
			//canvasWidth = 800;
			//canvasHeight = 800;
			//bodyscale = .25;
		//}
		//this.setState({
			//canvasHeight: canvasHeight,
			//canvasWidth: canvasWidth,
			//bodyscale: bodyscale
		//});

	//}

	getBodyPartState(bodypart, propName){
		if(bodypartProps[bodypart]&& bodypartProps[bodypart][propName]){
			return bodypartProps[bodypart][propName];
		}else {
			return false;
		}
		
	}

	setBodyPartState(bodypart, propName, value){
		if(!bodypartProps[bodypart]){
			bodypartProps[bodypart]={};
		}
		bodypartProps[bodypart][propName] = value;
		
	}


	handleHeadChange(e) {
		console.log("head changed " + e.target.value);
		this.setState({
			personHead:e.target.value

		});

	}
	handleTorsoChange(e) {
		console.log("torso changed " + e.target.value);
		this.setState({
			personTorso:e.target.value
		});
	}
	handleRightArmChange(e) {
		console.log("right arm changed " + e.target.value);
		this.setState({
			personArmRight:e.target.value
		});
	}
	handleLeftArmChange(e) {
		console.log("left arm changed " + e.target.value);
		this.setState({
			personArmLeft:e.target.value
		});
	}
	handleRightLegChange(e) {
		console.log("right leg changed " + e.target.value);
		this.setState({
			personLegRight:e.target.value
		});
	}

	handleLeftLegChange(e) {
		console.log("left leg changed " + e.target.value);
		this.setState({
			personLegLeft:e.target.value
		});
	}
	handleButtonChange(e) {
		this.getGiphy("spooky");
	}

	handleImageClick(url) {
		this.setState({
			backgroundURL: url
		})
	}

	handleImageMove(bodypart, mouseEvent, left, top) {
		if(mouseEvent){
			this.setBodyPartState(bodypart, "left", left);
			this.setBodyPartState(bodypart, "top", top);
		}
	}

	handleImageScale(bodypart, mouseEvent, scaleX, scaleY){
		if(mouseEvent){
			this.setBodyPartState(bodypart, "scaleX", scaleX);
			this.setBodyPartState(bodypart, "scaleY", scaleY);
		}
	}
	handleImageRotate(bodypart, mouseEvent, angle){
		if(mouseEvent){
			this.setBodyPartState(bodypart, "angle", angle);
		}
	}
	handleTextBlockChange(e){
		this.setState({
			textblock:e.target.value
		});
	}

	handleButtonCLick(e){
		var canvas = document.getElementById("c");
		//var img= canvas.toDataURL("image/png");
		//document.write('<img src="'+img+'"/>');

		var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); //Convert image to 'octet-stream' (Just a download, really)
		window.location.href = image;

   

	}

	/*handleBackgroundChange(e) {
		this.getBackground(q);
	}*/
	
/*http://api.giphy.com/v1/stickers/search?q=cat&api_key=dc6zaTOxFJmzC */
	/*getGiphy(searchterm){
	 var url = giphyAPIURL;
	 url += "?tag=" + encodeURI(searchterm);
	 url += "&api_key=" + giphyAPIKEY;
	 fetch(url)
		.then(function (response){
		return response.json();
	  })
	  .then((json)=>{
		console.log(json.data);
		this.setState({backgroundURL:json.data.image_url});
	  })
  }*/
  	//Google Image Search (not that reliable)
	/*getBackground(searchterm){

		var url = googleAPIURL;
		url += "?key=" + googleAPIKEY;
		url += "&cx=" + googleSearchEngine;
		url += "&q=" + encodeURI(q);
		//url += "&imgType=photo";//
		url += "&searchType=image";
		url += "&imgSize=xlarge";
		url += "&lowRange=20"; 
		
		fetch(url, {compress: false})
			.then((response)=>{
				return response.json();
			})
			.then((json)=>{
				var itemLength = json.items.length;
				var key = Math.floor(Math.random() * itemLength);
				console.log(json.items[key].link);
				this.setState({
					backgroundURL:json.items[key].link
				});
			})
			.catch((err) => {
				console.error(err);
			});

	}*/
	renderStage(){
		<div className="monster-stage"
			style={{backgroundImage:"url("+this.state.backgroundURL+")"}}> 
			 
			<div className="monster-container">

		
				<div className="person">
					<div className={"person-head " + getClassFromIndex(this.state.personHead)}>

					</div>
					<div className="person-body">
						<div className={"person-arm-left " + getClassFromIndex(this.state.personArmLeft)}>
						</div>
						<div className={"person-arm-right " + getClassFromIndex(this.state.personArmRight)}>
						</div>
						<div className={"person-torso " + getClassFromIndex(this.state.personTorso)}>
						</div>
						<div className="person-legs">
							<div className={"person-leg-left " + getClassFromIndex(this.state.personLegLeft)}>
							</div>
							<div className={"person-leg-right " + getClassFromIndex(this.state.personLegRight)}>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		//Fabric.js starts here//
	}

	renderCanvas(){

		var torsoTop = (headHeight - headBottomToJaw),
			armTop = torsoTop - armTopToShoulder + torsoTopToShouler,
			armSide = (-torsoWidth / 2 + torsoSideToShoulder),
			legTop = (torsoTop + torsoHeight - legTopToHip - torsoBottomToHip),
			images=[];

		var bodyparts=[

			{
				partName: "torso",	
				index: 9,
				left: this.state.canvasWidth / 2,
				top: torsoTop * this.state.bodyscale,
				originX: "center",
				monsterIndex: this.state.personTorso
			},
			{
				partName: "head",	
				index: 12,
				left:this.state.canvasWidth / 2,
				top:0,
				originX:"center",
				originY:"top",
				monsterIndex: this.state.personHead
			},


			
			{
				partName: "arm_right",	
				index: 11,
				left:this.state.canvasWidth / 2 - armSide * this.state.bodyscale,
				top:armTop * this.state.bodyscale,
				originX: "center",
				monsterIndex: this.state.personArmRight

			},
			{
				partName: "arm_left",	
				index: 10,
				left:this.state.canvasWidth / 2 + armSide * this.state.bodyscale,
				top:armTop * this.state.bodyscale,
				originX: "center",
				monsterIndex: this.state.personArmLeft
			},
			{
				partName: "leg_right",	
				index: 8,
				left:this.state.canvasWidth / 2 + (legWidth / 4) * this.state.bodyscale,
				top:legTop * this.state.bodyscale,
				originX: "center",
				monsterIndex: this.state.personLegRight
			},
			{
				partName: "leg_left",	
				index: 7,
				left:this.state.canvasWidth / 2 - (legWidth / 4) * this.state.bodyscale,
				top:legTop * this.state.bodyscale,
				originX: "center",
				monsterIndex: this.state.personLegLeft
			},
		];
		//checking props to see if they have already been set. if so,  replace the value with the stored value.

		for(var j in bodyparts){
			var {monsterIndex, partName, ...props}=bodyparts[j];
			for (var i in bodypartProps[partName]) {
				props[i] = bodypartProps[partName][i];
			}
			images.push(<ImagePlus
				name={partName}
				key={partName}
				scaleX={this.state.bodyscale}
				scaleY={this.state.bodyscale}
				onMovingWithProps={this.handleImageMove.bind(this, partName)}
				onScalingWithProps={this.handleImageScale.bind(this, partName)}
				onRotatingWithProps={this.handleImageRotate.bind(this, partName)}
				src={getImageFromIndex(monsterIndex, partName)}
				{...props}
			/>);
		}

		
		console.log(["CREATING CANVAS", this.state.canvasWidth, this.state.canvasHeight]);
		return (

			<div> 

				<Canvas 
					ref="canvas"
					width={this.state.canvasWidth}
					height={this.state.canvasHeight}
					fill="blue"
					preserveObjectStacking={true}
					

					>
				

					{images}


					<TextPlus
						index={15}
						text={this.state.textblock}
						top={this.state.canvasHeight - 80}
						left={this.state.canvasWidth / 2}
						originX="center"
						shadow="rgba(0,0,0,0.3) 5px 5px 5px"
						stroke="#00ff00"
						strokeWidth={3}
						fontStyle="italic"
						fontFamily="Futura"
						textAlign="center"
					/>
					<ImagePlus 
						index={1}
						src={this.state.backgroundURL}
                		fitY={this.state.canvasHeight}
                		isBackground={true}
					/>
				
				</Canvas>
			</div>


					)
	}

	render() {
		var stageContent=this.renderCanvas();
		return (

			<div className="App">

				<div className="App-header">
					<div className="Header-title">
						<h1>Monster Maker</h1>

					</div>
					<div className="Header-Nav">
		
						<div className="App-intro">
						<Image src = "../img/frankenstein_icon.png"/>
							Select Your Monster Parts

						</div>
						<i className="fa fa-arrow-down selectBox-arrow" aria-hidden="true"></i>
					</div>



				</div>

				<div className="main-row">
					<div>
						<div className="canvas-container">
							{stageContent}
							
						</div>
						<BackgroundSearch 
							onImageClick={this.handleImageClick} 
							currentBackgroundURL={this.state.backgroundURL} />
						<p className="textInput-container">Add Some Text!	
						<input type="text" placeholder="Type Here..." value={this.state.textblock} onChange={this.handleTextBlockChange}/>
						</p>
						<div className="Save-button">
						<button type="type" onClick={this.handleButtonCLick}>

						Save Your Creation
						</button>
						</div>	

					</div>
					<div className="selectBox-container">
						


						<MonsterSelect label="Head" name="head" value={this.state.personHead} onChange={this.handleHeadChange}
							monsterOptions={monsters} />

						<MonsterSelect label="Torso" name="torso" value={this.state.personTorso} onChange={this.handleTorsoChange} monsterOptions={monsters} />
					
						<MonsterSelect label="Right Arm" name="right-arm" value={this.state.personArmRight} onChange={this.handleRightArmChange} monsterOptions={monsters}/>

						<MonsterSelect label="Left Arm" name="left-arm" value={this.state.personArmLeft} onChange={this.handleLeftArmChange} monsterOptions={monsters} />

						<MonsterSelect label="Right Leg" name="right-leg" value={this.state.personLegRight} onChange={this.handleRightLegChange} monsterOptions={monsters} />

						<MonsterSelect label="Left Leg" name="left-leg" value={this.state.personLegLeft} onChange={this.handleLeftLegChange} monsterOptions={monsters} />
						

						
						{/*<BackgroundGiphySearch*/}

						
					</div>

						
					
						
				
			
				</div>
				<footer>
					<div className="footer-info">
						<ul>
							<li>Image results provided by Pixabay, Pexel, Giphy, and Google.</li>
							<li>Icons by FontAwesome and FlatIcon.com.
							</li>
							<li>Copyright @2017 Tori Hutto.
							</li>
						</ul>

					</div>
				</footer>
		</div>
		);

	}
}

export default App;
