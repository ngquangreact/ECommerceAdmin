import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let schema = Yup.object().shape({
    email: Yup.string()
      .email("Email should be valid !")
      .required("Email is required !"),
    password: Yup.string().required("Password is required !"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isError, isLoading, isSuccess, message]);
  return (
    <div className="py-5" style={{ background: "#ffd333", height: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 bg-white rounded-3 mx-auto p-4 w-25">
        <form onSubmit={formik.handleSubmit}>
          <h3 className="text-center title">Login</h3>
          <p className="text-center">Login your account to continue.</p>
          <div className="text-center error-input">
            {message === "Rejected" ? "You are not an Admin" : ""}
          </div>
          <CustomInput
            type="email"
            label="Email"
            i_id="email"
            name="email"
            val={formik.values.email}
            onCh={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error-input">{formik.errors.email}</div>
          ) : null}
          <CustomInput
            type="password"
            label="Password"
            i_id="pass"
            name="password"
            val={formik.values.password}
            onCh={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error-input">{formik.errors.password}</div>
          ) : null}
          <div className="mb-3 text-end">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <button
            className="border-0 w-100 text-white fw-bold px-3 py-2 text-decoration-none text-center fs-5"
            style={{ background: "#ffd333" }}
          >
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
