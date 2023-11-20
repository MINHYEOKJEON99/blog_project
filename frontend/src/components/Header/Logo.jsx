import { Link } from "react-router-dom";
import classes from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={classes.logo}>
      <Link to="/">MINHYEOK BLOG</Link>
    </div>
  );
};

export default Logo;
