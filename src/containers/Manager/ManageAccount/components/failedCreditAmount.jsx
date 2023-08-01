import React from "react";


const FailedCreditAmount = () => {
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
      <h1 style={{ fontSize: "2.5rem", color: "#f44336" }}>Error</h1>
      <p style={{ fontSize: "1.2rem", margin: "10px", color: "#333" }}>
        Oops! Something went wrong.
      </p>
      <p style={{ fontSize: "1.2rem", margin: "10px", color: "#333" }}>
        Please try again later.
      </p>
    </div>
  );
};

export default FailedCreditAmount;
