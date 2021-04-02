import React, { Component } from 'react';

import DelayLink from '../components/delayLink.js';

class AnimateLink extends Component {

    render() {
    	return (
        	<DelayLink delay={800} onDelayStart={()=> document.body.classList.add('fade-out')} onDelayEnd={()=> document.body.classList.remove('fade-out')} {...this.props}>{this.props.children}</DelayLink>
   		)
  	}
}

export default AnimateLink;