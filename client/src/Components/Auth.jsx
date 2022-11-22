import { useState } from "react";
import axios from "axios"
import logo from "../assets/opus_logo.png";
import Cookies from "universal-cookie"
import { data } from "autoprefixer";

const cookies=new Cookies();

const Auth = () => {
  //some styles
  const styles = {
    field_container: "w-10/12 m-auto flex flex-col gap-1 p-2",
    field_label: "text-secondary text-base w-full ",
  };
  const field_input = {
    border: "3px solid rgba(3,17,54)",
    padding: "8px 2px",
    width: "100%",
    borderRadius: "0.25rem",
    color: "white",
  };

  //input handles
  const [form, setForm] = useState([]);

  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value});
//console.log(form);
  };

  //change sign in to sign up
  const changeMood = () => {
    setFirstTime(!FirstTime);
  };
  const [FirstTime, setFirstTime] = useState(false);
  
  //handle form submit
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const URL = 'https://chatopus.herokuapp.com/';
         const { data: { token, userID, hashedPassword,fullName} } = await axios.post(`${URL}/${FirstTime ? 'signup' : 'login'}`, {
            username:form.username ,password: form.password, fullName: form.fullName,phoneNumber: form.phoneNumber,avatarURL: form.avatarURL,}
            );
            console.log(data);

    cookies.set('token',token);
    cookies.set('username',form.username);
    cookies.set('fullName',form.fullName);
    cookies.set('userID',userID);
    if(FirstTime){
    cookies.set('phoneNumber',form.phoneNumber);
    cookies.set('avatarURL',form.avatarURL);
    cookies.set("hashedPassword",hashedPassword);
    }
    window.location.reload();
  }
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-primary">
      <div className="w-16 absolute top-0 left-0 max-[540px]:w-12  ">
        <img src={logo} alt="logo" className="w-full"></img>
      </div>
      <p className="absolute top-5 text-lg text-secondary">
        {FirstTime ? " BECOME AN " : " HEY  "}OPICIAN
      </p>

      <div className="w-2/5  max-[540px]:min-w-[90%]     min-h-[40%] m-auto      bg-primaryDark rounded ">
        <p className="text-white text-center text-3xl m-2 ">
          {FirstTime ? "Sign Up" : "Sign In"}
        </p>
        <form onSubmit={handleSubmit}>
          {FirstTime && (
            <div className={styles.field_container}>
              <label className={styles.field_label}>Full name</label>
              <input
                name="fullName"
                style={field_input}
                placeholder="fullname"
                type="text"
                onChange={handleChange}
                required
              ></input>
            </div>
          )}

          <div className={styles.field_container}>
            <label className={styles.field_label}>Username</label>
            <input
              name="username"
              style={field_input}
              placeholder="username"
              type="text"
              onChange={handleChange}
              required
            ></input>
          </div>

          {FirstTime && (
            <div className={styles.field_container}>
              <label className={styles.field_label}>Phone Number</label>
              <input
                name="phoneNumber"
                style={field_input}
                placeholder="phone number"
                type="text"
                onChange={handleChange}
                required
              ></input>
            </div>
          )}
          {FirstTime && (
            <div className={styles.field_container}>
              <label className={styles.field_label}>Avatar URL</label>
              <input
                name="avatarURL"
                style={field_input}
                placeholder="avatar URL"
                type="text"
                onChange={handleChange}
                required
              ></input>
            </div>
          )}

          <div className={styles.field_container}>
            <label className={styles.field_label}>Password</label>
            <input
              name="password"
              style={field_input}
              placeholder="Password"
              type="password"
              onChange={handleChange}
              required
            ></input>
          </div>

          {FirstTime && (
            <div className={styles.field_container}>
              <label className={styles.field_label}>Confirm Password</label>
              <input
                name="confirmPassword"
                style={field_input}
                placeholder="confirm password"
                type="password"
                onChange={handleChange}
                required
              ></input>
            </div>
          )}
          <div className="m-auto w-fit">
            <button className="bg-btn rounded px-5 py-2  text-white">
              {FirstTime ? " Create " : " Log In "}
            </button>
          </div>
        </form>
        <div>
          <p className=" text-white my-4 mx-2 text-right">
            {FirstTime ? "Already have an account" : "Don't have an account"}
            <span
              className="text-secondary cursor-pointer"
              onClick={changeMood}
            >
              {FirstTime ? " Sign In" : " Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Auth;
