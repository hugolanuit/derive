import React, { Component } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
// import locomotiveScroll from "locomotive-scroll";

import AnimateLink from '../components/animateLink.js';
import ScrollElement from "../components/scrollElement.js";
import Icon from '../components/icon.js';

import HoverIntent from 'react-hoverintent';

import { connect } from 'react-redux';
import { loadHomepage } from '../actions/index';

import Footer from '../regions/footer.js';

import '../../scss/homepage.scss';

class Homepage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
	      	initalized: false,
	      	reel: false,
	      	initalizedReel: false,
	      	reelPlay: true,
	      	hoverArtist: false,
	      	preview: {
	      		type: null,
	      		link: null
	      	}
	    }

	    this.reel = React.createRef();
	    this.scrollRef = React.createRef();

	    this.artistTimeout = null;

	    this.toggleReel = this.toggleReel.bind(this);
	    this.playPause = this.playPause.bind(this);
	    this.randomizePreview = this.randomizePreview.bind(this);

	    this.onMouseOverArtist = this.onMouseOverArtist.bind(this);
	    this.onMouseOutArtist = this.onMouseOutArtist.bind(this);
	}

	componentDidMount(){
		if(this.props.data === null){
			document.body.classList.add('loading');
			this.props.loadHomepage();
			this.setState({loading: true});
		}else{
			this.randomizePreview();
			setTimeout(() =>  this.setState({initalized: true}),20);

			// const scroll = new locomotiveScroll({
		 //      el: this.scrollRef.current,
		 //      smooth: true
		 //    });

		}

	}

	componentDidUpdate(){
		if(this.props.data !== null) {
			document.body.classList.remove('loading');
			if(this.state.loading) {
				this.setState({loading: false})
				setTimeout(() =>  this.setState({initalized: true}),20);
				this.randomizePreview();
				// const scroll = new locomotiveScroll({
			 //      el: this.scrollRef.current,
			 //      smooth: true
			 //    });
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

	randomizePreview(){
		if(this.props.data.content.blocks.reel.values['preview_links'] && this.props.data.content.blocks.reel.values['preview_links'].length > 0){
			const index = Math.floor(Math.random() * this.props.data.content.blocks.reel.values['preview_links'].length);
			this.setState({preview: this.props.data.content.blocks.reel.values['preview_links'][index]});
		}
	}

	onMouseOverArtist(el){
		el.classList.add('open');
		this.setState({hoverArtist: true});
		document.body.classList.add('white-header');
	}

	onMouseOutArtist(el){
		el.classList.remove('open');
		this.setState({hoverArtist: false});
		document.body.classList.remove('white-header');
	}

	// handleOnMouseDown (e) {
	// 	this.setState({
	// 		clientXonMouseDown: e.clientX,
	// 		clientYonMouseDown: e.clientY
	// 	})
	//     e.preventDefault(); // stops weird link dragging effect
	// }

	// handleOnClick (e) {
	// 	e.stopPropagation();
	// 	if (this.state.clientXonMouseDown !== e.clientX || this.state.clientYonMouseDown !== e.clientY) {
	//       // prevent link click if the element was dragged
	//       e.preventDefault()
	//     }
	// 

	render(){
		return (
			<div className={`page ${this.state.initalized > 0 ? "page--initialized" : ""}`}>
				{this.props.data !== null ? (
				<div ref={this.scrollRef}>
						{this.props.data.content.blocks.reel.values["video_link"] !== null && this.state.reel ? (
							<div className={`video-player ${this.state.initalizedReel > 0 ? "video-player--initialized" : ""} ${this.state.reelPlay ? "" : "video-player--paused"}`}>
								<div className="video-player__close uppercase" onClick={this.toggleReel}>
									<span></span>
									<span></span>
								</div>
								<video autoPlay={false} ref={this.reel} onClick={this.playPause}>
								  <source type="video/mp4" src={this.props.data.content.blocks.reel.values["video_link"]} />
								</video>
							</div>
						):("")}
						<ScrollElement bodyColor="dark">
							<div className={`hero hero--initialized ${this.props.data.content.blocks.reel.values["video_link"] !== null ? "hero--reel" : ""}`} onClick={this.props.data.content.blocks.reel.values["video_link"] !== null ? this.toggleReel : undefined }>
								{this.state.preview.type == 'video' ? (
									<video className="hero__video" loop autoPlay muted playsInline>
									  <source type="video/mp4" src={this.state.preview.link} />
									</video>
								):(
									<div className="hero__bg lazyload" data-bgset={this.state.preview.link+'?v=800 [(max-width: 600px)] | '+this.state.preview.link+'?v=2000'}></div>
								)}
								<div className="container">
									<h1 className="huge home__intro">
										<span className="alternate_font">{this.props.data.content.blocks.reel.values["tittle"]}</span><br/> <span>{this.props.data.content.blocks.reel.values["sub-title"]}</span>
									</h1>
									{this.props.data.content.blocks.reel.values["video_link"] !== null ? (
										<div className="slight normal_top hide_desktop"><Icon icon="play"/> Play Reel</div>
									):("")}
								</div>
							</div>
						</ScrollElement>
						<ScrollElement bodyColor="white">
							<div className="section-container">
							<section className="text-center">
								<div className="container container--narrow">
									<p className="medium" dangerouslySetInnerHTML={{ __html: this.props.data.content.blocks["about-us"].values["first-line"] }}></p>
									<div className="big_top big_bottom big alternate_font">
										<AnimateLink className="link-hover hover--fade hover--bourgogne" to="/about" dangerouslySetInnerHTML={{ __html: this.props.data.content.blocks["about-us"].values["cta"] }}></AnimateLink>
									</div>	
									<p className="slight" dangerouslySetInnerHTML={{ __html: this.props.data.content.blocks["about-us"].values["second-line"] }}></p>
								</div>
							</section>
							</div>
						</ScrollElement>
						{this.props.data.content.blocks.artworks.values && this.props.data.content.blocks.artworks.values.length > 0 ? (
							<div>
								{this.props.data.content.blocks.artworks.values.map((el,index) => (
									<ScrollElement key={index} bodyColor="dark">
										<div className="hero-container">
											<div className="hero hero--fade">
												<div className="hero__bg lazyload" data-bgset={el.featured_media.img+'?v=800 [(max-width: 600px)] | '+el.featured_media.img+'?v=2000'}></div>
												<div className="container">
													<div className="grid grid--bottom grid--guttered">	
														<div className="col col--flex col--full--mobile">
															<AnimateLink to={"/artworks/"+el.id}>
																<div className="uppercase small_gap">Featured Artwork</div>
																<h2 className="big">{el.title.rendered}</h2>
															</AnimateLink>
														</div>
														{el.artist && el.artist.length > 0 ? (
															<div className="col col--flex col--full--mobile text-right--desktop">
																{el.artist.length > 1 ? (
																	<h3 className="slight normal_bottom--desktop">
																	by
																	{el.artist.map((_el,_index) => (
																		<span key={_index}>
																			{el.artist.length > 1 && el.artist.length === (_index + 1) ? (
																				<span>& </span>
																			):("")}
																			<AnimateLink to={"/artists/"+_el.id}>
																				 <span className="alternate_font">{_el.title.rendered}</span>
																			</AnimateLink>
																		</span>
																	))}
																	</h3>
																):(
																	<AnimateLink to={"/artists/"+el.artist[0].id}>
																		<h3 className="slight normal_bottom--desktop">by <span className="alternate_font">{el.artist[0].title.rendered}</span></h3>
																	</AnimateLink>
																)}
															</div>
														):("")}
													</div>
												</div>	
											</div>
											
										</div>
									</ScrollElement>
								))}
							</div>
						):("")}
						<ScrollElement bodyColor="red" treshold={0.9}>
								<section className="section--tall-top section--tall-bottom text-center">
									<div className="container container--narrow">
										<div className="big_top big_bottom big alternate_font">
											{this.props.data.content.blocks["artworks-outro"] ? (
												<AnimateLink className="link-hover hover--bourgogne hover--fade" to="/artworks" dangerouslySetInnerHTML={{ __html: this.props.data.content.blocks["artworks-outro"].values.cta}}></AnimateLink>
											):(
												<AnimateLink className="hover--bourgogne hover--fade" to="/news">Discover All Artworks</AnimateLink>
											)}
										</div>	
									</div>
								</section>
						</ScrollElement>
						{this.props.data.content.blocks.artists.values && this.props.data.content.blocks.artists.values.length > 0 ? (
							<ScrollElement bodyColor="white" treshold={0.9}>
								<section className="section--fit section_bottom text-center artists__list artists__list--full">
									<div className="container">
										<h2 className="medium">
											{this.props.data.content.blocks["artists-intro"] ? (
												<span>{this.props.data.content.blocks["artists-intro"].values["line-1"]}<br/> <span className="alternate_font">{this.props.data.content.blocks["artists-intro"].values["line-2"]}</span></span>
											):("The Artists")}
										</h2>
										<ul className="big big_top alternative-fonts">
											{this.props.data.content.blocks.artists.values.map((el,index) => (
												<li  key={index}>
													<HoverIntent
											          onMouseOver={this.onMouseOverArtist}
											          onMouseOut={this.onMouseOutArtist}
											          sensitivity={10}
											          interval={100}
											          timeout={99}
											        >
											        	<button>
												        	<AnimateLink to={"/artists/"+el.id}>
													        	<span>{el.title.rendered}</span>
																<div className="artists__image">
																	<div className="image lazyload" data-bgset={el.portrait.img+'?v=800 [(max-width: 600px)] | '+el.portrait.img+'?v=2000'}></div>
																</div>
															</AnimateLink>
														</button>
											        </HoverIntent>
												</li>
											))}
										</ul>
									</div>
								</section>
							</ScrollElement>
						):("")}
						<ScrollElement bodyColor="white">
							{this.props.data.content.posts && this.props.data.content.posts.length > 0 ? (
								<section className="section--fit section--tall-bottom">
									<div className="container container--bleed-left">
										<div className="uppercase small_gap">
											{this.props.data.content.blocks.news ? (
												<span>{this.props.data.content.blocks.news.values.news_section}</span>
											):("News")}
										</div>
										<h4 className="alternate_font big">
											{this.props.data.content.blocks.news ? (
												<span>{this.props.data.content.blocks.news.values.news_section_title}</span>
											):("Hear from us")}
										</h4>
										<div className="medium_top huge_top--desktop">
											<Swiper
											  className="slider slider--drag"
										      spaceBetween={60}
										      slidesPerView={1.5}
										      breakpoints={{
											    800: {
											      slidesPerView: 2.5,
											    }
											  }}
										    >
										      {this.props.data.content.posts.map((el,index) => (
										      	<SwiperSlide key={index} className="col col--third">
													<div key={index} className="col col--third">
														<AnimateLink disableDragClick={true} to={"/news/"+el.id}>
															<div className={`image normal_gap image--hover image--`+el.featured_media.orientation}>
																<div className={"image lazyload image--"+el.featured_media.orientation}  data-bgset={el.featured_media.img+'?v=800'}></div>
															</div>
															<div className="uppercase small_gap">{el.categories[0].name}</div>
															<div className="slight_medium">{el.title.rendered}</div>
														</AnimateLink>
													</div>
												</SwiperSlide>
												))}
										    </Swiper>
										</div>
									</div>
								</section>
							):("")}
							<section className="section--fit flat_top--padded">
								<div className="container">
									<div className="grid grid--bottom">
										<div className="col col--flex col--full--mobile">
											{this.props.data.content.blocks.news ? (
												<AnimateLink className="link-hover hover--bourgogne big alternate_font" to="/news" dangerouslySetInnerHTML={{ __html: this.props.data.content.blocks.news.values.news_cta}}></AnimateLink>
											):(
												<AnimateLink className="hover--bourgogne big alternate_font" to="/news">Discover Our News</AnimateLink>
											)}
										</div>
										<div className="big_top flat_top--desktop">
											<h5 className="slight">Follow us on social</h5>
											<nav className="normal_top normal_bottom">
												<ul className="uppercase">
													<li>
														<a className="hover--bourgogne" href="https://instagram.com" target="_blank">Instagram</a>
													</li>
													<li>
														<a className="hover--bourgogne" href="https://facebook.com" target="_blank">Facebook</a>
													</li>
													<li>
														<a className="hover--bourgogne" href="https://twitter.com" target="_blank">Twitter</a>
													</li>
												</ul>
											</nav>
										</div>
									</div>
								</div>
							</section>
						</ScrollElement>
						<Footer />
				
				</div>
				):("")}
			</div>
			
				
		);
	}
}

function mapStateToProps(state){
	return { 
		data: state.app.homepage
	};

}

export default connect(mapStateToProps, { loadHomepage })(Homepage);