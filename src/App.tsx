import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Calculators from "./pages/Calculators";
import YouthSaving from "./pages/savings/YouthSaving";
import HomePage from "./pages/HomePage";
import styled from "@emotion/styled";
import { spaces } from "./tokens/tokens";

import Header from "./components/Header";

const App = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/calculators/youth-saving" element={<YouthSaving />} />
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
