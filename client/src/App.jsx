import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";
import { setIsLoggedIn, setUserDbData } from "./slices";
import { useGetUserMutation } from "./services/authApis";
import { Home, PageNotFound, Register, Signin } from "./pages";
import Loading from "./componenets/Loading";
import Toastify from "./componenets/Toastify";

AOS.init();
function App() {
  const dispatch = useDispatch();
  const [wait, setwait] = useState(true);
  const { isLoggedIn } = useSelector((store) => store.global);
  const token = localStorage.getItem("token");
  const [getUser] = useGetUserMutation();

  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });

  useEffect(() => {
    async function userData() {
      try {
        setwait(true);
        if (token) {
          const dbData = await getUser().unwrap();

          dispatch(setUserDbData(dbData));
          dispatch(setIsLoggedIn(true));
          setwait(false);
        } else {
          dispatch(setUserDbData(null));
          dispatch(setIsLoggedIn(false));
          setwait(false);
        }
      } catch (error) {
        console.log(error);
        setwait(false);
      }
    }
    userData();
  }, [dispatch, getUser, token]);
  return (
    <div>
      <Toastify setAlertState={setAlertState} alertState={alertState} />
      <Suspense fallback={<Loading loading />}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {!wait ? (
                  <> {isLoggedIn ? <Home /> : <Navigate to="/sign-in" />}</>
                ) : (
                  <>
                    <Loading loading={wait} />
                  </>
                )}
              </>
            }
          />
          <Route
            path="/sign-in"
            element={!isLoggedIn ? <Signin /> : <Navigate to="/" />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}
export default App;
