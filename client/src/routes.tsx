import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddThumbnails from "./components/Home/AddThumbnails";

const Home = React.lazy(() => import("./components/Home/Home"));
const ErrorPage = React.lazy(() => import("./components/ErrorPage"));
const NotFound = React.lazy(() => import("./components/NotFound"));

const allRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<h1>Loading....</h1>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddThumbnails />} />
            <Route path="/edit/:id" element={<AddThumbnails />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default allRoutes;
