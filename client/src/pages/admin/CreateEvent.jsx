import axios from "../../utils/axios";
import React, { useState, useEffect } from "react";
import style from "./style.module.scss";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";

const CreateEvent = ({ userData }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mainImagePath, setMainImagePath] = useState(null);
  const [dateStart, setDateStart] = useState("");
  const [dateFinish, setDateFinish] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeFinish, setTimeFinish] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (
      !(
        userData.role.toLowerCase() === "руководитель направления" ||
        userData.role.toLowerCase() === "организатор" ||
        userData.role.toLowerCase() === "руководитель в.о." ||
        userData.role.toLowerCase() === "администратор"
      )
    ) {
      navigate("/");
    }
  }, [userData]);

  const uploadImage = async (acceptedFiles, setImagePath) => {
    const formData = new FormData();
    formData.append("image", acceptedFiles[0]);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/upload`,
        formData
      );

      setImagePath(response.data.path);
    } catch (error) {
      alert(`Произошла ошибка: ${error.response.data.message}`);
      console.error("Ошибка загрузки файла:", error);
    }
  };

  const onDropMain = (acceptedFiles) =>
    uploadImage(acceptedFiles, setMainImagePath);

  const { getRootProps: getRootPropsMain, getInputProps: getInputPropsMain } =
    useDropzone({ onDrop: onDropMain });

  const createEvent = async () => {
    try {
      const directing = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/event/create`,
        {
          name: name,
          description: description,
          imagePath: mainImagePath,
          start: `${dateStart}, ${timeStart}`,
          finish: `${dateFinish}, ${timeFinish}`,
        }
      );

      if (directing.status === 200) {
        alert("Мероприятие успешно создано!");
        navigate("/events");
      }
    } catch (error) {
      console.log(error);
      alert(`Произошла ошибка: ${error.response.data.message}`);
    }
  };

  return (
    <section className={style.create_direction}>
      <div className="container">
        <div className={style.create_direction__wrapper}>
          <h1>Создание мероприятия</h1>

          <form>
            <input
              type="text"
              onChange={(event) => setName(event.target.value)}
              placeholder="Название направления"
            />
            <textarea
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Описание"
            />

            <div>
              <p>Дата начала</p>
              <InputMask
                mask="99.99.9999"
                placeholder="ДД.ММ.ГГГГ"
                value={dateStart}
                onChange={(event) => setDateStart(event.target.value)}
              />
            </div>

            <div>
              <p>Время начала</p>
              <InputMask
                mask="99:99"
                placeholder="00:00"
                value={timeStart}
                onChange={(event) => setTimeStart(event.target.value)}
              />
            </div>

            <div>
              <p>Дата конца</p>
              <InputMask
                mask="99.99.9999"
                placeholder="ДД.ММ.ГГГГ"
                value={dateFinish}
                onChange={(event) => setDateFinish(event.target.value)}
              />
            </div>

            <div>
              <p>Время конца</p>
              <InputMask
                mask="99:99"
                placeholder="00:00"
                value={timeFinish}
                onChange={(event) => setTimeFinish(event.target.value)}
              />
            </div>
          </form>

          <div className={style.create_direction__images}>
            <div className={style.create_direction__image}>
              <p>Изображение</p>

              <input id="main-image" {...getInputPropsMain()} />

              <label htmlFor="main-image">
                <div>
                  {mainImagePath ? (
                    <img
                      src={`${process.env.REACT_APP_SERVER_URL}${mainImagePath}`}
                      alt="main image"
                    />
                  ) : (
                    <p>Перетащите файл сюда или нажмите для выбора</p>
                  )}
                </div>
              </label>
            </div>
          </div>

          <button onClick={createEvent}>Создать мероприятие</button>
        </div>
      </div>
    </section>
  );
};

export default CreateEvent;
