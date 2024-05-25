import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { Outlet } from "react-router-dom";
import Userscreen from "./components/Userscreen";
import Signup from "./components/Singup";
import Login from "./components/Login";
import AdminDetailsScreen from "./components/AdminDetailsScreen";
import DriverScreen from "./components/DriverScreen";
import FoodAdminScreen from "./components/FoodAdminScreen";
import { useEffect, useState } from "react";

function App() {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("token")));

  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem("token")));
  // }, [user]);
  // console.log(user);

  const user = useState(JSON.parse(localStorage.getItem("token")));

  const PrivateRoutes = () => {
    // let auth = {'token':true}
    return user ? <Outlet /> : <Navigate to="/login" />;
  };
  return (
    <Router>
      <Routes>
        {/* {user && user.isFoodAdmin && !user.isAdmin && !user.isUser && (
        <Route path="/foodadmin" exact element={<FoodAdminScreen />} />
      )}
      {user && user.isAdmin && !user.isFoodAdmin && !user.isUser && (
        <Route path="/admin" exact element={<AdminDetailsScreen />} />
      )}
      {user && !user.isAdmin && user.isUser && !user.isFoodAdmin && (
        <Route path="/user" exact element={<Userscreen />} />
      )}
      {user && !user.isAdmin && !user.isUser && !user.isFoodAdmin && (
        <Route path="/driver" exact element={<DriverScreen />} />
      )} */}
        <Route element={<PrivateRoutes />}>
          <Route path="/foodadmin" exact element={<FoodAdminScreen />} />

          <Route path="/admin" exact element={<AdminDetailsScreen />} />

          <Route path="/user" exact element={<Userscreen />} />

          <Route path="/driver" exact element={<DriverScreen />} />
        </Route>
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

// const Signin = () => {
//   const [data, setData] = useState({ userid: "", password: "" });
//   const [error, setError] = useState("");
//   const [isadmin, setisadmin] = useState("");
//   const handleChange = ({ currentTarget: input }) => {
//     setData({ ...data, [input.name]: input.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = "http://localhost:8080/api/auth";
//       const { data: res } = await axios.post(url, data);
//       localStorage.setItem("token", res.data);
//       if (res.isAdmin) {
//         setisadmin("true");
//         window.location = "/admin";
//       } else {
//         setisadmin("false");
//         window.location = "/user";
//       }
//     } catch (error) {
//       if (
//         error.response &&
//         error.response.status >= 400 &&
//         error.response.status <= 500
//       ) {
//         setError(error.response.data.message);
//       }
//     }
//   };

//   return (
//     <div className={styles.login_container}>
//       <div className={styles.login_form_container}>
//         <div className={styles.left}>
//           <form className={styles.form_container} onSubmit={handleSubmit}>
//             <h1>Login to Your Account</h1>
//             <input
//               type="text"
//               placeholder="User ID"
//               name="userid"
//               onChange={handleChange}
//               value={data.userid}
//               required
//               className={styles.input}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               name="password"
//               onChange={handleChange}
//               value={data.password}
//               required
//               className={styles.input}
//             />
//             {error && <div className={styles.error_msg}>{error}</div>}
//             <button type="submit" className={styles.green_btn}>
//               Sign In
//             </button>
//           </form>
//         </div>
//         <div className={styles.right}>
//           <h1>New Here ?</h1>
//           <Link to="/signup">
//             <button type="button" className={styles.white_btn}>
//               Sign Up
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
