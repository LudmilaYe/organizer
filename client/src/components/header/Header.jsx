import React from "react";
import style from "./style.module.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import user from "../../assets/user.svg";

const Header = ({ userData }) => {
  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.header__wrapper}>
          <Link to="/">
            <img src={logo} alt="logo" />
            внеучебная деятельность ИАТ
          </Link>

          <nav>
            <ul>
              <li>
                <Link to="/">Направления</Link>
              </li>

              <li>
                <Link to="/events">Мероприятия</Link>
              </li>
            </ul>
          </nav>

          {!userData ? (
            <Link to="/signin">Войти</Link>
          ) : (
            <div className={style.header__user}>
              <Link to="/account">
                <img src={user} alt="user" /> {userData.fullName}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
