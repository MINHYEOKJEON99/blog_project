import { Link } from "react-router-dom";
import classes from "./EditButton.module.css";

const EditButton = () => {
  return (
    <Link to="/edit">
      <button className={classes.floating_action_button}>✏️</button>
    </Link>
  );
};

export default EditButton;
