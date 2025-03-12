import React, { useState } from "react";
import style from "./style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/login`,
        {
          email,
          password,
        }
      );
      if (res.status === 200) {
        localStorage.setItem("token", res?.data?.token);
      }
      alert("Вы успешно вошли!");
      navigate("/");
    } catch (error) {
      alert(`Произошла ошибка: ${error.response.data.message}`);
      console.log(error);
    }
  };

  return (
    <section className={style.signin}>
      <div className="container">
        <div className={style.signin__wrapper}>
          <h1>ОРГАНИЗАТОР</h1>

          <form>
            <input
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="E-mail"
            />
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Пароль"
            />
          </form>

          <div className={style.signin__links}>
            <p>
              Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
            </p>
            <Link to="/forgot-password">Забыли пароль?</Link>
          </div>

          <button onClick={submitForm}>Войти</button>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
