import React, { Component } from 'react';

class ScrollElement extends Component {
	constructor(props) {
		super(props);
		this.scrollElement = React.createRef();

		var bodyColor = null;
		var treshold = 0;
		var bottomTreshold = 0.4;
		var bodyClass = 0;

		if(props.bodyColor) {
			bodyColor = props.bodyColor;
		}

		if(props.treshold) {
			treshold =  props.treshold;
		}

		if(props.bottomTreshold) {
			bottomTreshold =  props.bottomTreshold;
		}


		this.state = {
			bodyColor: bodyColor,
			treshold: treshold,
			bottomTreshold: bottomTreshold
		};
	}

	componentDidMount() {
		this.handleScroll.bind(this);
		window.addEventListener('scroll', this.handleScroll.bind(this));
	}

	componentDidUpdate() {
		this.handleScroll.bind(this);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll.bind(this));
	}

	handleScroll(e) {
		if(this.scrollElement && this.scrollElement.current) {
			if(this.scrollElement.current.getBoundingClientRect().top < (window.innerHeight * this.state.treshold)) {

				if((this.scrollElement.current.getBoundingClientRect().top+this.scrollElement.current.clientHeight) > 0+(window.innerHeight*this.state.bottomTreshold)){
					this.scrollElement.current.classList.add('visible');
					this.scrollElement.current.classList.remove('invisible');

					if(this.state.bodyColor) {
						document.body.setAttribute('data-body-color',this.state.bodyColor);
					}
				} else {
					this.scrollElement.current.classList.add('invisible');
					this.scrollElement.current.classList.add('visible');
				}

			} else {
				this.scrollElement.current.classList.remove('visible');
				this.scrollElement.current.classList.remove('invisible');
			}
		}
		
	}

  	render() {
		return (
	    	<div ref={this.scrollElement}>
	    		{this.props.children}
	    	</div>
	    )
  	}
}

export default ScrollElement;