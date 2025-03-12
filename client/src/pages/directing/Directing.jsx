import React, { useEffect, useState, useCallback } from "react";
import style from "./style.module.scss";
import { Link, useParams } from "react-router-dom";
import axios from "../../utils/axios";

const Directing = ({ userData }) => {
  const [directing, setDirecting] = useState(null);
  const [loadingDirecting, setLoadingDirecting] = useState(false);
  const { id } = useParams();

  const fetchDirecting = useCallback(async () => {
    setLoadingDirecting(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/directing/get-directing/${id}`
      );
      setDirecting(response.data);
    } catch (error) {
      alert(`Произошла ошибка: ${error.response?.data?.message || error.message}`);
      console.error(error);
    } finally {
      setLoadingDirecting(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDirecting();
  }, [fetchDirecting]);

  return (
    <div className={style.directing}>
      <div className={style.directing__wrapper}>
        {loadingDirecting ? (
          <p>Загрузка...</p>
        ) : (
          directing && (
            <>
              <div
                className={style.directing__head}
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_SERVER_URL}${directing.imagePath})`,
                }}
              >
                <div className="container">
                  <div className={style.head__wrapper}>
                    <h2>{directing.name}</h2>
                    <p>{directing.description}</p>

                    {userData?.role === "Студент" && (
                      <button>Записаться</button>
                    )}

                    {userData &&
                      (["Администратор", "Организатор"].includes(userData.role) ||
                        directing.admins.includes(userData._id)) && (
                        <Link to={`/admin-directing/${id}`}>Управлять</Link>
                      )}
                  </div>
                </div>
              </div>

              <div className={style.directing__about}>
                <div className="container">
                  <div className={style.directing__about__wrapper}>
                    <div className={style.directing__about__text}>
                      <h3>О направлении</h3>
                      <p>{directing.secondDescription}</p>
                    </div>

                    <img
                      src={`${process.env.REACT_APP_SERVER_URL}${directing.secondImagePath}`}
                      alt="second image"
                    />
                  </div>
                </div>
              </div>

              <div className={style.directing__gallery}>
                <div className="container">
                  <div className={style.directing__gallery__wrapper}>
                    <h3>Галлерея</h3>

                    <ul>
                      {directing.gallery.map((imagePath) => (
                        <li key={imagePath}>
                          <img
                            src={`${process.env.REACT_APP_SERVER_URL}${imagePath}`}
                            alt="image"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Directing;
