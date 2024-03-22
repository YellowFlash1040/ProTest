import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../components";
import {
  AuthPage,
  ContactsPage,
  MainPage,
  Results,
  Test,
  UsefulInfo,
} from "../pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="results" element={<Results />} />
        <Route path="test" element={<Test />} />
        <Route path="useful-info" element={<UsefulInfo />} />
      </Route>
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}

export default App;
