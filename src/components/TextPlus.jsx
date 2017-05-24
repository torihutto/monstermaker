import React from 'react';
import {Text} from 'react-fabricjs';


class TextPlus extends Text {
	
	constructor(props){
		super(...arguments);
		
	}


	static get defaultProps(){
		return {
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
		this.bringToFront();
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
export default TextPlus;