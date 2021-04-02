import React, { Component } from 'react';

import AnimateLink from '../components/animateLink.js';

import { connect } from 'react-redux';
import { loadNews } from '../actions/index';

import ScrollElement from "../components/scrollElement.js"; 
import Footer from '../regions/footer.js';

import '../../scss/news.scss';

class News extends Component {
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
			this.props.loadNews();
			this.setState({loading: true})
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

	render(){
		return (
			<div className={`page ${this.state.initalized > 0 ? "page--initialized" : ""}`}>
				{this.props.data && this.props.data.length > 0 ? (
						<div className="news">
							<ScrollElement bodyColor="white">
								<section className="red section--fit">
									<div className="container">
										<h1 className="big text-center text-left--desktop news__title"><span className="alternate_font">Our latest </span><span>News</span></h1>
										<div className="grid grid--guttered grid--top huge_top news__list">
											{this.props.data.map((el,index) => (
												<div key={index} className={`col col--full--mobile col--${index < 7 ? "third " : "quarter"}`}>
													<AnimateLink to={"/news/"+el.id}>
														<div className={`image normal_gap image--hover image--`+el.featured_media.orientation}>
															<div className={"image lazyload image--"+el.featured_media.orientation} data-bgset={el.featured_media.img+'?v=800'}></div>
														</div>
														<div className="uppercase small_gap">{el.categories[0].name}</div>
														<div className="slight_medium normal_bottom flat_bottom--desktop">{el.title.rendered}</div>
													</AnimateLink>
												</div>
											))}
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
		data: state.app.news
	};

}

export default connect(mapStateToProps, { loadNews })(News);	