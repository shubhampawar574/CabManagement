import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Userscreen = () => {
  const [comeToOffice, setComeToOffice] = useState("");
  const [periodOfDay, setPeriodOfDay] = useState("");
  const navigate = useNavigate();

  const saveSelections = async () => {
    // Get JWT token from local storage (assumes token is stored after login)
    const token = localStorage.getItem("token");
    try {
      // Send selections to backend
      const response = await axios.post(
        "http://localhost:8080/api/selections",
        {
          comeToOffice,
          periodOfDay,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Selections saved successfully.");
      console.log(response.data); // Log response from the server
    } catch (error) {
      console.error("Error saving selections:", error);
      alert("Error saving selections. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h2>User Selection</h2>
      <div>
        <label>
          <input
            type="radio"
            value="Yes"
            checked={comeToOffice === "Yes"}
            onChange={() => setComeToOffice("Yes")}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            value="No"
            checked={comeToOffice === "No"}
            onChange={() => setComeToOffice("No")}
          />
          No
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="Morning"
            checked={periodOfDay === "Morning"}
            onChange={() => setPeriodOfDay("Morning")}
          />
          Morning
        </label>
        <label>
          <input
            type="radio"
            value="Afternoon"
            checked={periodOfDay === "Afternoon"}
            onChange={() => setPeriodOfDay("Afternoon")}
          />
          Afternoon
        </label>
        <label>
          <input
            type="radio"
            value="Night"
            checked={periodOfDay === "Night"}
            onChange={() => setPeriodOfDay("Night")}
          />
          Night
        </label>
      </div>
      <button onClick={saveSelections}>Save</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Userscreen;

// import styles from "./styles.module.css";

// const Userscreen = () => {
// const handleLogout = () => {
//   localStorage.removeItem("token");
//   window.location.reload();
// };

//   return (
//     <div className={styles.main_container}>
//       <nav className={styles.navbar}>
//         <h1>Cabbook</h1>
//         <button className={styles.white_btn} onClick={handleLogout}>
//           Logout
//         </button>
//       </nav>
//     </div>
//   );
// };

// export default Userscreen;
