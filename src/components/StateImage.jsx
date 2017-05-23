import React from 'react';
import {Canvas,Circle, Image, Path, Text} from 'react-fabricjs';


class StateImage extends Image {
	//constructor always gets called first.
	constructor(props){
		super(...arguments);

		this._hasFit = false;

		//declare your state variables here.
		//this.state = props;

	}
	
	//declare your props here.

	static get defaultProps(){
		return {
			fitX: 0,
			fitY: 0,
			index:0,
			onScalingWithProps: function() {},
			onMovingWithProps: function() {},
			onRotatingWithProps: function() {}
		};
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
		object.on('scaling', this.handleScaling.bind(this));
		object.on('moving', this.handleMoving.bind(this));
		object.on('rotating', this.handleRotating.bind(this));

		this.updateIndex();

		var oSize = false;
		try {
			oSize = this.getOriginalSize();
		} catch (e) {

		}
		//https://stackoverflow.com/questions/26886879/how-to-maintain-the-aspect-ratio-while-scaling-the-image-on-html5-canvas////////////
		//https://stackoverflow.com/questions/19808510/preserve-the-aspect-ratio-of-image-in-fabric-js///////////////
		if (oSize) {
			if (this.props.fitY) {
				/*var r = oSize.width / oSize.height,
					newWidth = r * this.props.fitY,
					scaleX = newWidth / oSize.width,
					scaleY = this.props.fitY / oSize.height;
				this.setScaleX(scaleX);
				this.setScaleY(scaleY);
				*/
				this.scaleToHeight(this.props.fitY);
				this.updateIndex();
			}

			if (this.props.fitX) {
				this.scaleToWidth(this.props.fitX);
			}
		}
	}

	handleScaling(e) {
		this.props.onScalingWithProps(e, this.getScaleX(), this.getScaleY());
	}

	handleMoving(e){
		this.props.onMovingWithProps(e, this.getLeft(), this.getTop());
	}

	handleRotating(e) {
		this.props.onRotatingWithProps(e, this.getAngle());
	}
}
export default StateImage;