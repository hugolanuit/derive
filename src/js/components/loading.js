import React, { Component } from 'react';

import Icon from '../components/icon.js';

class Loading extends Component {

    render() {
    	return (
        	<div className="loader">
        		<Icon icon="loader" />
        	</div>
   		)
  	}
}

export default Loading;