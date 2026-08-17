import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ActivationResult from "../components/ui/ActivationResult";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ActivationPage() {
  const { url } = useParams();
  const [status, setStatus] = useState("pending");

  useEffect(function () {
    if (url) {
      async function activateEmail() {
        try {
          await axios.post(`${API_BASE_URL}/api/v2/user/activation`, { url });
          setStatus("success");
        } catch (error) {
          console.error("Error activating email:", error);
          setStatus("error");
        }
      }
      activateEmail();
    }
  }, []);

  if (status === "error") {
    return (
      <ActivationResult
        status="error"
        title="Activation failed"
        message="This activation link is no longer valid — the token has expired. Sign up again to get a fresh link."
        ctaLabel="Back to sign up"
        ctaTo="/sign-up"
      />
    );
  }

  if (status === "pending") {
    return (
      <ActivationResult
        status="pending"
        title="Activating your account"
        message="Hold on a moment while we verify your email address."
      />
    );
  }

  return (
    <ActivationResult
      status="success"
      title="You're all set"
      message="Your account has been created successfully. Sign in to start shopping."
      ctaLabel="Sign in to ShopO"
      ctaTo="/login"
    />
  );
}

export default ActivationPage;
