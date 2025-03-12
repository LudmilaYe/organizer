import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import SignIn from "./pages/signin/SignIn";
import axios from "axios";
import Account from "./pages/account/Account";
import CreateDirecting from "./pages/admin/CreateDirecting";

function App() {
  const [findUserProcess, setFindUserProcess] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        setFindUserProcess(true);
        const user = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/user/get`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          }
        );

        setFindUserProcess(false);
        setUserData(user.data);
      } catch (err) {
        setFindUserProcess(false);
      }
    }

    getUser();
  }, [localStorage.getItem("token")]);

  return (
    <div className="App">
      <div className="page">
        <Header userData={userData} />

        <main>
          {findUserProcess ? (
            <p>Загрузка...</p>
          ) : (
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              {userData && (
                <>
                  <Route
                    path="/account"
                    element={<Account userData={userData} />}
                  />

                  {(userData.role.toLowerCase() === "руководитель в.о." ||
                    userData.role.toLowerCase() === "администратор") && (
                    <Route
                      path="create-directing"
                      element={<CreateDirecting />}
                    />
                  )}
                </>
              )}
            </Routes>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
