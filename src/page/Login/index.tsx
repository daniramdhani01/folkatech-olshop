import React, { useState } from "react";
import { Card, Container, Form, Button, Stack, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../utils/API";
import { useAuth } from "../../moduls/Auth";

function Login() {
  const [ispsswd, setIspsswd] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setCurrentUser, saveAuth } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (v: any) => {
      try {
        setIsLoading(true);
        const res = await API.post("login", v);
        const userData = res.data.data;
        setCurrentUser(userData);
        saveAuth(userData);
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
          <Stack gap={3}>
            <span className="text-primary-dark fs-4 fw-bold">Masuk</span>

            <Form.Group>
              <Form.Control
                className="bg-white py-3 shadow-sm"
                type="email"
                placeholder="Email"
                name="email"
                onBlur={() => formik.setFieldTouched("email", true)}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <Form.Text className="text-danger">
                {formik.touched.email && formik.errors.email}
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <div className="position-relative">
                <Form.Control
                  className="bg-white py-3 shadow-sm"
                  type={ispsswd ? "password" : "text"}
                  placeholder="Password"
                  style={{ paddingRight: "60px" }}
                  name="password"
                  onBlur={() => formik.setFieldTouched("password", true)}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <button
                  onClick={() => setIspsswd((prev) => !prev)}
                  className="bg-transparent border-0 p-0 text-primary-dark me-3 position-absolute top-50 end-0 translate-middle-y"
                >
                  {ispsswd ? "Show" : "Hide"}
                </button>
              </div>
              <Form.Text className="text-danger">
                {formik.touched.password && formik.errors.password}
              </Form.Text>
            </Form.Group>

            <div className="text-end">
              <button className="bg-transparent border-0 p-0 text-primary-dark fs-6">
                Lupa Password?
              </button>
            </div>
            <Button
              className="text-white w-100 py-3 shadow"
              disabled={!formik.isValid}
              onClick={formik.submitForm}
            >
              MASUK{isLoading && <Spinner size='sm' className="ms-2"></Spinner>}
            </Button>
            <div className="text-muted">
              <hr className="mx-5" />
            </div>
            <div className="text-center mb-3">
              <span className="text-muted">Belum Punya Akun? </span>
              <button
                className="bg-transparent border-0 p-0 text-primary-dark fw-bold"
                onClick={() => navigate("/auth/register")}
              >
                Daftar Sekarang
              </button>
            </div>
          </Stack>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
