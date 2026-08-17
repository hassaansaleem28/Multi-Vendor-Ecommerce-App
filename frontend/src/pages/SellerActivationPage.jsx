import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ActivationResult from "../components/ui/ActivationResult";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function SellerActivationPage() {
  const { url } = useParams();
  const [status, setStatus] = useState("pending");

  useEffect(function () {
    if (url) {
      async function activateEmail() {
        try {
          await axios.post(
            `${API_BASE_URL}/api/v2/seller/seller-account/activation`,
            { url }
          );
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
        message="This activation link is no longer valid — the token has expired. Register your shop again to get a fresh link."
        ctaLabel="Back to shop sign up"
        ctaTo="/shop-create"
      />
    );
  }

  if (status === "pending") {
    return (
      <ActivationResult
        status="pending"
        title="Activating your shop"
        message="Hold on a moment while we verify your seller account."
      />
    );
  }

  return (
    <ActivationResult
      status="success"
      title="Your shop is live"
      message="Your seller account has been created successfully. Sign in to set up your storefront."
      ctaLabel="Go to seller login"
      ctaTo="/shop-login"
    />
  );
}

export default SellerActivationPage;
