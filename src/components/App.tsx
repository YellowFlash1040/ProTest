import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "../components";
import MainPage from "../pages/MainPage/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
