/** @format */

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { checkAuthenticated, load_user } from "../actions/auth";
import store from "../store";

const Layout = (props) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        store.dispatch(load_user());
        store.dispatch(checkAuthenticated());
      } catch (err) {}
    };

    fetchData();
  }, []);

  return <div>{props.children}</div>;
};

export default connect(null, { checkAuthenticated, load_user })(Layout);
