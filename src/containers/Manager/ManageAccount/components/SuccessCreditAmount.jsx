import React from "react";


const SuccessCreditAmount = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "#009688" }}>Success!</h1>
      <p style={{ fontSize: "1.2rem", margin: "10px", color: "#333" }}>
        Your transaction was successful.
      </p>
      <p style={{ fontSize: "1.2rem", margin: "10px", color: "#333" }}>
        Thank you for your payment!
      </p>
    </div>
  );
};

export default SuccessCreditAmount;
