import { useState } from "react";
import { Form, Button, Stack, Spinner, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function RegisterTwo(props: any) {
  const navigate = useNavigate();
  const { display, setShowRegone, formik, isLoading, showToast, setShowToast } = props;
  const [ispsswd, setIspsswd] = useState(true);
  const [ispsswdk, setIspsswdk] = useState(true);
  return (
    <Stack gap={3} style={{ display }}>
      <div className="d-flex align-items-center">
        <button
          className="bg-transparent border-0 p-0 d-flex align-items-center"
          onClick={() => setShowRegone(true)}
        >
          <i className="fa fa-arrow-left text-primary-dark fa-lg me-2"></i>
        </button>
        <span className="text-primary-dark fs-4 fw-bold">Kembali</span>
      </div>

      <Form.Group>
        <Form.Control
          className="bg-white py-3 shadow-sm"
          type="tel"
          placeholder="Nomor Telepon"
          name="phone"
          onBlur={() => formik.setFieldTouched("phone", true)}
          onChange={formik.handleChange}
          value={formik.values.phone}
        />
        <Form.Text className="text-danger">
          {formik.touched.phone && formik.errors.phone}
        </Form.Text>
      </Form.Group>

      <Form.Group>
        <div className="position-relative">
          <Form.Control
            className="bg-white py-3 shadow-sm"
            type={ispsswd ? "password" : "text"}
            placeholder="Password"
            style={{ paddingRight: "60px" }}
            name="password1"
            onBlur={() => formik.setFieldTouched("password1", true)}
            onChange={formik.handleChange}
            value={formik.values.password1}
          />
          <button
            onClick={() => setIspsswd((prev) => !prev)}
            className="bg-transparent border-0 p-0 text-primary-dark me-3 position-absolute top-50 end-0 translate-middle-y"
          >
            {ispsswd ? "Show" : "Hide"}
          </button>
        </div>
        <Form.Text className="text-danger">
          {formik.touched.password1 && formik.errors.password1}
        </Form.Text>
      </Form.Group>

      <Form.Group>
        <div className="position-relative">
          <Form.Control
            className="bg-white py-3 shadow-sm"
            type={ispsswdk ? "password" : "text"}
            placeholder="Konfirmasi Password"
            style={{ paddingRight: "60px" }}
            name="password2"
            onBlur={() => formik.setFieldTouched("password2", true)}
            onChange={formik.handleChange}
            value={formik.values.password2}
          />
          <button
            onClick={() => setIspsswdk((prev) => !prev)}
            className="bg-transparent border-0 p-0 text-primary-dark me-3 position-absolute top-50 end-0 translate-middle-y"
          >
            {ispsswdk ? "Show" : "Hide"}
          </button>
        </div>
        <Form.Text className="text-danger">
          {formik.touched.password2 &&
            (formik.errors.password2
              ? formik.errors.password2
              : formik.values.password1 !== formik.values.password2 &&
                "Password tidak sama")}
        </Form.Text>
      </Form.Group>

      <div className="text-end"></div>
      <Button
        className="text-white w-100 py-3 shadow"
        disabled={
          !!formik.errors.phone ||
          !!formik.errors.password1 ||
          !!formik.errors.password2 ||
          !formik.dirty ||
          formik.values.password2 !== formik.values.password1
        }
        onClick={formik.submitForm}
      >
        Selanjutnya{isLoading && <Spinner size="sm" className="ms-2"></Spinner>}
      </Button>
      <Toast onClose={()=>setShowToast(false)} show={showToast} delay={2000} bg="success" autohide>
        <Toast.Body className="text-white text-center">
          Akun Berhasil Dibuat, Silahkan Login
        </Toast.Body>
      </Toast>
      <div className="text-muted">
        <hr className="mx-5" />
      </div>
      <div className="text-center mb-3">
        <span className="text-muted">Sudah Punya Akun? </span>
        <button
          className="bg-transparent border-0 p-0 text-primary-dark fw-bold"
          onClick={() => navigate("/login")}
        >
          Masuk
        </button>
      </div>
    </Stack>
  );
}

export default RegisterTwo;
