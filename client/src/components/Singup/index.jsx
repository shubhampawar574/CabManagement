import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
  const [data, setData] = useState({
    userId: "",
    name: "",
    email: "",
    password: "",
    location: "",
    role: "",
  });
  //   const [role, setrole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //   const handleChange = ({ currentTarget: input }) => {
  //     setData({ ...data, [input.name]: input.value });
  //   };
  // Function to handle change in radio input
  const handleRoleChange = (event) => {
    setData((prevData) => ({ ...prevData, role: event.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="User ID"
              name="userId"
              onChange={(event) =>
                setData((prevData) => ({
                  ...prevData,
                  userId: event.target.value,
                }))
              }
              value={data.userId}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={(event) =>
                setData((prevData) => ({
                  ...prevData,
                  name: event.target.value,
                }))
              }
              value={data.name}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(event) =>
                setData((prevData) => ({
                  ...prevData,
                  email: event.target.value,
                }))
              }
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(event) =>
                setData((prevData) => ({
                  ...prevData,
                  password: event.target.value,
                }))
              }
              value={data.password}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Location"
              name="location"
              onChange={(event) =>
                setData((prevData) => ({
                  ...prevData,
                  location: event.target.value,
                }))
              }
              value={data.location}
              required
              className={styles.input}
            />
            <label>
              Role:
              <input
                type="radio"
                value="driver"
                checked={data.role === "driver"}
                onChange={handleRoleChange}
              />{" "}
              Driver
              <input
                type="radio"
                value="user"
                checked={data.role === "user"}
                onChange={handleRoleChange}
              />{" "}
              User
            </label>

            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
