import { Link, Outlet, Navigate } from "react-router";
function AppLayout() {

  /* const user = Boolean(localStorage.getItem("token"));
  if (!user) {
    return <Navigate to="/login" />;
  } */

  return (
    <>
      <header>
        <Link to={"/"}>
          <h1>Studio</h1>
        </Link>
        <Link to={"/create"}>Create</Link>
        <Link to={"/logout"}>Logout</Link>
      </header>
      <Outlet />
    </>
  );
}

export default AppLayout;
