import React from 'react';
import fetch from 'node-fetch';


var giphyAPIKEY = "dc6zaTOxFJmzC";
var giphyAPIURL = "http://api.giphy.com/v1/gifs/random";

var googleAPIKEY = "AIzaSyA8kR3wW_GsbyQHhIdcyapDoXa3XfvWMl8";
var googleAPIURL = "https://ajax.googleapis.com/ajax/services/search/images";
var googleSearchEngine ='000955517151817132321:fmq8rm5nvas';
var pexelAppID='19c5887bb6afd1fc6c5d174784bdd84129f7acd46c2e38b0c9539712c76445c9';
var pexelAppSecret='72de81fdb15706dbb3c49435f1fb6fdc2e8f207bd536984d5348da9bd3f7efed';
var pexelAPIURL="https://api.unsplash.com/search/photos";

var pixabayAPI='5063407-5ce0a3e3ab41071b96503e1e7';
var pixabayURL='https://pixabay.com/api/';


class BackgroundSearch extends React.Component {
	
	constructor(){
		super(...arguments);

		//state variables here//
		this.state={
			search:"",
			images:[],
			active:false,
			searchengine:""
		};

		this.handleSearchChange=this.handleSearchChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
		this.handleConfirmButtonClick=this.handleConfirmButtonClick.bind(this);
		this.handleSearchEngineChange=this.handleSearchEngineChange.bind(this);


	}
	
	//declare props here//////

	static get defaultProps(){
		return {
			onImageClick: function(){},
			currentBackgroundURL:""

		};

	}
	handleSearchChange(e){
		this.setState({search:e.target.value});

	}
	handleSearchEngineChange(e){
		console.log(["engine changed", this.state.value]);
		this.setState({searchengine:e.target.value});
	}

	handleSubmit(e){
		e.preventDefault();//prevents submitting when hitting Enter/Return button(so it doesn't refresh every time you search)

		console.log(["button clicked", this.state.search]);
		if(this.state.searchengine === "pexel"){
			this.getPexelImageSearch(this.state.search);
		}else if(this.state.searchengine === "pixabay"){
			this.getPixabayImages(this.state.search);
		}else if(this.state.searchengine === "google_image"){
			this.getGoogleImageSearch(this.state.search);
		}else if(this.state.searchengine === "giphy"){
			this.getGiphy(this.state.search);
		}
		//this.getPexelImageSearch(this.state.search);
		//this.getGoogleImageSearch(this.state.search);
		
		this.getPixabayImages(this.state.search);
		this.setState({
			active: true
		});

	}
	handleImageClick(url, e){
		this.props.onImageClick(url);

	}
	handleConfirmButtonClick(){
		this.setState({
			active:false,
			search:"",
			images:[]

		})
	}

	//BACKGROUND IMAGE SEARCH QUERIES////////////

	getGoogleImageSearch(q){

		var url = googleAPIURL;
		url += "?key=" + googleAPIKEY;
		url += "&cx=" + googleSearchEngine;
		url += "&q=" + encodeURI(q);
		//url += "&imgType=photo";//
		url += "&searchType=image";
		/*url += "&imgSize=xlarge";*/
		url += "&imgsz=icon"; 
		console.log(url);
		fetch(url, {compress: false})
			.then((response)=>{
				return response.json();
			})
			.then((json)=>{
				console.log(json);
				var imageList = [];
				for(var i=0; i < json.items.length; i++){
					imageList.push({
						regular: json.items[i].link, 
						thumb: json.items[i].link

						});
				}
				this.setState({
					images:imageList
				})
			})
			.catch((err) => {
				console.error(err);
			});
			
	}
	getPexelImageSearch(query){
		var url= pexelAPIURL;

		url += "?page=1";
		url += "&query=" + encodeURI(query);
		url += "&client_id=" + pexelAppID;
		fetch(url)
			.then((response)=>{
				return response.json();


			})
			.then((json)=>{
				console.log(json);
				var imageList =[];
				for(var i=0; i < json.results.length; i++){
					imageList.push({
						regular: json.results[i].urls.regular, 
						thumb: json.results[i].urls.thumb
					});

				}
				this.setState({
					images:imageList
				})
			})
			.catch((err)=>{
				console.error(err);
			});

	}

	getPixabayImages(q){
		var url= pixabayURL;
		url += "?key=" + pixabayAPI;
		url += "&q=" + encodeURI(q);
		url += "&image_type=photo,illustration";

		fetch(url)
			.then((response) => {
				return response.json();
			})
			.then((json)=>{
				console.log(json);
				var imageList =[];
				for(var i=0; i < json.hits.length; i++){
					imageList.push({
						regular: json.hits[i].webformatURL, 
						thumb: json.hits[i].previewURL
					});

				}
				this.setState({
					images:imageList
				})
			})
			.catch((err)=>{
				console.error(err);
			});
	}

	getGiphy(searchterm){
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
  }

	render(){
		var resultOutput =[];
		for(var i=0; i < this.state.images.length; i++){
			var resultClass = "BackgroundSearch-result";
			if(this.props.currentBackgroundURL === this.state.images[i].regular){
				resultClass += " BackgroundSearch-result-active";
			}
			
			resultOutput.push(<div 
				className={resultClass}
				onClick={this.handleImageClick.bind(this, this.state.images[i].regular)} 
				key={i}>

					<img 
						src={this.state.images[i].thumb}
					/>
				</div>);
		}
		
		var backgroundClass = "BackgroundSearch";
		if (this.state.active){
			backgroundClass += " BackgroundSearch-active"
		}

		return <form className={backgroundClass} onSubmit={this.handleSubmit}>
			<p className= "select-bkgrd-title">Search For a Background! </p>
		

			<div className="BackgroundSearch-input">
				<input type="text" placeholder="Search here..." onChange={this.handleSearchChange}/>
				<select onChange={this.handleSearchEngineChange}
				value="">
  					<option value="pexel">Pexel</option>
			    	<option value="pixabay">Pixabay</option>
			    	<option value="google_image">Google Images</option>
			    	<option value="giphy">Giphy</option>
			   </select>
			

				<button type="submit">
				Search

       
				</button>
			</div>

			<div className="BackgroundSearch-results">
			{resultOutput}
			</div>
			<button className="Confirm-btn" type="button" onClick={this.handleConfirmButtonClick}>Confirm Background Image</button>

		</form>

	}
}
export default BackgroundSearch;