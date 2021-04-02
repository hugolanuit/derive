import React, { Component } from 'react';

import AnimateLink from '../components/animateLink.js';

import HoverIntent from 'react-hoverintent';

import { connect } from 'react-redux';
import { loadArtists } from '../actions/index';

import '../../scss/artists.scss';

class Artists extends Component {
	constructor(props) {
		super(props);

		this.state = {
	      loading: false,
	      initalized: false
	    }
	}

	componentDidMount(){
		if(this.props.data.length === 0){
			document.body.classList.add('loading');
			this.setState({loading: true})
			this.props.loadArtists();
		}else{
			setTimeout(() =>  this.setState({initalized: true}),20)
		}

	}

	componentDidUpdate(){
		if(this.props.data.length > 0) {
			document.body.classList.remove('loading');
			if(this.state.loading) {
				this.setState({loading: false})
				setTimeout(() =>  this.setState({initalized: true}),20)
			}
		}

	}

	onMouseOverArtist(el){
		el.classList.add('open');
		document.body.classList.add('white-header')
	}

	onMouseOutArtist(el){
		el.classList.remove('open');
		document.body.classList.remove('white-header')
	}

	render(){
		return (
			<div className={`page ${this.state.initalized > 0 ? "page--initialized" : ""}`}>
				{this.props.data && this.props.data.length > 0 ? (
						<div>
							<section className="red artists__list --initialized big_bottom--padded big_top--padded">
								<div className="container">
									<ul className="medium_large alternative-fonts">
										{this.props.data.map((el,index) => (
											<li key={index} className="small_gap">
												<HoverIntent
											          onMouseOver={this.onMouseOverArtist}
											          onMouseOut={this.onMouseOutArtist}
											          sensitivity={5}
											          interval={100}
											          timeout={100}
											        >
											        	<button>
															<AnimateLink to={"/artists/"+el.id}>
																<span>{el.title.rendered}</span>
																<div className={"artists__image artists__image--"+el.featured_media.orientation}>
																	<div className={`image lazyload ${el.featured_media.orientation === 'vertical' ? "image--narrow--mobile " : ""}image--`+el.featured_media.orientation} data-bgset={el.featured_media.img+'?v=800 [(max-width: 600px)] | '+el.featured_media.img+'?v=1200'}></div>
																</div>
															</AnimateLink>
														</button>
												</HoverIntent>
											</li>
										))}
									</ul>
								</div>
							</section>
						</div>
				):("")}
			</div>
		
		);
	}
}

function mapStateToProps(state){
	return { 
		data: state.app.artists
	};

}

export default connect(mapStateToProps, { loadArtists })(Artists);