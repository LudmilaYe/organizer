import React, { useEffect, useState, useCallback } from "react";
import style from "./style.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";

const AdminDirecting = ({ userData }) => {
  const [directing, setDirecting] = useState(null);
  const [loadingDirecting, setLoadingDirecting] = useState(false);
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
      alert(`Произошла ошибка: ${error.response?.data?.message || error.message}`);
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
    }
  }, [directing, userData, navigate]);

  return (
    <section className={style.admin_direction}>
      <div className="container">
        <div className={style.admin_direction__wrapper}>
          {directing && userData && directing.admins.includes(userData._id) && (
            <React.Fragment>
              {/* Add your admin content here */}
            </React.Fragment>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDirecting;
