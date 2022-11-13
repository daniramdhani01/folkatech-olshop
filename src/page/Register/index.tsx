import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import RegisterOne from "./components/RegisterOne";
import RegisterTwo from "./components/RegisterTwo";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../utils/API";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [showRegone, setShowRegone] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const validationSchema = Yup.object({
    first_name: Yup.string().required(),
    last_name: Yup.string(),
    email: Yup.string().email().required(),
    password1: Yup.string().min(8).required(),
    password2: Yup.string().min(8).required(),
    phone: Yup.string().min(10).nullable().required(),
  });
  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password1: "",
      password2: "",
      phone: "",
    },
    onSubmit: async (v: any) => {
      try {
        setIsLoading(true);
        if (v.password1 === v.password2) {
          const params = {
            name: v.first_name + (v.last_name ? ` ${v.last_name}` : ""),
            email: v.email,
            password: v.password1,
            phone: v.phone,
          };
          await API.post("register", params);
          setShowToast(true);
          setTimeout(() => {
            navigate("/auth");
          }, 2010);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
  });
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card style={{ width: "400px" }}>
        <Card.Body className="p-4 shadow">
          <RegisterOne
            formik={formik}
            display={showRegone ? true : "none"}
            setShowRegone={setShowRegone}
          />
          <RegisterTwo
            formik={formik}
            display={!showRegone ? true : "none"}
            setShowRegone={setShowRegone}
            isLoading={isLoading}
            showToast={showToast}
            setShowToast={setShowToast}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Register;
