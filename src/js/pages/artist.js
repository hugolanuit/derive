import React, { Component } from 'react';

import AnimateLink from '../components/animateLink.js';
import Carousel from "../components/carousel.js";
import Icon from '../components/icon.js';

import { connect } from 'react-redux';
import { getArtistDetails } from '../actions/index';

import ScrollElement from "../components/scrollElement.js";
import Footer from '../regions/footer.js';

import '../../scss/artist.scss';

class Artist extends Component {
	constructor(props) {
        super(props);

        this.state = {
	      loading: false,
	      initalized: false,
	      reel: false,
	      initalizedReel: false,
	      reelPlay: true,
	      activeArtistSlide: 1
	    }

	    this.details = React.createRef(); 
	    this.reel = React.createRef();
	    this.artworks = React.createRef();

	    this.toggleReel = this.toggleReel.bind(this);
	    this.playPause = this.playPause.bind(this);
	    this.checkHash = this.checkHash.bind(this);
    }

    scrollToDetails = () => this.details.current.scrollIntoView({behavior: 'smooth', block: 'start'})

    componentDidMount(){
		if(this.props.data === null){
			document.body.classList.add('loading');
			this.setState({loading: true});
		}
		
		this.props.getArtistDetails(this.props.match.params.slug);

	}

	componentWillUnmount(){
		if(this.props.data !== null){
			this.props.getArtistDetails();
		}
	}

	componentDidUpdate(prevProps){
		if(this.props.data !== null){
			if(parseInt(this.props.match.params.slug) !== this.props.data.id ) {
				if(!this.state.loading) {
					this.props.getArtistDetails(this.props.match.params.slug);
					document.body.classList.add('loading');
					this.setState({loading: true})
				}

			}else {
				document.body.classList.remove('loading');
				if(this.state.loading) {
					this.setState({loading: false});
					this.checkHash();
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

	checkHash(){
		if(window.location.hash == '#artworks') {
			this.artworks.current.scrollIntoView({block: 'start'});
			window.scrollTo(window.scrollX, window.scrollY + 1);
		}
	}

	render(){  
		const newsSliderSettings = {
		    dots: false,
		    infinite: true,
		    autoplay: true,
		    speed: 1000,
		    autoplaySpeed: 12000,
		    pauseOnHover: false,
		    pauseOnFocus: false,
		    swipe: false,
		    draggable: false,
		    slidesToShow: 1,
		    centerMode: true,
		   	centerPadding: '10%',
		   	cssEase: 'ease-in-out',
		   	mobileFirst: true,
		   	responsive: [
		        {
		          breakpoint: 800,
		          settings: {
		            centerPadding: '0%'
		          }
		        }
		    ],
		   	afterChange: current => this.setState({ activeArtistSlide: current+1 })
		}; 
		return (
			<div className={`page ${this.state.initalized > 0 ? "page--initialized" : ""}`}>
				{this.props.data !== null ? (
						<div>
							<div className="artist">
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
								<div className={`hero hero--middle hero--initialized hero--backdrop--fill ${this.props.data.reel.url !== null ? "hero--reel" : ""}`}  onClick={this.props.data.reel.url !== null ? this.toggleReel : undefined }>
									{this.props.data.reel.preview_url ? (
										<video className="hero__video" loop autoPlay muted playsInline>
										  <source type="video/mp4" src={this.props.data.reel.preview_url} />
										</video>
									):(
										<div className="hero__bg lazyload" data-bgset={this.props.data.portrait.img+'?v=800 [(max-width: 600px)] | '+this.props.data.portrait.img+'?v=2000'}></div>
									)}
									<div className="container text-center">
										<div className="grid grid--center grid--bottom">	
											<div className="col">
												<h1 className="huge alternate_font">{this.props.data.title.rendered}</h1>
												{this.props.data.reel.url !== null ? (
													<div className="slight normal_top hide_desktop"><Icon icon="play"/> Play Reel</div>
												):("")}
											</div>
										</div>
									</div>
								</div>
								</ScrollElement>
								<ScrollElement bodyColor="white">
								<section className="red">
									<div className="container container--medium text-center text_display">
										<div className="artist_text" dangerouslySetInnerHTML={{ __html: this.props.data.content.rendered.first}}></div>
										{this.props.data.content.rendered.last !== null ? (
											<div className="slight normal_top"><button onClick={this.scrollToDetails} className="hover--bourgogne">Read more</button></div>
										):("")}
									</div>
								</section>
								</ScrollElement>
								<div ref={this.artworks}>
									{this.props.data.artworks && this.props.data.artworks.length > 0 && this.props.data.artworks.find((f) => f.featured === true) !== undefined ? (
										<div>
											{this.props.data.artworks.map((el,index) => {
												if(el.featured) {
													return (
														<ScrollElement key={index} bodyColor="dark">
															<div className="hero-container">
																<div className="hero hero--fade">
																	<div className="hero__bg lazyload" data-bgset={el.featured_media.img+'?v=800 [(max-width: 600px)] | '+el.featured_media.img+'?v=2000'}></div>
																	<div className="container">
																		<AnimateLink to={"/artworks/"+el.id}>
																			<div className="uppercase small_gap">Featured Artwork</div>
																			<h2 className="big">{el.title.rendered}</h2>
																		</AnimateLink>
																	</div>	
																</div>
																
															</div>
														</ScrollElement>
													);
												}
											})}
										</div>
									):("")}
									{this.props.data.artworks && this.props.data.artworks.length > 0 && this.props.data.artworks.find((f) => f.featured === false) !== undefined ? (
										<ScrollElement bodyColor="white">
										<section className="red text-center section--fit flat_bottom--padded">
											<div className="container">
												<div className="grid grid--guttered grid--stretch">
													{this.props.data.artworks.map((el,index) => {
														if(!el.featured) {
															return (
																<div key={index} className="col col--third col--full--mobile">
																	<AnimateLink to={"/artworks/"+el.id}>
																		<div className="artwork">
																			<div className="artwork__image normal_gap">
																				<div className={`image image--hover ${el.featured_media.orientation === 'vertical' ? "image--narrow--mobile " : ""}image--`+el.featured_media.orientation}>
																					<div className={`image lazyload image--`+el.featured_media.orientation}  data-bgset={el.featured_media.img+'?v=800'}></div>
																				</div>
																			</div>
																			<div>
																				<h2 className="slight">
																					<span>{el.title.rendered}</span>
																				</h2>
																			</div>
																		</div>
																	</AnimateLink>
																</div>
															);
														}
													})}
								
												</div>
											</div>
										</section>
										</ScrollElement>
									):("")}
								</div>
								<ScrollElement bodyColor="white">
								<section className="section--fit red flat_bottom--padded">
									<div className="container container--no-padding--mobile">
										<div className="grid grid--center">
											<div className="col col--half col--full--mobile">
												<div className={`image lazyload ${this.props.data.second_featured_media.orientation === 'vertical' ? "image--narrow--mobile " : ""}image--`+this.props.data.second_featured_media.orientation} data-bgset={this.props.data.second_featured_media.img+'?v=800 [(max-width: 600px)] | '+this.props.data.second_featured_media.img+'?v=1600'}></div>
											</div>
										</div>
									</div>
								</section>
								<section className="section--fit red" ref={this.details}>
									<div className="container">
										<div className="grid grid--top grid--thick_guttered">
											{this.props.data.content.rendered.last !== null ? (
												<div className="col col--half col--full--mobile">
													<div className="text_display" dangerouslySetInnerHTML={{ __html: this.props.data.content.rendered.last}}></div>
												</div>
											):("")}
											<div className="col col--half col--full--mobile">
												{this.props.data.quotes && this.props.data.quotes.length > 0 ? (
													<div>
														{this.props.data.quotes.map((el,index) => (
															<div key={index} className="normal_gap">
																<blockquote className="medium_large alternate_font">{el.quote}</blockquote>
																<cite className="slight">— {el.author}</cite>
															</div>
														))}
													</div>
												):("")}
											</div>
										</div>
									</div>
								</section>
								</ScrollElement>
								{this.props.data.related_artists && this.props.data.related_artists.length > 1 ? (
									<ScrollElement bodyColor="dark">
										<div className="artist__related-container">
											<div className="artist__related">
												<div className="artist__related__link big alternate_font left-right">
													<div><span>Discover</span></div>
													<div><span>Other Artists</span></div>
												</div>
												<div className="artist__related__counter uppercase text-center">Similar Artist <br/> {this.state.activeArtistSlide} / {this.props.data.related_artists.length}</div>
												<Carousel className="slider" settings={newsSliderSettings}>
													{this.props.data.related_artists.map((el,index) => (
														<div key={index}>
															<div className="hero">
																<div className="hero__bg lazyload" data-bgset={el.artwork.img+'?v=800 [(max-width: 600px)] | '+el.artwork.img+'?v=2000'}></div>
																<div className="container text-center">
																	<AnimateLink to={"/artists/"+el.id}>
																		<p className="medium_large">{el.title.rendered}</p>
																	</AnimateLink>
																</div>
															</div>
														</div>
													))}
												</Carousel>
											</div>
										</div>
									</ScrollElement>
								):("")}
							</div>
							<Footer />
						</div>
				):("")}
			</div>
		);
	}
}

function mapStateToProps(state, ownProps){

	return { 
		data: state.app.artist
	};

}

export default connect(mapStateToProps, { getArtistDetails })(Artist);