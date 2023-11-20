import { useState } from "react";
import classes from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../store/login-slice";

const ID = "jmh";
const PWD = "1234";

const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLogged);
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const idChangeHandler = (event) => {
    setId(event.target.value);
  };
  const pwdChangeHandler = (event) => {
    setPwd(event.target.value);
  };

  const loginHandler = (event) => {
    event.preventDefault();

    if (id !== ID && pwd !== PWD) {
      alert("아이디와 비밀번호를 확인해주세요");
      return;
    }

    dispatch(loginAction.loginHandler());
  };

  //로그인과 로그아웃했을때 조건부 렌더링
  let content = isLoggedIn ? (
    <h1>로그인 되었습니다.</h1>
  ) : (
    <form className={classes.joinForm} onSubmit={loginHandler}>
      <h2>로그인</h2>
      <div className={classes.textForm}>
        <input
          name="id"
          type="text"
          className={classes.value}
          onChange={idChangeHandler}
          placeholder="아이디"
          value={id}
        />
      </div>
      <div className={classes.textForm}>
        <input
          name="password"
          type="password"
          className={classes.value}
          placeholder="비밀번호"
          onChange={pwdChangeHandler}
          value={pwd}
        />
      </div>

      <input className={classes.submitBtn} type="submit" value="LOGIN" />
    </form>
  );
  return <div className={classes.container}>{content}</div>;
};
export default Login;
