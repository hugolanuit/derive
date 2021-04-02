import React, { Component } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';

import AnimateLink from '../components/animateLink.js';
import Moment from 'moment';

import { connect } from 'react-redux';
import { getArticle } from '../actions/index';

import ScrollElement from "../components/scrollElement.js"; 
import Footer from '../regions/footer.js';

import '../../scss/article.scss';

import Carousel from "../components/carousel.js";

class Article extends Component {
	constructor(props) {
		super(props);

		this.state = {
	      loading: false,
	      initalized: false
	    }
	}

	componentDidMount(){
		if(this.props.data === null){
			document.body.classList.add('loading');
			this.setState({loading: true})
		}

		this.props.getArticle(this.props.match.params.slug);

	}

	componentWillUnmount(){
		if(this.props.data !== null){
			this.props.getArticle();
		}
	}

	componentDidUpdate(prevProps){
		if(this.props.data !== null){
			if(parseInt(this.props.match.params.slug) !== this.props.data.id ) {
				if(!this.state.loading) {
					this.props.getArticle(this.props.match.params.slug);
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

	render(){
		const newsSliderSettings = {
		    dots: false,
		    infinite: false,
		    autoplay: false,
		    swipe: true,
		    draggable: true,
		    slidesToShow: 4,
		    responsive: [
		    	{
		    		breakpoint: 800,
		    		settings: {
		    			slidesToShow: 1.5,
		    			swipe: true,
		    			draggable: false
		    		}
		    	}
		    ]
		};

		return (
			<div className={`page ${this.state.initalized > 0 ? "page--initialized" : ""}`}>
				{this.props.data !== null ? (
						<article>
							<ScrollElement bodyColor="white">
								<section className="section--fit red">
									<div className="container">
										<div className="grid grid--top grid--spaced grid--thick_guttered">
											<div className="col col--half col--full--mobile">
												<div>
													<h1 className="alternate_font big normal_top">{this.props.data.title.rendered}</h1>
													<div className="grid uppercase normal_top">
														<div className="normal_right">
															{Moment(this.props.data.date).format('MMM d, YYYY')}
														</div>
														<div className="normal_right">
															{this.props.data.categories.map((el,index) => {
																if (index > 0) {
																    return <span key={index}> | </span>
																}
																return <span key={index}>{el.name}</span>
															})}
														</div>
													</div>
													<div className="big_top hide_desktop">
														<div className={"image lazyload image--full--mobile image--"+this.props.data.featured_media.orientation} data-bgset={this.props.data.featured_media.img+'?v=800 [(max-width: 600px)] | '+this.props.data.featured_media.img+'?v=1000'}></div>
													</div>
													<div className="big_top article__body text_display" dangerouslySetInnerHTML={{ __html: this.props.data.content.rendered}}></div>
													{this.props.data.second_featured_media.img === null && this.props.data.second_content.rendered !== null ? (
														<div className="medium_top article__body text_display text_display--no-lead" dangerouslySetInnerHTML={{ __html: this.props.data.second_content.rendered}}></div>
													):("")}
												</div>
											</div>
											<div className="col col--two-fifths article__image hide_mobile">
												<div className={"image lazyload image--"+this.props.data.featured_media.orientation} data-bgset={this.props.data.featured_media.img+'?v=800 [(max-width: 600px)] | '+this.props.data.featured_media.img+'?v=1000'}></div>
											</div>
										</div>
									</div>
								</section>
								{this.props.data.second_featured_media.img !== null ? (
									<section className="section--fit red flat_top--padded">
										<div className="container">
											<div className="grid grid--top grid--spaced grid--thick_guttered">
												<div className="col col--two-fifths col--full--mobile">
													<div className={"image lazyload normal_gap image--"+this.props.data.second_featured_media.orientation} data-bgset={this.props.data.second_featured_media.img+'?v=1000'}></div>
													{this.props.data.second_featured_media.caption !== null ? (
														<div>{this.props.data.second_featured_media.caption}</div>
													):("")}
												</div>
												{this.props.data.second_content.rendered !== null ? (
													<div className="col col--half col--full--mobile">
														<div className="big_top flat_top--desktop">
															<div className="article__body text_display text_display--no-lead"  dangerouslySetInnerHTML={{ __html: this.props.data.second_content.rendered}}></div>
														</div>
													</div>
												):("")}
											</div>
										</div>
									</section>
								):("")}
								{this.props.data.related_articles && this.props.data.related_articles.length > 0 ? (
								<section className="red section--fit flat_top--padded">
									<div className="container container--bleed-left--mobile">
										<h1 className="big alternate_font">Related Articles</h1>
										<div className="medium_top huge_top--desktop">
											<Swiper
											  className="slider"
										      spaceBetween={60}
										      slidesPerView={1.5}
										      breakpoints={{
											    800: {
											      slidesPerView: 4,
											    }
											  }}
										    >
												{this.props.data.related_articles.map((el,index) => (
													<SwiperSlide key={index} className="col col--third">
														<AnimateLink disableDragClick={true} to={"/news/"+el.id}>
															<div className={"image lazyload normal_gap image--"+el.featured_media.orientation} data-bgset={el.featured_media.img+'?v=800'}></div>
															<div className="uppercase small_gap">{el.categories[0].name}</div>
															<div className="slight_medium">{el.title.rendered}</div>
														</AnimateLink>
													</SwiperSlide>
												))}
											</Swiper>
										</div>
									</div>
								</section>
								):("")}
								<section className="section--fit red flat_top--padded">
									<div className="container text-center">
										<AnimateLink className="hover--bourgogne medium" to="/news">Back to All News</AnimateLink>
									</div>
								</section>
							</ScrollElement>
							<Footer />
						</article>
				):("")}
			</div>
				

		);
	}
}

function mapStateToProps(state, ownProps){

	return { 
		data: state.app.article
	};

}

export default connect(mapStateToProps, { getArticle })(Article);