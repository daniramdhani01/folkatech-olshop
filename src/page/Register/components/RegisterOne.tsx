import { Form, Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function RegisterOne(props: any) {
  const navigate = useNavigate();
  const { display, setShowRegone, formik } = props;
  
  return (
    <Stack gap={3} style={{ display }}>
      <span className="text-primary-dark fs-4 fw-bold">
        Daftar Sekarang
      </span>

      <Form.Group>
        <Form.Control
          tabIndex={1}
          className="bg-white py-3 shadow-sm"
          type="text"
          placeholder="Nama Depan"
          name='first_name'
          onBlur={()=>formik.setFieldTouched('first_name', true)}
          onChange={formik.handleChange}
          value={formik.values.first_name}
          />
        <Form.Text className="text-danger">
          {formik.touched.first_name && formik.errors.first_name}
        </Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Control
          tabIndex={2}
          className="bg-white py-3 shadow-sm"
          type="text"
          placeholder="Nama Belakang"
          name="last_name"
          onBlur={()=>formik.setFieldTouched('last_name', true)}
          onChange={formik.handleChange}
          value={formik.values.last_name}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          className="bg-white py-3 shadow-sm"
          type="email"
          placeholder="Email"
          name="email"
          onBlur={()=>formik.setFieldTouched('email', true)}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Form.Text className="text-danger">
          {formik.touched.email && formik.errors.email}
        </Form.Text>
      </Form.Group>

      <div className="text-end"></div>
      <Button
        className="text-white w-100 py-3 shadow"
        onClick={() => setShowRegone(false)}
        disabled={ !!formik.errors.email || !!formik.errors.first_name || !formik.dirty }
      >
        Selanjutnya
      </Button>
      <div className="text-muted">
        <hr className="mx-5" />
      </div>
      <div className="text-center mb-3">
        <span className="text-muted">Sudah Punya Akun? </span>
        <button
          className="bg-transparent border-0 p-0 text-primary-dark fw-bold"
          onClick={() => navigate("/auth/login")}
        >
          Masuk
        </button>
      </div>
    </Stack>
  );
}

export default RegisterOne;
