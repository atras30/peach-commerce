import axios from "axios";
import React from "react";
import {useEffect, useRef} from "react";
import Cookies from "universal-cookie";
import "../../assets/css/email_resend.css";
import {useMiddlewareContext, useUserContext} from "../../provider/ContextProvider";
import Footer from "../template/footer/Footer";
import Header from "../template/header/Header";
import {useState} from "react";
import Loading from "../template/Loading";
import { toast } from "react-toastify";

export default function EmailResendPage() {
  const setMiddleware = useMiddlewareContext();
  const {authenticatedUser} = useUserContext();
  const inputEmail = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const cookies = new Cookies();

  useEffect(function () {
    setMiddleware(["auth"]);
  }, []);

  function handleResendEmail() {
    setIsLoading(true);
    axios
      .post(
        `/api/mail/verification/resend/${authenticatedUser.email}`,
        {},
        {
          headers: {
            Authorization: cookies.get("Authorization"),
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((response) => {
        toast.success(response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="email-resend-page d-flex justify-content-between flex-column flex-wrap">
      <div>
        <Header exclude={["form"]}></Header>
        <h1 className="email-resend-title text-center mt-4 mb-4 fw-bold">Resend Email</h1>

        <div className="email-resend-form-container m-auto p-3 rounded border shadow d-flex justify-content-center align-items-center gap-3 flex-column mb-5">
          {!authenticatedUser? <Loading description={"Please wait..."}></Loading> : <div>Resend email to: <span className="fw-bold">{authenticatedUser.email}</span></div>}

          {!isLoading ? <button className="btn btn-primary" onClick={handleResendEmail}>Resend Email</button> : <Loading description="Generating new token..."></Loading>}
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
