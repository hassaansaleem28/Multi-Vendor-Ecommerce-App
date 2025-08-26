import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ActivationPage() {
  const { url } = useParams();
  const [error, setError] = useState(false);

  useEffect(function () {
    if (url) {
      async function activateEmail() {
        try {
          await axios.post(`${API_BASE_URL}/api/v2/user/activation`, { url });
        } catch (error) {
          console.error("Error activating email:", error);
          setError(true);
        }
      }
      activateEmail();
    }
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <h1 style={{ color: "red" }}>
          Activation failed. Please try again. Token expired!
        </h1>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
}

export default ActivationPage;
