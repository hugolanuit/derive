import React, { Component } from 'react';

import Icon from '../components/icon.js';
import ScrollElement from "../components/scrollElement.js";

import '../../scss/footer.scss';

class Header extends Component {
  render() {
    return (
    	<ScrollElement bodyColor="bourgogne" treshold={0.2}>
    		{this.props.contact !== false ? (
	      	<section className="text-center medium_top">
				<div className="container">
					<a href="mailto:info@derive.art" className="big hover--red">Write to us <Icon icon="arrow"/></a>
				</div>
			</section>
			):("")}
			<footer>
				<div className="container">
					<div className="grid grid--guttered text-center">
						<div className="col col--third col--full--mobile slight text-left--desktop">
							<span className="alternate_font">Business Inquiries</span><br/>
							<a href="mailto:mailto:info@derive.art" className="hover--red">info@derive.art</a>
						</div>
						<div className="col col--third col--full--mobile slight">
							<span className="alternate_font">All right reserved ©2020</span><br/>
							<span className="uppercase base">Crédit</span>
						</div>
						<div className="col col--third col--full--mobile slight text-right--desktop">
							<nav className="nav--center nav--right--desktop nav--tight">
								<ul>
									<li>
										<a className="hover--red" href="https://instagram.com">
											<svg className="icon" viewBox="0 0 512 512">
									          <path d="m152 511c-30-1-59-7-85-23-33-20-54-51-61-90-4-23-5-47-6-71 0-50 0-101 1-152 0-27 1-54 10-79 17-50 52-80 103-90 23-4 47-5 70-6 51 0 102 0 153 1 27 0 53 1 79 10 50 17 80 52 90 103 4 23 5 47 6 71 0 50 0 101-1 152 0 27-1 54-10 79-17 50-52 80-103 90-23 4-47 5-70 6-24 1-141 0-176-1m314-259c0-20 0-41 0-61-1-19-2-39-4-58-4-43-30-73-72-81-23-4-47-5-70-5-43-1-85-1-128 0-22 0-44 1-66 4-37 6-62 27-72 64-4 11-6 24-6 36-1 46-2 93-2 139 1 30 1 59 4 89 4 43 30 73 72 81 23 4 47 5 70 5 43 1 85 1 128 1 20-1 39-2 59-4 18-2 35-7 50-19 24-19 33-45 34-74 2-39 3-117 3-117m-210 135c-73 0-131-58-131-132 0-73 59-131 133-130 72 0 130 59 129 133 0 71-59 129-131 129m0-46c47 0 85-38 85-85 0-47-38-85-85-85-47 0-85 38-85 85 0 47 38 85 85 85m137-252c17 0 31 13 30 31 0 17-14 31-31 30-17 0-31-14-30-31 0-17 14-30 31-30"/>
									        </svg>
										</a>
									</li>
									<li>
										<a className="hover--red" href="https://facebook.com">
											<svg className="icon" viewBox="0 0 512 512">
									          <path d="m384 3l0 76-45 0c-17 0-28 3-33 10-6 7-9 17-9 31l0 54 84 0-11 85-73 0 0 216-87 0 0-216-73 0 0-85 73 0 0-62c0-36 10-63 29-83 20-19 47-29 80-29 28 0 49 1 65 3z"/>
									        </svg>
										</a>
									</li>
									<li>
										<a className="hover--red" href="https://twitter.com">
											<svg className="icon" viewBox="0 0 20 20"><path d="M19.551 4.208q-.815 1.202-1.956 2.038 0 .082.02.255t.02.255q0 1.589-.469 3.179t-1.426 3.036-2.272 2.567-3.158 1.793-3.963.672q-3.301 0-6.031-1.773.571.041.937.041 2.751 0 4.911-1.671-1.284-.02-2.292-.784T2.456 11.85q.346.082.754.082.55 0 1.039-.163-1.365-.285-2.262-1.365T1.09 7.918v-.041q.774.408 1.773.448-.795-.53-1.263-1.396t-.469-1.864q0-1.019.509-1.997 1.487 1.854 3.596 2.924T9.81 7.184q-.143-.509-.143-.897 0-1.63 1.161-2.781t2.832-1.151q.815 0 1.569.326t1.284.917q1.345-.265 2.506-.958-.428 1.386-1.732 2.18 1.243-.163 2.262-.611z"/></svg>
										</a>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</footer>
		</ScrollElement>
    );
  }
}

export default Header;