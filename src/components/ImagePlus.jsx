import React from 'react';
import {Canvas,Circle, Image, Path, Text} from 'react-fabricjs';


class ImagePlus extends Image {
	//constructor always gets called first.
	constructor(props){
		super(...arguments);

		this._hasFit = false;
		this._shouldUpdateIndex = false;

		//declare your state variables here.
		//this.state = props;

	}
	
	//declare your props here.

	static get defaultProps(){
		return {
			name: "",
			fitX: 0,
			fitY: 0,
			index:0,
			onScalingWithProps: function() {},
			onMovingWithProps: function() {},
			onRotatingWithProps: function() {},
			onDraw: function() {},
			isBackground: false
		};
	}

	componentDidUpdate(oldProps, oldState) {
		if (oldProps.src != this.props.src) {
			this._shouldUpdateIndex = true;
		}
	}

	updateIndex() {
		const {object} = this.state;
		if(this.props.index){
			if (object) {
				try {
					this.moveTo(this.props.index);
				} catch (e) {
					console.log("COULD NOT MOVE YET");
				}
			}
		}
	}


	initEvent() {
		super.initEvent();
		const {object} = this.state;
		object.on('selected', this.handleSelected.bind(this));
		object.on('modified', this.handleModified.bind(this));
		object.on('scaling', this.handleScaling.bind(this));
		object.on('moving', this.handleMoving.bind(this));
		object.on('rotating', this.handleRotating.bind(this));

		if (true || this._shouldUpdateIndex) {
			this.updateIndex();
			//this.sendToBack();
			//this._shouldUpdateIndex = false;
		}

		var oSize = false;
		try {
			oSize = this.getOriginalSize();
		} catch (e) {

		}
		//https://github.com/kangax/fabric.js/wiki/How-fabric-canvas-layering-works
		
		//https://stackoverflow.com/questions/26886879/how-to-maintain-the-aspect-ratio-while-scaling-the-image-on-html5-canvas////////////
		//https://stackoverflow.com/questions/19808510/preserve-the-aspect-ratio-of-image-in-fabric-js///////////////
		if (oSize) {
			if (this.props.fitY) {
				this.scaleToHeight(this.props.fitY);
				this.updateIndex();
			}

			if (this.props.fitX) {
				this.scaleToWidth(this.props.fitX);
				this.updateIndex();
			}
		}

		if (this.props.isBackground) {
			this.sendToBack();
		}
		this.props.onDraw(this.props.name, this.state.object, this.props.index);
	}

	handleSelected(e) {
		this.updateIndex();
	}

	handleModified(e) {
	}

	handleScaling(e) {
		this.props.onScalingWithProps(e, this.getScaleX(), this.getScaleY());
	}

	handleMoving(e){
		//this.updateIndex();
		this.props.onMovingWithProps(e, this.getLeft(), this.getTop());
	}

	handleRotating(e) {
		this.props.onRotatingWithProps(e, this.getAngle());
	}
}
export default ImagePlus;