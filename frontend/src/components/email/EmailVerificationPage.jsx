import React from "react";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import "../../assets/css/email_verification.css";
import Header from "../template/header/Header";
import Footer from "../template/footer/Footer";
import Loading from "../template/Loading";
import {useState} from "react";
import axios from "axios";
import EmailVerificationResponse from "./EmailVerificationResponse";

export default function EmailVerificationPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(function () {
    axios
      .post(
        `/api/mail/verification/verify/${searchParams.get("token")}`,
        {},
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        setIsLoading(false);
        setResponseMessage(response.data.message);
      })
      .catch((response) => {
        if(response.response.data.message.includes("No query results for model")) {
          setResponseMessage("Token was not found, please issue a new token")
          setIsLoading(false);
        }
      });
  }, []);

  return (
    <div className="email-verification-page d-flex justify-content-between flex-column">
      <div>
        <Header exclude={{form: true}}></Header>

        <div className="email-verification-title fs-1 fw-bold text-center my-4">Email Verification</div>

        <div className="email-verification-status-container m-auto p-3 rounded shadow border-1 d-flex justify-content-center align-items-center">
          {isLoading ? <Loading description={"Please wait, your email is being processed"}></Loading> : <EmailVerificationResponse responseMessage={responseMessage} />}
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
