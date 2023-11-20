import { Link } from "react-router-dom";

import classes from "./Pagination.module.css";

const Paginaition = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  //페이지 넘버를 설정하기 위한 로직
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={classes.pagination}>
        {pageNumbers.map((number) => (
          <li key={number} className={classes.pageItem}>
            <Link onClick={() => paginate(number)} className={classes.pageLink}>
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginaition;
