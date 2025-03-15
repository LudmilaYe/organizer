import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

const StudentsApplications = ({ userData }) => {
  const [applications, setApplications] = useState(null);
  const [loadingApplications, setLoadingApplications] = useState(false);

  useEffect(() => {
    const getStudentApplications = async () => {
      try {
        setLoadingApplications(true);
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/event/get-user-applications`
        );
        setLoadingApplications(false);

        if (response.status === 200) {
          setApplications(response.data);
        }
      } catch (error) {
        setLoadingApplications(false);
        // alert(`Произошла ошибка: ${error.response.data.message}`);
        console.error("Ошибка загрузки файла:", error);
      }
    };

    getStudentApplications();
  }, []);

  const accept = async (eventId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/event/add-to-members`,
        {
          eventId: eventId,
          userId: userData._id,
        }
      );

      if (response.status === 200) {
        alert("Приглашение успешно принято!");
        window.location.reload();
      } else {
        alert("Не удалось принять приглашение");
      }
    } catch (error) {
      alert(`Произошла ошибка: ${error.response.data.message}`);
      console.error("Ошибка загрузки файла:", error);
    }
  };

  return (
    <div className={style.admins_directing}>
      <div className="container">
        <div
          className={`${style.admins_directing__wrapper} ${style.admins_directing__wrapper_2}`}
        >
          <h3>Вас пригласили:</h3>
          {loadingApplications ? (
            <p>Загрузка мероприятий...</p>
          ) : (
            applications && (
              <ul>
                {applications.map(
                  ({ name, description, _id, start, finish }) => (
                    <li key={_id}>
                      <Link to={`/event/${_id}`}>
                        <h3>{name}</h3>
                        <p>
                          {description.length > 200
                            ? `${description.slice(0, 200)}...`
                            : description}
                        </p>

                        <p>
                          {start} - {finish}
                        </p>
                      </Link>

                      <button onClick={() => accept(_id)}>Принять</button>
                    </li>
                  )
                )}
              </ul>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentsApplications;
