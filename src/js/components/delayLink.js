import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useHistory, useLocation } from "react-router-dom";

// Functional link component which delays page navigation
export const DelayLink = props => {
  const { delay, onDelayStart, onDelayEnd, replace, to, disableDragClick, ...rest } = props;
  let timeout = null;
  let history = useHistory();
  let location = useLocation();
  // var clientXonMouseDown = null;
  // var clientYonMouseDown = null;

  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timeout]);

  const handleClick = (e, props) => {
    // if trying to navigate to current page stop everything

    onDelayStart(e, to);
    if (e.defaultPrevented) {
      return;
    }

    e.preventDefault();

    timeout = setTimeout(() => {
      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
      onDelayEnd(e, to);
    }, delay);
  };

  return <Link {...rest} to={to} onClick={handleClick} />;
};

// const handleOnMouseDown = e => {
//   clientYonMouseDown =  e.clientY;
//   clientXonMouseDown = e.clientX;
//   e.preventDefault(); // stops weird link dragging effect
// }

DelayLink.propTypes = {
  // Milliseconds to wait before registering the click.
  delay: PropTypes.number,
  // Called after the link is clicked and before the delay timer starts.
  onDelayStart: PropTypes.func,
  // Called after the delay timer ends.
  onDelayEnd: PropTypes.func,
  // Replace history or not
  replace: PropTypes.bool,
  disableDragClick: PropTypes.bool,
  // Link to go to
  to: PropTypes.string
};

DelayLink.defaultProps = {
  replace: false,
  delay: 0,
  disableDragClick: false,
  onDelayStart: () => {},
  onDelayEnd: () => {}
};

export default DelayLink;