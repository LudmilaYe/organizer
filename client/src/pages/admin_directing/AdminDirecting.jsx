import React, { useEffect, useState, useCallback } from "react";
import style from "./style.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import { useDropzone } from "react-dropzone";

const AdminDirecting = ({ userData }) => {
  const [directing, setDirecting] = useState(null);
  const [loadingDirecting, setLoadingDirecting] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [secondDescription, setSecondDescription] = useState("");
  const [admins, setAdmins] = useState([]);

  const [imagePath, setImagePath] = useState("");
  const [secondImagePath, setSecondImagePath] = useState("");
  const [gallery, setGallery] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchDirecting = useCallback(async () => {
    try {
      setLoadingDirecting(true);
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/directing/get-directing/${id}`
      );
      setDirecting(response.data);
    } catch (error) {
      alert(
        `Произошла ошибка: ${error.response?.data?.message || error.message}`
      );
      console.error(error);
    } finally {
      setLoadingDirecting(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDirecting();
  }, [fetchDirecting]);

  useEffect(() => {
    if (directing && userData && !directing.admins.includes(userData._id)) {
      navigate("/");
    } else if (directing) {
      console.log(directing);

      setName(directing.name);
      setDescription(directing.description);
      setSecondDescription(directing.secondDescription);
      setAdmins(directing.admins);
      setImagePath(directing.imagePath);
      setSecondImagePath(directing.secondImagePath);
      setGallery(directing.gallery);
    }
  }, [directing, userData, navigate]);

  const updateDirecting = async () => {
    try {
      setSaving(true);
      const data = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/directing/update/${directing._id}`,
        {
          name,
          description,
          secondDescription,
          admins,
          imagePath,
          secondImagePath,
          gallery,
        }
      );
      setSaving(false);

      console.log(data);

      if (data.status === 200) {
        alert("Успешно обновлено!");
      }
    } catch (error) {
      alert(
        `Произошла ошибка: ${error.response?.data?.message || error.message}`
      );
      console.error(error);
    }
  };

  const uploadImage = async (acceptedFiles, setNewImagePath) => {
    const formData = new FormData();
    formData.append("image", acceptedFiles[0]);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/upload`,
        formData
      );

      setNewImagePath(response.data.path);
    } catch (error) {
      alert(`Произошла ошибка: ${error.response.data.message}`);
      console.error("Ошибка загрузки файла:", error);
    }
  };

  const uploadGalleryImages = async (acceptedFiles) => {
    console.log(123);

    const uploadedPaths = await Promise.all(
      acceptedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/upload`,
            formData
          );

          console.log(response);

          return response.data.path;
        } catch (error) {
          console.error("Ошибка загрузки файла:", error);
          alert(`Произошла ошибка: ${error.response.data.message}`);
          return null;
        }
      })
    );
    setGallery((prevGallery) => [
      ...prevGallery,
      ...uploadedPaths.filter(Boolean),
    ]);
  };

  const onDropMain = (acceptedFiles) =>
    uploadImage(acceptedFiles, setImagePath);
  const onDropSecond = (acceptedFiles) =>
    uploadImage(acceptedFiles, setSecondImagePath);

  const {
    getRootProps: getRootPropsGallery,
    getInputProps: getInputPropsGallery,
  } = useDropzone({ onDrop: uploadGalleryImages });

  const { getRootProps: getRootPropsMain, getInputProps: getInputPropsMain } =
    useDropzone({ onDrop: onDropMain });
  const {
    getRootProps: getRootPropsSecond,
    getInputProps: getInputPropsSecond,
  } = useDropzone({ onDrop: onDropSecond });

  // console.log(directing);

  return (
    <section className={style.admin_direction}>
      <div className="container">
        <div className={style.admin_direction__wrapper}>
          {loadingDirecting ? (
            <p>Загрузка...</p>
          ) : (
            directing &&
            userData &&
            directing.admins.includes(userData._id) && (
              <React.Fragment>
                <form>
                  <div>
                    <p>Название направления</p>
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>

                  <div>
                    <p>Основное описание</p>
                    <textarea
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </div>

                  <div>
                    <p>Следующее описание</p>
                    <textarea
                      value={secondDescription}
                      onChange={(event) =>
                        setSecondDescription(event.target.value)
                      }
                    />
                  </div>
                </form>

                <div className={style.create_direction__images}>
                  <div className={style.create_direction__image}>
                    <p>Главное изображение</p>

                    <input id="main-image" {...getInputPropsMain()} />

                    <label htmlFor="main-image">
                      <div>
                        {imagePath ? (
                          <img
                            src={`${process.env.REACT_APP_SERVER_URL}${imagePath}`}
                            alt="main image"
                          />
                        ) : (
                          <p>Перетащите файл сюда или нажмите для выбора</p>
                        )}
                      </div>
                    </label>
                  </div>

                  <div className={style.create_direction__image}>
                    <p>Второе изображение</p>

                    <input id="second-image" {...getInputPropsSecond()} />

                    <label htmlFor="second-image">
                      <div>
                        {secondImagePath ? (
                          <img
                            src={`${process.env.REACT_APP_SERVER_URL}${secondImagePath}`}
                            alt="second image"
                          />
                        ) : (
                          <p>Перетащите файл сюда или нажмите для выбора</p>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                <div className={style.create_direction__gallery}>
                  <p>Галерея</p>
                  <div
                    // {...getRootPropsGallery()}
                    className={style.create_direction__image}
                  >
                    <input id="gallery" {...getInputPropsGallery()} />

                    <label htmlFor="gallery">
                      <div>
                        <p>Перетащите файлы сюда или нажмите для выбора</p>
                      </div>
                    </label>
                  </div>
                  <div className={style.gallery_preview}>
                    {gallery.map((image, index) => (
                      <img
                        key={index}
                        src={`${process.env.REACT_APP_SERVER_URL}${image}`}
                        alt={`Gallery ${index}`}
                      />
                    ))}
                  </div>
                </div>

                <button onClick={updateDirecting} disabled={saving}>
                  {saving ? "Сохранение..." : "Обновить"}
                </button>
              </React.Fragment>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDirecting;
