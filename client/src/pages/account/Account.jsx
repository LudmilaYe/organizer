import React from "react";
import style from "./style.module.scss";
import { Link } from "react-router-dom";

const Account = ({ userData }) => {
  return (
    <section className={style.account}>
      <div className="container">
        <div className={style.account__wrapper}>
          <div className={style.account__links}>
            {(userData.role.toLowerCase() === "Организатор" ||
              userData.role.toLowerCase() === "администратор") && (
              <Link to="/create-directing">Создание направления</Link>
            )}
          </div>

          <h3>
            {userData.role.toLowerCase() === "студент"
              ? "Студент"
              : userData.role.toLowerCase() === "организатор"
              ? "Организатор воспитательног отдела"
              : userData.role.toLowerCase() === "руководитель в.о."
              ? "руководителя воспитательного отдела"
              : userData.role.toLowerCase() === "руководитель направления"
              ? "Руководитель направления"
              : "Администратор"}
          </h3>

          <p>{userData.fullName}</p>
        </div>
      </div>
    </section>
  );
};

export default Account;
