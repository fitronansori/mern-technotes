import { Outlet } from "react-router-dom";
// import Public from "./components/Public";

function App() {
  return (
    <main>
      {/* <Public /> */}
      <Outlet />
    </main>
  );
}

// export App menjadi Root
export { App };
