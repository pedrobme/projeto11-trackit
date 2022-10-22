import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import GlobalStyle from "../assets/css/GlobalStyle";
import RegisterScreen from "./RegisterScreen";
import HabitsScreen from "./HabitsScreen";

export default function App() {
  const AppLayout = (
    <>
    <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/cadastro" element={<RegisterScreen />} />
          <Route path="/habitos" element={<HabitsScreen />}/>
        </Routes>
      </BrowserRouter>
    </>
  );

  return AppLayout;
}
