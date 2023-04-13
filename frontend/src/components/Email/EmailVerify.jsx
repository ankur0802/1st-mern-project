import React, { useEffect, useState } from "react";
import "./EmailVerify.css";
import success from "../../images/success_image.png";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailVerify = () => {
  const [validurl, setValidurl] = useState(false);
  const params = useParams();
  let url = `/api/v1/users/${params.id}/verify/${params.token}`

  useEffect(() => {
    const verifyEmailUrl = async () => {
        
      try {
        
        const {data} = await axios.get(url);

        toast.success(data.message)
        setValidurl(true)

      } catch (error) {
        toast.error(error.message)
        setValidurl(false)

      }
    };
    verifyEmailUrl();
  }, [url]);

  return (
    <>
      {validurl ? (
        <div className="containere">
          <img src={success} alt="success_image" className="success_img" />
          <h1>Email verified successfully</h1>
          <Link to="/login">
            <button className="green_btn">Login</button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found </h1>
      )}
    </>
  );
};

export default EmailVerify;
