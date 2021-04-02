import React, { Component } from 'react';

class Icon extends Component {
  render() {
  	if(this.props.icon === 'arrow'){
		return (
	    	<svg className="icon icon--arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.666 10.699">
				  <g transform="translate(-950.5 -1148.145)">
				    <line x2="47.5" transform="translate(950.5 1153.5)" fill="none" stroke="currentColor" strokeWidth="1"/>
				    <path d="M192.157,58.356l5.138,5.138-5.138,5.138" transform="translate(800.447 1090.001)" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1"/>
				  </g>
			</svg>
	    )
	} else if(this.props.icon === 'arrow-down'){
		return (
	    	<svg className="icon" viewBox="0 0 286 166">
			    <g>
			        <g>
			            <path d="M286,23 C286,26 285,28 283,30 L150,163 C148,165 145,166 143,166 C141,166 138,165 136,163 L3,30 C1,28 0,26 0,23 C0,21 1,19 3,17 L18,2 C19,1 22,0 24,0 C27,0 29,1 31,2 L143,115 L255,2 C257,1 259,0 262,0 C264,0 267,1 268,2 L283,17 C285,19 286,21 286,23 Z" id="Path"></path>
			        </g>
			    </g>
			</svg>
	    )
	} else if(this.props.icon === 'arrow-top'){
		return (
	    	<svg className="icon" viewBox="0 0 286 166">
			    <g>
			        <g transform="translate(143.000000, 83.000000) rotate(-180.000000) translate(-143.000000, -83.000000) ">
			            <path d="M286,23 C286,26 285,28 283,30 L150,163 C148,165 145,166 143,166 C141,166 138,165 136,163 L3,30 C1,28 0,26 0,23 C0,21 1,19 3,17 L18,2 C19,1 22,0 24,0 C27,0 29,1 31,2 L143,115 L255,2 C257,1 259,0 262,0 C264,0 267,1 268,2 L283,17 C285,19 286,21 286,23 Z" id="Path"></path>
			        </g>
			    </g>
			</svg>
	    )
	} else if(this.props.icon === 'loader'){
		return (
	    	<svg className="icon" viewBox="0 0 91 118">
			  	<g transform="translate(-42.619 -41.453)">
			    	<path d="M45,59c-12.019,0-23.32-5.26-31.821-14.812A53.548,53.548,0,0,1,0,8.433,57.445,57.445,0,0,1,.624,0H89.378A57.3,57.3,0,0,1,90,8.433,53.557,53.557,0,0,1,76.821,44.188C68.32,53.74,57.021,59,45,59Z" transform="translate(42.619 41.453)" fill="currentColor"/>
			    	<path d="M45,59c-12.019,0-23.32-5.26-31.821-14.812A53.548,53.548,0,0,1,0,8.433,57.445,57.445,0,0,1,.624,0H89.378A57.3,57.3,0,0,1,90,8.433,53.557,53.557,0,0,1,76.821,44.188C68.32,53.74,57.021,59,45,59Z" transform="translate(133.619 159.452) rotate(180)" fill="currentColor"/>
			  	</g>
			</svg>
	    )
	} else if(this.props.icon === 'search'){
		return (
			<svg className="icon" viewBox="0 0 13.642 13.645">
			  <g transform="translate(-1189 -113)">
			    <g transform="translate(1189 113)" fill="#fff" stroke="currentColor" strokeWidth="0.6">
			      <circle cx="5.373" cy="5.373" r="5.373" stroke="none"/>
			      <circle cx="5.373" cy="5.373" r="5.073" fill="none"/>
			    </g>
			    <path d="M.9.951l4.607,4.54" transform="translate(1196.92 120.941)" fill="none" stroke="currentColor" strokeWidth="0.6"/>
			  </g>
			</svg>
	    )
	} else if(this.props.icon === 'pause'){
		return (
			<svg className="icon" viewBox="0 0 6 11">
			  <g transform="translate(161 1519)">
			    <rect width="2" height="11" transform="translate(-161 -1519)" fill="currentColor"/>
			    <rect width="2" height="11" transform="translate(-157 -1519)" fill="currentColor"/>
			  </g>
			</svg>
	    )
	} else if(this.props.icon === 'play'){
		return (
			<svg className="icon" viewBox="0 0 10 12">
			    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
			        <g transform="translate(0.000000, -6.000000)" fill="currentColor" fillRule="nonzero">
			            <polygon points="0.223 6.771 9.733 11.955 0.223 17.139"></polygon>
			        </g>
			    </g>
			</svg>
	    )
	}
  }
}

export default Icon;