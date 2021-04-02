import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ScrollElement from "../components/scrollElement.js";
import AnimateLink from '../components/animateLink.js';
import Footer from '../regions/footer.js';
import Icon from '../components/icon.js';

import { connect } from 'react-redux';
import { getArtworkDetails } from '../actions/index';

import '../../scss/artwork.scss';

class Artwork extends Component {
	constructor(props) {
        super(props);

        this.details = React.createRef(); 

        this.state = {
	      loading: false,
	      initalized: false,
	      reel: false,
	      initalizedReel: false,
	      reelPlay: true
	    }

	    this.reel = React.createRef();

	    this.toggleReel = this.toggleReel.bind(this);
	    this.playPause = this.playPause.bind(this);
    }

    scrollToDetails = () => this.details.current.scrollIntoView({behavior: 'smooth', block: 'start'})

    componentDidMount(){
		if(this.props.data === null){
			document.body.classList.add('loading');
			this.setState({loading: true})
		}
		
		this.props.getArtworkDetails(this.props.match.params.slug);

	}

	componentWillUnmount(){
		if(this.props.data !== null){
			this.props.getArtworkDetails();
		}
	}

	componentDidUpdate(prevProps){
		if(this.props.data !== null){
			if(parseInt(this.props.match.params.slug) !== this.props.data.id ) {
				if(!this.state.loading) {
					this.props.getArtworkDetails(this.props.match.params.slug);
					document.body.classList.add('loading');
					this.setState({loading: true})
				}

			}else {
				document.body.classList.remove('loading');
				if(this.state.loading) {
					this.setState({loading: false})
					setTimeout(() =>  this.setState({initalized: true}),20)
				}
			}
		}
	}

	toggleReel(){
		if(!this.state.reel){
			this.setState({reel: true});
			setTimeout(() =>  {
				this.setState({initalizedReel: true});
				this.reel.current.play();
			},20);
		}else {
			this.setState({initalizedReel: false});
			setTimeout(() =>  this.setState({reel: false}),700);
		}
		
	}

	playPause(){
		if(this.reel.current.paused){
			this.reel.current.play();
			this.setState({reelPlay: true});
		}else {
			this.reel.current.pause();
			this.setState({reelPlay: false});
		}
	}

	render(){
		return (
			<div className={`page ${this.state.initalized > 0 ? "page--initialized" : ""}`}>
				{this.props.data !== null ? (
						<div>
							<div className="artwork">
								{this.props.data.reel.url !== null && this.state.reel ? (
									<div className={`video-player ${this.state.initalizedReel > 0 ? "video-player--initialized" : ""} ${this.state.reelPlay ? "" : "video-player--paused"}`}>
										<div className="video-player__close uppercase" onClick={this.toggleReel}>
											<span></span>
											<span></span>
										</div>
										<video autoPlay={false} ref={this.reel} onClick={this.playPause}>
										  <source type="video/mp4" src={this.props.data.reel.url} />
										</video>
									</div>
								):("")}
								<ScrollElement bodyColor="default">
								<div className={`hero hero--initialized ${this.props.data.reel.url !== null ? "hero--reel" : ""}`} onClick={this.props.data.reel.url !== null ? this.toggleReel : undefined }>
									{this.props.data.reel.preview_url ? (
										<video className="hero__video" loop autoPlay muted playsInline>
										  <source type="video/mp4" src={this.props.data.reel.preview_url} />
										</video>
									):(
										<div className="hero__bg lazyload" data-bgset={this.props.data.featured_media.img+'?v=800 [(max-width: 600px)] | '+this.props.data.featured_media.img+'?v=2000'}></div>
									)}
									<div className="container">
										<div className="grid grid--bottom grid--guttered">	
											<div className="col col--flex col--full--mobile">
												<h1 className="big">{this.props.data.title.rendered}</h1>
												{this.props.data.reel.url !== null ? (
													<div className="slight normal_top hide_desktop"><Icon icon="play"/> Play Reel</div>
												):("")}
											</div>
											{this.props.data.artist && this.props.data.artist.length > 0 ? (
												<div className="col col--flex col--full--mobile text-right--desktop">
													{this.props.data.artist.length > 1 ? (
														<h3 className="slight normal_bottom--desktop">
														by
														{this.props.data.artist.map((_el,_index) => (
															<span key={_index}>
																{this.props.data.artist.length > 1 && this.props.data.artist.length === (_index + 1) ? (
																	<span>& </span>
																):("")}
																<AnimateLink to={"/artists/"+_el.id}>
																	 <span className="alternate_font">{_el.title.rendered}</span>
																</AnimateLink>
															</span>
														))}
														</h3>
													):(
														<AnimateLink to={"/artists/"+this.props.data.artist[0].id}>
															<h3 className="slight normal_bottom--desktop">by <span className="alternate_font">{this.props.data.artist[0].title.rendered}</span></h3>
														</AnimateLink>
													)}
												</div>
											):("")}
										</div>
									</div>
								</div>
								</ScrollElement>
								<ScrollElement bodyColor="white">
								<section className="section--fit red">
									<div className="container">
										<div className="grid grid--spaced grid--bottom">
											<div className="text_display col col--third col--full--mobile" dangerouslySetInnerHTML={{ __html: this.props.data.content.rendered}}></div>	
											<div className="col col--third col--full--mobile big_top flat_top--desktop">
												<p className="uppercase normal_gap">DETAILS</p>
												{this.props.data.categories && this.props.data.categories.length > 0 ? (
													<div className="grid grid--top slight normal_gap">
														<div className="artwork__detail-title normal_right">Categories</div>
														<div className="col">
															{this.props.data.categories.map((el,index) => {
																if (this.props.data.categories.length > 1 && this.props.data.categories.length === (index + 1)) {
																    return (<span key={index}> & {el.name}</span>)
																} else if(this.props.data.categories.length > 1  && index > 0 && this.props.data.categories.length > (index + 1)){
																	return (<span key={index}>, {el.name}</span>)
																} else {
																    return (<span key={index}>{el.name}</span>)
																}
																
															})}
														</div>
													</div>
												):("")}
												{this.props.data.size && this.props.data.size.length > 0 ? (
													<div className="grid grid--top slight normal_gap">
														<div className="artwork__detail-title normal_right">Scale</div>
														<div className="col">
															{this.props.data.size.map((el,index) => {
																if (this.props.data.size.length > 1 && this.props.data.size.length === (index + 1)) {
																    return (<span key={index}> & {el.name}</span>)
																} else if(this.props.data.size.length > 1  && index > 0 && this.props.data.size.length > (index + 1)){
																	return (<span key={index}>, {el.name}</span>)
																} else {
																    return (<span key={index}>{el.name}</span>)
																}
																
															})}
														</div>
													</div>
												):("")}
												{this.props.data.medium && this.props.data.medium.length > 0 ? (
													<div className="grid grid--top slight normal_gap">
														<div className="artwork__detail-title normal_right">Medium</div>
														<div className="col">
															{this.props.data.medium.map((el,index) => {
																if (this.props.data.medium.length > 1 && this.props.data.medium.length === (index + 1)) {
																    return (<span key={index}> & {el.name}</span>)
																} else if(this.props.data.medium.length > 1  && index > 0 && this.props.data.medium.length > (index + 1)){
																	return (<span key={index}>, {el.name}</span>)
																} else {
																    return (<span key={index}>{el.name}</span>)
																}
																
															})}
														</div>
													</div>
												):("")}
											</div>
										</div>
									</div>
								</section>
								</ScrollElement>
								{this.props.data.block_content && this.props.data.block_content.length > 0 ? (
									<div>
										{this.props.data.block_content.map((el,index) => {
											if (el.acf_fc_layout === 'block_1') {
												if (el.type === 'right') {
													return (
														<ScrollElement key={index} bodyColor="white" treshold={`${index > 0 && this.props.data.block_content[index-1].acf_fc_layout === 'block_2' ? 0.2 : 0}`}>
															<section className={`section--fit ${index === 0 ? 'flat_top--padded' : ''} ${index > 0 && this.props.data.block_content[index-1].acf_fc_layout === 'block_2' ? 'section--tall-top' : ''}`}>
																<div className="container container--bleed-left">
																	<div className="grid grid--top grid--spaced grid--thick_guttered">
																		<div className="col col--quarter col--two-thirds--mobile medium_left--desktop">
																			<div className={`image normal_gap lazyload ${el.image_1.width === el.image_1.height ? 'image--square' : ''}${el.image_1.width > el.image_1.height ? 'image--horizontal' : ''}${el.image_1.width < el.image_1.height ? 'image--vertical' : ''}`}  data-bgset={el.image_1.url+'?v=800 [(max-width: 600px)] | '+el.image_1.url+'?v=800'}></div>
																			{el.image_1.caption !== null ? (
																				<div>{el.image_1.caption}</div>
																			):("")}
																		</div>
																		<div className="col col--two-thirds col--full--mobile">
																			<div className={`image normal_gap lazyload ${el.image_2.width === el.image_2.height ? 'image--square' : ''}${el.image_2.width > el.image_2.height ? 'image--horizontal' : ''}${el.image_2.width < el.image_2.height ? 'image--vertical' : ''}`}  data-bgset={el.image_2.url+'?v=800 [(max-width: 600px)] | '+el.image_2.url+'?v=1400'}></div>
																			{el.image_2.caption !== null ? (
																				<div>{el.image_2.caption}</div>
																			):("")}
																		</div>
																	</div>
																</div>
															</section>
														</ScrollElement>
													)
												} else if (el.type === 'half') {
													return (
														<ScrollElement key={index} bodyColor="white" treshold={`${index > 0 && this.props.data.block_content[index-1].acf_fc_layout === 'block_2' ? 0.2 : 0}`}>
															<section className={`section--fit ${index === 0 ? 'flat_top--padded' : ''} ${index > 0 && this.props.data.block_content[index-1].acf_fc_layout === 'block_2' ? 'section--tall-top' : ''}`}>
																<div className="container">
																	<div className="grid grid--top grid--spaced grid--thick_guttered">
																		<div className="col col--half col--full--mobile">
																			<div className={`image normal_gap lazyload ${el.image_1.width === el.image_1.height ? 'image--square' : ''}${el.image_1.width > el.image_1.height ? 'image--horizontal' : ''}${el.image_1.width < el.image_1.height ? 'image--vertical' : ''}`}  data-bgset={el.image_1.url+'?v=800 [(max-width: 600px)] | '+el.image_1.url+'?v=1200'}></div>
																			{el.image_1.caption !== null ? (
																				<div>{el.image_1.caption}</div>
																			):("")}
																		</div>
																		<div className="col col--half col--full--mobile">
																			<div className={`image normal_gap lazyload ${el.image_2.width === el.image_2.height ? 'image--square' : ''}${el.image_2.width > el.image_2.height ? 'image--horizontal' : ''}${el.image_2.width < el.image_2.height ? 'image--vertical' : ''}`}  data-bgset={el.image_2.url+'?v=800 [(max-width: 600px)] | '+el.image_2.url+'?v=1200'}></div>
																			{el.image_2.caption !== null ? (
																				<div>{el.image_2.caption}</div>
																			):("")}
																		</div>
																	</div>
																</div>
															</section>
														</ScrollElement>
													)
												} else if (el.type === 'left') {
													return (
														<ScrollElement key={index} bodyColor="white" treshold={`${index > 0 && this.props.data.block_content[index-1].acf_fc_layout === 'block_2' ? 0.2 : 0}`}>
															<section className={`section--fit ${index === 0 ? 'flat_top--padded' : ''} ${index > 0 && this.props.data.block_content[index-1].acf_fc_layout === 'block_2' ? 'section--tall-top' : ''}`}>
																<div className="container container--bleed-right">
																	<div className="grid grid--right grid--top grid--thick_guttered">
																		<div className="col col--two-thirds col--full--mobile">
																			<div className={`image normal_gap lazyload ${el.image_1.width === el.image_1.height ? 'image--square' : ''}${el.image_1.width > el.image_1.height ? 'image--horizontal' : ''}${el.image_1.width < el.image_1.height ? 'image--vertical' : ''}`}  data-bgset={el.image_1.url+'?v=800 [(max-width: 600px)] | '+el.image_1.url+'?v=1400'}></div>
																			{el.image_1.caption !== null ? (
																				<div className="bleed_left">{el.image_1.caption}</div>
																			):("")}
																		</div>
																		<div className="col col--third col--two-thirds--mobile">
																			<div className={`image normal_gap lazyload ${el.image_2.width === el.image_2.height ? 'image--square' : ''}${el.image_2.width > el.image_2.height ? 'image--horizontal' : ''}${el.image_2.width < el.image_2.height ? 'image--vertical' : ''}`}  data-bgset={el.image_2.url+'?v=800 [(max-width: 600px)] | '+el.image_2.url+'?v=800'}></div>
																			{el.image_2.caption !== null ? (
																				<div>{el.image_2.caption}</div>
																			):("")}
																		</div>
																	</div>
																</div>
															</section>
														</ScrollElement>
													)
												}
											} else if (el.acf_fc_layout === 'block_2') {
												return (
													<ScrollElement bodyColor={el.background_color} treshold={0.2}>
														<section className="text-center section--tall-top">
															<div className="container container--narrow text_display" dangerouslySetInnerHTML={{ __html: el.text}}></div>
														</section>
													</ScrollElement>
												)
											} else if (el.acf_fc_layout === 'block_3') {
												return (
													<ScrollElement bodyColor="white">
														<div className="hero hero--no-backdrop">
															<div className="hero__bg lazyload" data-bgset={el.image.url+'?v=800 [(max-width: 600px)] | '+el.image.url+'?v=2000'}></div>
														</div>
													</ScrollElement>
												)
											}
										})}
									</div>
								):("")}	
								<ScrollElement bodyColor="default">
								<section className="section--fit flat_top--padded">
									<div className="container text-center">
										<AnimateLink className="hover--bourgogne medium" to="/artworks">Back to Artwork's List</AnimateLink>
									</div>
								</section>
								</ScrollElement>
							</div>
							{this.props.data.artist && this.props.data.related_artworks.length > 0  && this.props.data.artist.length == 1 ? (
								<div>
									<ScrollElement bodyColor="bourgogne" treshold={0.5}>
								      	<section className={`text-center artwork__related ${this.props.data.related_artworks.length == 2 ? "artwork__related--left-right" : ""}`}>
								      		{this.props.data.related_artworks.map((el,index) => (
								      			<div key={index} className="artwork__related__img">
								      				<div className={`image lazyload image--`+el.featured_media.orientation}  data-bgset={el.featured_media.img+'?v=800'}></div>
								      			</div>
								      		))}
											<div className="container container--narrow">
												<AnimateLink to={"/artists/"+this.props.data.artist[0].id+"#artworks"} className="big alternate_font link-hover hover--red">
													<div><span>Other Artworks</span></div>
													<div><span>By this Artist <Icon icon="arrow"/></span></div>
												</AnimateLink>
											</div>
										</section>
									</ScrollElement>
									<Footer contact={false} />
								</div>
							):(
								<Footer />
							)}
						</div>
				):("")}
			</div>

			
		);
	}
}

function mapStateToProps(state, ownProps){

	return { 
		data: state.app.artwork
	};

}

export default connect(mapStateToProps, { getArtworkDetails })(Artwork);