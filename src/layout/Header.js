import React from "react";
import classes from "./Header.module.css";

const Header = (props) => {
  return <div className={classes.container}>{props.children}</div>;
};

export default Header;
