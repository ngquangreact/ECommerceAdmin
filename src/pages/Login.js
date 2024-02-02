import { Link } from "react-router-dom";
import CustomInput from "../components/CustomInput";

const Login = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", height: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 bg-white rounded-3 mx-auto p-4 w-25">
        <form action="">
          <h3 className="text-center title">Login</h3>
          <p className="text-center">Login your account to continue.</p>
          <CustomInput type="email" label="Email" i_id="email" />
          <CustomInput type="password" label="Password" i_id="pass" />
          <div className="mb-3 text-end">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <Link
            className="border-0 w-100 text-white fw-bold px-3 py-2 text-decoration-none text-center fs-5"
            style={{ background: "#ffd333" }}
            to="/admin"
          >
            login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
