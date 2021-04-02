import React, { Component } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";

import Homepage from '../pages/homepage.js';
import Artworks from '../pages/artworks.js';
import Artwork from '../pages/artwork.js';
import Artists from '../pages/artists.js';
import Artist from '../pages/artist.js';
import About from '../pages/about.js';
import News from '../pages/news.js';
import Article from '../pages/article.js';

class Content extends Component {
	constructor(props) {
		super(props);
	}


	componentDidMount(){
	    var pathName = this.transformPathName(this.props.location.pathname);

		document.body.classList.add("body--"+pathName);
		setTimeout(function(){
			document.body.classList.add("initialized-1");
		}, 1000);
		setTimeout(function(){
			document.body.classList.add("initialized-2");
		}, 2000);
		setTimeout(function(){
			document.body.classList.add("initialized-3");
		}, 3000);
		setTimeout(function(){
			document.body.classList.add("allowed-scroll");
		}, 3600);
	}

	componentDidUpdate(prevProps) {
		// debugger;
		var pathName = this.transformPathName(this.props.location.pathname);
		var prevPathName = this.transformPathName(prevProps.location.pathname);


		document.body.removeAttribute('data-body-color');
		document.body.classList.remove("body--"+prevPathName);
		// document.body.classList.remove("body--"+prevProps.location.pathname);
		document.body.classList.add("body--"+pathName);

	    
	    document.body.classList.remove("nav-open");
	    window.scrollTo(0, 0);
	 

	}

	transformPathName(pathName) {

		var pathNameArray = pathName.split('/');
		var newPathName = pathNameArray[1];

		if(pathNameArray.length > 2) {
			newPathName += '-details';
		}

		if(newPathName === '') {
			newPathName = 'homepage';
		}
		return newPathName
	}

	render() {
	  	const { location } = this.props;

	    return (
	    	<div className="content">
			<Switch location={location}>
					<Route exact path="/" component={Homepage} />
					<Route exact path="/artworks" component={Artworks} />
					<Route path="/artworks/:slug" component={Artwork} />
					<Route exact path="/artists" component={Artists} />
					<Route path="/artists/:slug" component={Artist} />
					<Route exact path="/about" component={About} />
					<Route exact path="/news" component={News} />
					<Route path="/news/:slug" component={Article} />
			</Switch>
			</div>
	    );
	}
}

export default withRouter(Content);