import { Outlet } from "react-router-dom";
import { Footer, Header } from "../../components";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
