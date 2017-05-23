import React from 'react';

class Template extends React.Component {
	//constructor always gets called first.
	constructor(){
		super(...arguments);
		//declare your state variables here.
		this.state={};

	}
	
	//declare your props here.

	static get defaultProps(){
		return {};
	}
	render(){
		return <div></div>

	}
}
export default Template;