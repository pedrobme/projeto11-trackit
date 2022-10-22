import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import GlobalStyle from "../assets/css/GlobalStyle";
import RegisterScreen from "./RegisterScreen";

export default function App() {
  const AppLayout = (
    <>
    <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/cadastro" element={<RegisterScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );

  return AppLayout;
}
