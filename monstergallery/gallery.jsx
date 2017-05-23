import React from 'react';

class Gallery extends React.Component {
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
		return
			<div className="Gallery-App">

				<div className="App-header">
					
					<h1>Monster Maker Gallery</h1>
					<div className="Header-Nav">
						<ul>
							<li><a href="#" title="Home">Home</a></li>
							<li><a href="#"title="About">About</a></li>
							
						</ul>
					</div>


				</div>

	}
}
export default Gallery;