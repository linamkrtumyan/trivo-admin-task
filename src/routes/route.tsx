import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "../components/loader";
import { LoginPage, UserPage } from "../pages";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

export default function Root() {
  const accessToken = localStorage.getItem("accessToken");
  const token = useSelector((state: RootState) => state.login.authToken);

  return (
    <>
     <Suspense fallback={<Loader />}>
      {accessToken || token ? (
        <Routes>
          <Route path="/users" element={<UserPage />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
      </Suspense>
    </>
  );
}
