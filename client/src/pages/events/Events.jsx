import React, { useState, useEffect } from "react";
import style from "./style.module.scss";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState(null);
  const [loadingEvents, setLoadingEvents] = useState(false);

  useEffect(() => {
    const getEvents = async () => {
      try {
        setLoadingEvents(true);
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/event/getAll`
        );

        if (response.status === 200) {
          setEvents(response.data);
          setLoadingEvents(false);
          return;
        }
      } catch (err) {
        setLoadingEvents(false);
        console.log(err);
        alert(`Произошла ошибка: ${err.response.data.message}`);
      }
    };

    getEvents();
  }, []);

  return (
    <section className={style.events}>
      <div className="container">
        <div className={style.events__wrapper}>
          <h1>Мероприятия</h1>

          {loadingEvents
            ? "Загрузка"
            : events && (
                <ul>
                  {events.map((item) => (
                    <li key={item._id}>
                      <Link to={`/event/${item._id}`}>
                        <img
                          src={`${process.env.REACT_APP_SERVER_URL}${item.imagePath}`}
                          alt={item.name}
                        />
                        <div className={style.events__item__text}>
                          <h3>{item.name}</h3>
                          <p>Начало: {item.start}</p>
                          <p>Конец: {item.finish}</p>
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

export default Events;
