import React, { Component } from 'react';

import AnimateLink from '../components/animateLink.js';
import ScrollElement from "../components/scrollElement.js";
import Icon from '../components/icon.js';

import { connect } from 'react-redux';
import { loadArtworks } from '../actions/index';

import Footer from '../regions/footer.js';

import '../../scss/artworks.scss';


class Artworks extends Component {
	constructor(props) {
		super(props);

		this.state = {
	      loading: false,
	      initialized: false,
	      initFilter: false,
	      filterOpen: false,
	      tagLine: null,
	      filter: {
	      	type: null,
	      	value: null
	      },
	      filterCount: null,
	      search: false
	    }

	    this.list = React.createRef(); 
	    this.filters = React.createRef();
	    this.search = React.createRef();
	    this.searchMobile = React.createRef();

	    this.openFilters = this.openFilters.bind(this);
	    this.closeFilters = this.closeFilters.bind(this);
	    this.randomizeTagLine = this.randomizeTagLine.bind(this);
	    this.searchFilter = this.searchFilter.bind(this);
	    this.setFilter = this.setFilter.bind(this);
	    this.resetSearch = this.resetSearch.bind(this);
	    this.toggleSearch = this.toggleSearch.bind(this);
	}

	componentDidMount(){	
		this.handleScroll.bind(this);
		window.addEventListener('scroll', this.handleScroll.bind(this));


		if(this.props.data === null){
			document.body.classList.add('loading');
			this.props.loadArtworks();
			this.setState({loading: true})

		} else {
			this.randomizeTagLine()
			setTimeout(() =>  this.setState({initalized: true}),20)
		}

	}

	componentDidUpdate(){
		this.handleScroll.bind(this);

		if(this.props.data !== null) {
			document.body.classList.remove('loading');
			if(this.state.loading) {
				this.setState({loading: false})
				setTimeout(() =>  this.setState({initalized: true}),20)
				this.randomizeTagLine()
			}
		}

	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll.bind(this));
	}

	filter(type, value){
		this.setState({initFilter: true});

		const newFilter = {
			type: type,
			value: value
		}
		const filterTop = this.filters.current.getBoundingClientRect().top + window.pageYOffset - 70;
		if(this.state.filterOpen){
			// this.filters.current.scrollIntoView({block: 'start'})
			window.scrollTo({top: filterTop});
		}else{
			// this.filters.current.scrollIntoView({behavior: 'smooth', block: 'start'})
			window.scrollTo({top: filterTop, behavior: 'smooth'});
		}

		this.setState({filterOpen: false});
		this.setState({search: false});

		setTimeout(() =>  this.setFilter(newFilter), 1100)
	}

	setFilter(filter){
		this.setState({initFilter: false, filter: filter});

		var itemCount = 0;
		
		this.props.data.data.map((el,index) => {
			if(this.fitFilter(el)) {
				itemCount++;
			}
		});

		this.setState({filterCount: itemCount});
	}

	searchFilter(e, context) {
		e.preventDefault();
		if(context === 'mobile') {
			this.filter('search', this.searchMobile.current.value);
		}else {
			this.filter('search', this.search.current.value);
		}
		
	}

	resetSearch() {
		this.filter(null, null);
		this.search.current.value = '';
	}

	toggleSearch() {
		this.setState({search: !this.state.search});
		
		if(!this.state.search){
			this.searchMobile.current.focus();
		}
	}

	fitFilter (data, filter) {
		if(this.state.filter.type === null || this.state.filter.value === null){
			return true
		} else if(this.state.filter.type === 'search') {
			if(data.title.rendered.toLowerCase().includes(this.state.filter.value.toLowerCase()) || data['medium'].find((f) => f.name.toLowerCase().includes(this.state.filter.value.toLowerCase())) || data['categories'].find((f) => f.name.toLowerCase().includes(this.state.filter.value.toLowerCase()))  || data['size'].find((f) => f.name.toLowerCase().includes(this.state.filter.value.toLowerCase()))  || data['artist'].find((f) => f.title.rendered.toLowerCase().includes(this.state.filter.value.toLowerCase()))){
				return true
			} else {
				return false
			}
		} else if(data[this.state.filter.type].find((f) => f.name === this.state.filter.value)) {
			return true
		} else {
			return false
		}


	}

	openFilters(){
		this.setState({filterOpen: true});
	}

	closeFilters(){
		this.setState({filterOpen: false});
	}

	scrollToFilters = () => {
		const filterTop = this.filters.current.getBoundingClientRect().top + window.pageYOffset - 70;
		window.scrollTo({top: filterTop, behavior: 'smooth'});

	}

	randomizeTagLine(){
		if(this.props.data.metadata.artworks.intro && this.props.data.metadata.artworks.intro.length > 0){
			const index = Math.floor(Math.random() * this.props.data.metadata.artworks.intro.length);
			this.setState({tagLine: this.props.data.metadata.artworks.intro[index]});
		}
	}

	handleScroll(e) {
		if(this.list && this.list.current) {
			if(this.list.current.offsetHeight < window.innerHeight*2){
				return;
			}
			if(this.list.current.getBoundingClientRect().top < (window.innerHeight * 0.4)) {

				if((this.list.current.getBoundingClientRect().top+this.list.current.clientHeight) > 0+(window.innerHeight*0.4)){
					this.list.current.classList.add('list-scroll');
				} else {
					this.list.current.classList.remove('list-scroll');
				}

			} else {
				this.list.current.classList.remove('list-scroll');
			}
		}
		
	}

	render(){
		return (
			<div className={`page ${this.state.initalized > 0 ? "page--initialized" : ""}`}>
				{this.props.data !== null ? (
						<div className={'artwork '+(this.state.search ? 'search' : '')}>
							<ScrollElement bodyColor="white">
								<section className="red artworks__intro-container">
									<div className="container">
										<div className="huge left-right-left-center artworks__intro" dangerouslySetInnerHTML={{ __html: this.state.tagLine}}></div>
									</div>
								</section>
								{this.props.data.metadata.filters !== null ? (
									<div className={"artworks__filters "+(this.state.filterOpen ? 'open' : '')} ref={this.filters}>
										<div className="artworks__filters__toggler" onClick={this.openFilters}>Filter artworks</div>
										<div className="artworks__filters__inner">
											<div className="hide_desktop medium_bottom">
												<div className="artworks__filters__close" onClick={this.closeFilters}>
								      				<span></span>
								      				<span></span>
								      			</div>
								      			Filter artworks
							      			</div>
											<div className="container">
												<div className="grid grid--top">
													{this.props.data.metadata.filters.categories &&  this.props.data.metadata.filters.categories.length > 0 ? (
														<div className="col col--quarter col--full--mobile">
															<div className="artworks__drop">
																<div className="artworks__drop__label">
																	<span>Categories</span>
																	<div className="artworks__drop__label__arrow">
																		<span></span>
																		<span></span>
																	</div>
																</div>
																<div className="artworks__drop__val">
																	{this.state.filter.type !== null && this.state.filter.type == 'categories' ? (
																		<span>{this.state.filter.value}</span>
																	):(
																		<span>All</span>
																	)}
																</div>
																<ul>
																	{this.props.data.metadata.filters.categories.map((el,index) => (
																		<li key={index} onClick={()=> this.filter('categories', el.name)} className={(this.state.filter.type === 'categories' && this.state.filter.value === el.name ? 'active' : '')}>{el.name}</li>
																	))}
																	<li className={(this.state.filter.type !== 'categories' ? 'active' : '')} onClick={()=> this.filter(null, null)}>All</li>
																</ul>
															</div>
														</div>
													):("")}
													{this.props.data.metadata.filters.sizes &&  this.props.data.metadata.filters.sizes.length > 0 ? (
														<div className="col col--quarter col--full--mobile">
															<div className="artworks__drop">
																<div className="artworks__drop__label">
																	<span>Sizes</span>
																	<div className="artworks__drop__label__arrow">
																		<span></span>
																		<span></span>
																	</div>
																</div>
																<div className="artworks__drop__val">
																	{this.state.filter.type !== null && this.state.filter.type == 'size' ? (
																		<span>{this.state.filter.value}</span>
																	):(
																		<span>All</span>
																	)}
																</div>
																<ul>
																	{this.props.data.metadata.filters.sizes.map((el,index) => (
																		<li key={index} onClick={()=> this.filter('size', el.name)} className={(this.state.filter.type === 'size' && this.state.filter.value === el.name ? 'active' : '')}>{el.name}</li>
																	))}
																	<li className={(this.state.filter.type !== 'size' ? 'active' : '')} onClick={()=> this.filter(null, null)}>All</li>
																</ul>
															</div>
														</div>
													):("")}
													{this.props.data.metadata.filters.media &&  this.props.data.metadata.filters.media.length > 0 ? (
														<div className="col col--quarter col--full--mobile">
															<div className="artworks__drop">
																<div className="artworks__drop__label">
																	<span>Medium</span>
																	<div className="artworks__drop__label__arrow">
																		<span></span>
																		<span></span>
																	</div>
																</div>
																<div className="artworks__drop__val">
																	{this.state.filter.type !== null && this.state.filter.type == 'medium' ? (
																		<span>{this.state.filter.value}</span>
																	):(
																		<span>All</span>
																	)}
																</div>
																<ul>
																	{this.props.data.metadata.filters.media.map((el,index) => (
																		<li key={index} onClick={()=> this.filter('medium', el.name)} className={(this.state.filter.type === 'medium' && this.state.filter.value === el.name ? 'active' : '')}>{el.name}</li>
																	))}
																	<li className={(this.state.filter.type !== 'medium' ? 'active' : '')} onClick={()=> this.filter(null, null)}>All</li>
																</ul>
															</div>
														</div>
													):("")}
													<div className="col col--quarter col--full--mobile hide_mobile">
														<form className="artworks__search-form" onSubmit={this.searchFilter}>
															<input type="text" placeholder="Search" ref={this.search} />
															<button onClick={this.searchFilter}>
																<Icon icon="search"/>
															</button>
														</form>
													</div>
												</div>
											</div>
										</div>
										<div className="hide_desktop artworks__search">
							      			<div className="medium_bottom">
												<div className="artworks__search__close" onClick={this.toggleSearch}>
								      				<span></span>
								      				<span></span>
								      			</div>
								      			Search
							      			</div>
											<form className="artworks__search-form" onSubmit={(e)=> this.searchFilter(e,'mobile')}>
												<input type="text" placeholder="Search" ref={this.searchMobile} />
												<button onClick={(e)=> this.searchFilter(e,'mobile')}>
													<Icon icon="search"/>
												</button>
											</form>
										</div>
										<div className="hide_desktop text-center slight small_top" onClick={this.toggleSearch}>
											<span className="small_right">
												{this.state.filter.type !== null && this.state.filter.type == 'search' ? (
													<span>{this.state.filter.value}</span>
												):(
													<span>Search</span>
												)}
											</span>
											<Icon icon="search"/>
										</div>
									</div>
								):("")}
								<section className={"artworks__list section--fit red text-center medium_top--padded "+(this.state.initFilter ? 'artworks__list--loading' : '')} ref={this.list}>
									<div className="container">
										<div className="artworks__top" onClick={this.scrollToFilters}>Back to top <Icon icon="arrow-top"/></div>
										<div className="grid grid--guttered grid--stretch">
											{this.props.data.data.map((el,index) => {
												if(this.fitFilter(el)){
													return (
														<div key={index} className="col col--third col--full--mobile">
															<div className="artwork">
																
																<div className="artwork__image normal_gap">
																	<AnimateLink to={"/artworks/"+el.id}>
																		<div className={`image image--hover ${el.second_featured_media.orientation === 'vertical' ? "image--narrow--mobile " : ""}image--`+el.second_featured_media.orientation}>
																			<div className={`image lazyload image--`+el.second_featured_media.orientation}  data-bgset={el.second_featured_media.img+'?v=800'}></div>
																		</div>
																	</AnimateLink>
																</div>
																
																<div>
																	<h2 className="slight">
																		<AnimateLink to={"/artworks/"+el.id}><span>{el.title.rendered}</span></AnimateLink><br/>
																		{el.artist && el.artist.length > 0 ? (
																			<span className="base">
																				<span className="body_font">by </span>
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
																			</span>
																		):("")}
																	</h2>
																</div>
															</div>
														</div>
													)
												}
											})}
											{this.state.filter.value !== null &&  this.state.filterCount == 0 ? (
												<div className="artwork__no-results col">
													<p className="medium normal_gap">No results</p>
													<button className="slight" onClick={this.resetSearch}>Reset Search</button>
												</div>
											):("")}
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
		data: state.app.artworks
	};

}

export default connect(mapStateToProps, { loadArtworks })(Artworks);