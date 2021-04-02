import React, { useEffect } from 'react';

import ReactDOMServer from "react-dom/server";

import Header from './header.js';
import Content from './content.js';
import Loading from '../components/loading.js';

import 'lazysizes';
import 'lazysizes/plugins/bgset/ls.bgset';

function Main() {

  return (
    	<div className="main">
        	<Header />
          <div>
            <Content />
          </div>
          <Loading />
      </div>
  );
}

export default Main;