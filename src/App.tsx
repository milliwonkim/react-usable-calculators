import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Calculators from "./pages/Calculators";
import YouthSaving from "./pages/savings/YouthSaving";
import HomePage from "./pages/HomePage";
import styled from "@emotion/styled";
import { spaces } from "./tokens/tokens";

import Header from "./components/Header";
import {
  CALCULATORS_URL,
  CSS_PICKER_URL,
  YOUTH_SAVING_URL,
} from "./constants/url";
import ColorPicker from "./pages/color-picker/ColorPicker";

const App = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path={CALCULATORS_URL} element={<Calculators />} />
        <Route path={CSS_PICKER_URL} element={<ColorPicker />} />
        <Route path={YOUTH_SAVING_URL} element={<YouthSaving />} />
      </Routes>
    </Container>
  );
};

export default App;

const Container = styled.div`
  max-width: 400px;
  margin: auto;
  padding: ${spaces.space_16};
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  padding: ${spaces.space_16};
  display: flex;
  flex-direction: column;
  gap: ${spaces.space_16};
`;
