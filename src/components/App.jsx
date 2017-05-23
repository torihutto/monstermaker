import React, { Component } from 'react';
import MonsterSelect from './MonsterSelect.jsx';
import '../css/index.css';
import fetch from 'node-fetch';
import television from '../img/Television.png';
import head from '../img/monsters/pink_demon/head.png';
import {Canvas, StaticCanvas,Circle, Rect, Image, Path, Text} from 'react-fabricjs';
import StateImage from './StateImage.jsx';
import BackgroundSearch from './BackgroundSearch.jsx';
import saveAs from 'save-as';





 
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

	
		this.state={
			personHead:"",
			personTorso:"",
			personArmRight:"",
			personArmLeft:"",
			personLegRight:"",
			personLegLeft:"", 
			backgroundURL:"",
			textblock:""
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
		
	}
	componentDidMount(){

		/*this.getGiphy("monster");*/
	}

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

		//fabric.js starts here//
	}

	renderCanvas(){

		var images=[];
		var bodyparts={
			torso:{
				index: 5,
				left:0,
				top:0,
				monsterIndex: this.state.personTorso
			},

			head:{
				index: 10,
				left:0,
				top:0,
				monsterIndex: this.state.personHead
			},
			arm_right:{
				index: 6,
				left:0,
				top:0,
				monsterIndex: this.state.personArmRight

			},
			arm_left:{
				index: 6,
				left:0,
				top:0,
				monsterIndex: this.state.personArmLeft
			},
			leg_right:{
				index: 4,
				left:0,
				top:0,
				monsterIndex: this.state.personLegRight
			},
			leg_left:{
				index: 4,
				left:0,
				top:0,
				monsterIndex: this.state.personLegLeft
			}
		};
		//checking props to see if they have already been set. if so,  replace the value with the stored value.

		for(var bodypart in bodyparts){
			var {monsterIndex, ...props}=bodyparts[bodypart];
			for (var i in bodypartProps[bodypart]) {
				props[i] = bodypartProps[bodypart][i];
			}
			images.push(<StateImage
				key={bodypart}
				index={2}
				scaleX={.25}
				scaleY={.25}
				onMovingWithProps={this.handleImageMove.bind(this, bodypart)}
				onScalingWithProps={this.handleImageScale.bind(this, bodypart)}
				onRotatingWithProps={this.handleImageRotate.bind(this, bodypart)}
				src={getImageFromIndex(monsterIndex, bodypart)}
				{...props}
			/>);
		}

		var canvasWidth = 800,
			canvasHeight = 1000;
			
		return (

			<div> 

				<Canvas 
					ref="canvas"
					width={canvasWidth}
					height={canvasHeight}
					fill="blue"
					preserveObjectStacking={true}
					

					>
				

					{images}


					<Text
						index={10}
						text={this.state.textblock}
						left={300}
						top={300}
						shadow="rgba(0,0,0,0.3) 5px 5px 5px"
						stroke="#00ff00"
						strokeWidth={3}
						fontStyle="italic"
						fontFamily="Futura"
					/>
					<StateImage 
						index={1}
						src={this.state.backgroundURL}
                		fitY={canvasHeight}
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
					
					<h1>Monster Maker</h1>
					<div className="Header-Nav">
		
						<div className="App-intro">
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
						
					</div>
					<div className="selectBox-container">
						


						<MonsterSelect label="Head" name="head" value={this.state.personHead} onChange={this.handleHeadChange}
							monsterOptions={monsters} />

						<MonsterSelect label="Torso" name="torso" value={this.state.personTorso} onChange={this.handleTorsoChange} monsterOptions={monsters} />
					
						<MonsterSelect label="Right Arm" name="right-arm" value={this.state.personArmRight} onChange={this.handleRightArmChange} monsterOptions={monsters}/>

						<MonsterSelect label="Left Arm" name="left-arm" value={this.state.personArmLeft} onChange={this.handleLeftArmChange} monsterOptions={monsters} />

						<MonsterSelect label="Right Leg" name="right-leg" value={this.state.personLegRight} onChange={this.handleRightLegChange} monsterOptions={monsters} />

						<MonsterSelect label="Left Leg" name="left-leg" value={this.state.personLegLeft} onChange={this.handleLeftLegChange} monsterOptions={monsters} />
						

						<BackgroundSearch 
							onImageClick={this.handleImageClick} 
							currentBackgroundURL={this.state.backgroundURL} />
						<p className="textInput-container">Add Some Text!	
						<input type="text" placeholder="Type Here..." value={this.state.textblock} onChange={this.handleTextBlockChange}/>
						</p>
						{/*<BackgroundGiphySearch*/}

	
					</div>

				
					
						
				
			
				</div>

		</div>
		);

	}
}

export default App;
