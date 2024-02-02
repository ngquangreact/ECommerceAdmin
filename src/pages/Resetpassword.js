import CustomInput from "../components/CustomInput";

const Resetpassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", height: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 bg-white rounded-3 mx-auto p-4 w-25">
        <form action="">
          <h3 className="text-center title">Reset Password</h3>
          <p className="text-center">Please enter your new password.</p>
          <CustomInput type="password" label="New Password" i_id="new_pass" />
          <CustomInput
            type="password"
            label="Confirm Password"
            i_id="conf_pass"
          />
          <button
            className="border-0 w-100 text-white fw-bold px-3 py-2"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;
