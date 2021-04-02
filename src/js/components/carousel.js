import React, { Component } from 'react';
import Slider from "react-slick";

class Carousel extends Component {

  render() {
	return (
    	<Slider className={this.props.className} {...this.props.settings}>
    		{this.props.children}
    	</Slider>
    )
  }
}

export default Carousel;