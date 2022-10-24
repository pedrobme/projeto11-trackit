import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import GlobalStyle from "../assets/css/GlobalStyle";
import RegisterScreen from "./RegisterScreen";
import HabitsScreen from "./HabitsScreen";
import { AuthProvider } from "./contexts/auth";
import TodayScreen from "./TodayScreen";
import HistorySreen from "./HistoryScreen";

export default function App() {
  const AppLayout = (
    <>
      <GlobalStyle />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/cadastro" element={<RegisterScreen />} />
            <Route path="/habitos" element={<HabitsScreen />} />
            <Route path="/hoje" element={<TodayScreen />} />
            <Route path="/historico" element={<HistorySreen />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );

  return AppLayout;
}
