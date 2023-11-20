import { Link } from "react-router-dom";
import classes from "./MainMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../store/login-slice";

const MainMenu = () => {
  const isLoggedIn = useSelector((state) => state.login.isLogged);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(loginAction.loginHandler());
  };
  return (
    <ul className={classes.list}>
      <li className={classes.list__item}>
        <Link to="/">Home</Link>
      </li>
      <li className={classes.list__item}>
        <Link to="/about">About</Link>
      </li>
      <li className={classes.list__item}>
        {!isLoggedIn ? (
          <Link to="/login">Login</Link>
        ) : (
          <Link to="/login" onClick={logoutHandler}>
            Logout
          </Link>
        )}
      </li>

      <li className={classes.list__item}>
        <Link to="/search">Search</Link>
      </li>
    </ul>
  );
};

export default MainMenu;
