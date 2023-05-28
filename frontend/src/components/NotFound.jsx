const NotFound = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <h1
          style={{
            fontSize: "10rem",
            color: "red",
          }}
        >
          404
        </h1>
        <p
          style={{
            fontSize: "2rem",
            color: "red",
          }}
        >
          Page not found
        </p>
      </div>
    </>
  );
};

export default NotFound;
