import React, { useEffect, useState, useCallback } from "react";
import style from "./style.module.scss";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

const Main = () => {
  const [directings, setDirectings] = useState([]);
  const [loadingDirecting, setLoadingDirecting] = useState(true);

  const fetchDirectings = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/directing/get-all-directing`
      );
      setDirectings(response.data);
    } catch (error) {
      alert(`Произошла ошибка: ${error.response?.data?.message || error.message}`);
      console.error(error);
    } finally {
      setLoadingDirecting(false);
    }
  }, []);

  useEffect(() => {
    fetchDirectings();
  }, [fetchDirectings]);

  return (
    <section className={style.main}>
      <div className="container">
        <div className={style.main__wrapper}>
          {loadingDirecting ? (
            <p>Загрузка направлений...</p>
          ) : (
            <ul className={style.main__list}>
              {directings.map(({ name, imagePath, _id }) => (
                <li key={_id}>
                  <Link to={`/directing/${_id}`}>
                    <img
                      src={`${process.env.REACT_APP_SERVER_URL}${imagePath}`}
                      alt={name}
                    />
                    <div className={style.main__name}>
                      <h3>{name}</h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default Main;
