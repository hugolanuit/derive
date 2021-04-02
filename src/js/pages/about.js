import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ScrollElement from "../components/scrollElement.js";

import { connect } from 'react-redux';
import { loadAbout } from '../actions/index';

import Footer from '../regions/footer.js';


import '../../scss/about.scss';

class About extends Component {
	constructor(props) {
		super(props);

		this.state = {
	      loading: false,
	      initialized: false
	    }
	}

	componentDidMount(){
		if(this.props.data === null){
			document.body.classList.add('loading');
			this.props.loadAbout();

		} else {
			setTimeout(() =>  this.setState({initalized: true}),20)
		}

	}

	componentDidUpdate(){
		if(this.props.data !== null) {
			document.body.classList.remove('loading');
			setTimeout(() =>  this.setState({initalized: true}),20)
		}

	}

	render(){
		return (
			<div className={`page ${this.state.initalized > 0 ? "page--initialized" : ""}`}>
				{this.props.data !== null ? (
					<div className="about">
						<ScrollElement bodyColor="white">
						<section className="red">
							<div className="container text-center">
								<div className="slight slight_medium--desktop uppercase normal_gap" dangerouslySetInnerHTML={{ __html: this.props.data.content.founders.intro['sub_title']}}></div>
								<h1 className="huge left-right-center about__intro" dangerouslySetInnerHTML={{ __html: this.props.data.content.founders.intro.title}}></h1>
							</div>
						</section>
						</ScrollElement>
						{this.props.data.content.blocks.map((el,index) => (
							<ScrollElement key={index} bodyColor={el.color}>
								<section className="section--tall">
									<div className="container container--medium text-center about__text" dangerouslySetInnerHTML={{ __html: el.content}}></div>
								</section>
							</ScrollElement>
						))}
						<ScrollElement bodyColor={this.props.data.content.founders.intro.color} treshold={0.7}>
						<section>
							<div className="container container--narrower text-center">
								<h2 className="medium" dangerouslySetInnerHTML={{ __html: this.props.data.content.founders.intro.text}}></h2>
							</div>
						</section>
						</ScrollElement>
						<ScrollElement bodyColor="white" treshold={0.5}>
							<section className="section--fit red about__founders huge_top--padded flat_top--padded--desktop">
								<div className="container container--bleed-right">
									<div className="hide_mobile">
										<div className="grid grid--top grid--thick_guttered">
											<div className="col col--two-thirds">
												<div className="image image--horizontal medium_gap lazyload" data-bgset={this.props.data.content.founders.blocks[0].portrait.img+'?v=800 [(max-width: 600px)] | '+this.props.data.content.founders.blocks[0].portrait.img+'?v=1400'}></div>
											</div>
											<div className="col col--third">
												<div className="big_top flat_top--desktop image medium_gap lazyload" data-bgset={this.props.data.content.founders.blocks[1].portrait.img+'?v=800 [(max-width: 600px)] | '+this.props.data.content.founders.blocks[1].portrait.img+'?v=800'}></div>
											</div>
										</div>
									</div>
									<div className="grid grid--top grid--thick_guttered">
										<div className="col col--two-thirds col--full--mobile">
											<div className="image image--horizontal medium_gap hide_desktop lazyload" data-bgset={this.props.data.content.founders.blocks[0].portrait.img+'?v=800'}></div>
											<div className="bleed_left about__founders__desc">
												<h3 className="alternate_font medium_large">{this.props.data.content.founders.blocks[0].name}</h3>
												<p className="uppercase normal_top">{this.props.data.content.founders.blocks[0].title}</p>
												<div className="text_display normal_top" dangerouslySetInnerHTML={{ __html: this.props.data.content.founders.blocks[0].description}}></div>
											</div>
										</div>
										<div className="col col--third col--full--mobile">
											<div className="big_top flat_top--desktop image medium_gap hide_desktop lazyload" data-bgset={this.props.data.content.founders.blocks[1].portrait.img+'?v=800'}></div>
											<div className="medium_left flat_left--desktop about__founders__desc">
												<h3 className="alternate_font medium_large">{this.props.data.content.founders.blocks[1].name}</h3>
												<p className="uppercase normal_top">{this.props.data.content.founders.blocks[1].title}</p>
												<div className="text_display normal_top" dangerouslySetInnerHTML={{ __html: this.props.data.content.founders.blocks[1].description}}></div>
											</div>
										</div>
									</div>
								</div>
							</section>
						</ScrollElement>
						<Footer/>
					</div>
				):("")}
			</div>
		);
	}
}

function mapStateToProps(state){
	return { 
		data: state.app.about
	};

}

export default connect(mapStateToProps, { loadAbout })(About);