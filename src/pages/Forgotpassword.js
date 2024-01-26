import CustomInput from "../components/CustomInput";

const Forgotpassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", height: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 bg-white rounded-3 mx-auto p-4 w-25">
        <form action="">
          <h3 className="text-center">Forgot Password</h3>
          <p className="text-center">
            Please enter your register email to get reset password mail
          </p>
          <CustomInput type="email" label="Email" i_id="email" />
          <button
            className="border-0 w-100 text-white fw-bold px-3 py-2"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Send link
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;
