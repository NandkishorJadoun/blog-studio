import { Link, Outlet } from "react-router";
function AppLayout() {
  return (
    <>
      <header>
        <h1>
          <Link to={"/"}>Studio</Link>
        </h1>
        <Link to={"/create"}>Create</Link>
        <Link to={"/logout"}>Logout</Link>
      </header>
      <Outlet />
    </>
  );
}

export default AppLayout;
