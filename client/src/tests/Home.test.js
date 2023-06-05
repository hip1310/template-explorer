import React, { Suspense } from "react";
import { render, getByText } from "@testing-library/react";
import Home from "../components/Home/Home";
import { BrowserRouter } from "react-router-dom";

test("Test to home page render", () => {
  const { container } = render(
    <BrowserRouter>
      <Suspense fallback={<h1>Loading....</h1>}>
        <Home />
      </Suspense>
    </BrowserRouter>
  );
  const name = getByText(container, "Code Development Project");
  expect(name).toBeInTheDocument();
});
