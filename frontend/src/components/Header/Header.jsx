import Logo from "./Logo";
import MainMenu from "./MainMenu";

import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <Logo logo={classes.logo} />
      <nav className={classes.main_nav}>
        <MainMenu />
      </nav>
    </header>
  );
};

export default Header;
