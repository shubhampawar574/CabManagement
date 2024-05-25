import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDetailsScreen = () => {
  const [comeToOfficeFilter, setComeToOfficeFilter] = useState("");
  const [periodOfDayFilter, setPeriodOfDayFilter] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedDrivers, setSelectedDrivers] = useState({});

  useEffect(() => {
    const fetchDrivers = async () => {
      const response = await axios.get("http://localhost:8080/api/drivers");
      setDrivers(response.data);
    };

    fetchDrivers();
  }, []);
  // const [n_user, setnUser] = useState();

  // useEffect(() => {
  //   setnUser(JSON.parse(localStorage.getItem("token")));
  // }, [n_user]);
  // console.log(n_user);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("token"));

  console.log(user.token);

  const fetchDetails = async () => {
    try {
      console.log("start admindetailsscreen");
      const response = await axios.get(
        `http://localhost:8080/admin/details?comeToOffice=${comeToOfficeFilter}&periodOfDay=${periodOfDayFilter}`
      );
      console.log(response.data[0].userId);
      setUserDetails(response.data);
      console.log("fetched user details in  admindetailsscreen");
    } catch (error) {
      console.error("Error fetching user details:", error);
      alert("Error fetching user details. Please try again.");
    }
  };

  // useEffect(() => {
  //   fetchDetails();
  // }, []); //

  function kMeansEqualSize(data, k, maxIterations = 100) {
    // Step 1: Initialize centroids randomly
    let centroids = initializeCentroids(data, k);

    let iterations = 0;
    let oldClusters = null;

    // Repeat until convergence or maximum iterations reached
    while (iterations < maxIterations) {
      // Step 2: Assign each point to the nearest centroid
      const clusters = assignPointsToClusters(data, centroids);

      // Step 3: Calculate new centroids
      const newCentroids = calculateCentroids(clusters);

      // Check for convergence
      if (clustersEqual(oldClusters, clusters)) {
        break;
      }

      // Update centroids
      centroids = newCentroids;
      oldClusters = clusters;

      iterations++;
    }

    // Adjust clusters to ensure each cluster contains an equal number of points
    return adjustClusterSizes(oldClusters, k);
  }

  // Function to initialize centroids randomly
  function initializeCentroids(data, k) {
    const centroids = [];
    const indexes = new Set();

    while (indexes.size < k) {
      const index = Math.floor(Math.random() * data.length);
      if (!indexes.has(index)) {
        indexes.add(index);
        centroids.push(data[index]);
      }
    }

    return centroids;
  }

  // Function to assign each point to the nearest centroid
  function assignPointsToClusters(data, centroids) {
    const clusters = new Array(centroids.length).fill().map(() => []);

    for (const point of data) {
      let minDistance = Infinity;
      let closestCentroidIndex = -1;

      for (let i = 0; i < centroids.length; i++) {
        const distance = euclideanDistance(point, centroids[i]);
        if (distance < minDistance) {
          minDistance = distance;
          closestCentroidIndex = i;
        }
      }

      clusters[closestCentroidIndex].push(point);
    }

    return clusters;
  }

  // Function to calculate centroids
  function calculateCentroids(clusters) {
    return clusters.map((cluster) => {
      const centroid = cluster.reduce(
        (acc, curr) => {
          return [acc[0] + curr[0], acc[1] + curr[1]];
        },
        [0, 0]
      );

      return [centroid[0] / cluster.length, centroid[1] / cluster.length];
    });
  }

  // Function to calculate Euclidean distance between two points
  function euclideanDistance(point1, point2) {
    const dx = point1[0] - point2[0];
    const dy = point1[1] - point2[1];
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Function to check if two arrays of arrays are equal
  function clustersEqual(clusters1, clusters2) {
    if (!clusters1 || !clusters2 || clusters1.length !== clusters2.length) {
      return false;
    }

    for (let i = 0; i < clusters1.length; i++) {
      if (clusters1[i].length !== clusters2[i].length) {
        return false;
      }
    }

    return true;
  }

  // Function to adjust cluster sizes to ensure equal number of points in each cluster
  function adjustClusterSizes(clusters, k) {
    // Calculate target cluster size
    const targetSize = Math.ceil(
      clusters.reduce((acc, cluster) => acc + cluster.length, 0) / k
    );

    // Adjust cluster sizes
    const adjustedClusters = [];
    let currentCluster = [];
    let clusterIndex = 0;

    for (const cluster of clusters) {
      for (const point of cluster) {
        currentCluster.push(point);

        if (currentCluster.length === targetSize) {
          adjustedClusters.push(currentCluster);
          currentCluster = [];
          clusterIndex++;
        }
      }
    }

    // Add any remaining points to the last cluster
    if (currentCluster.length > 0) {
      adjustedClusters.push(currentCluster);
    }

    return adjustedClusters;
  }

  const applyKMeans = () => {
    const data = userDetails.map((userDetail) => [
      userDetail.userId.lat,
      userDetail.userId.lon,
    ]);
    const k = 3; // Number of clusters, change as needed
    const clusters = kMeansEqualSize(data, k);
    setClusters(clusters);
  };

  const handleDriverChange = (clusterId, driverId) => {
    setSelectedDrivers({ ...selectedDrivers, [clusterId]: driverId });
  };

  const handleAssignDrivers = async () => {
    for (const clusterId of Object.keys(selectedDrivers)) {
      await axios.put(`/api/assign-driver/${clusterId}`, {
        driverId: selectedDrivers[clusterId],
      });
    }
    alert("Drivers assigned successfully");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h2>Admin Details</h2>
      <div>
        <label>
          Filter by Come to Office:
          <select
            value={comeToOfficeFilter}
            onChange={(e) => setComeToOfficeFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        <label>
          Filter by Period of Day:
          <select
            value={periodOfDayFilter}
            onChange={(e) => setPeriodOfDayFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Night">Night</option>
          </select>
        </label>
        <button onClick={fetchDetails}>Fetch</button>
      </div>
      {
        <div>
          <h3>User Details:</h3>
          <ul>
            {userDetails.map((user) => (
              <li key={user._id}>
                {user.userId.name} - {user.comeToOffice}, {user.periodOfDay},{" "}
                {user.userId.lat},{user.userId.lon}
              </li>
            ))}
          </ul>
        </div>
      }
      <div>
        <h1>Admin Details</h1>
        <button onClick={applyKMeans}>Apply K-Means</button>
        <div>
          {clusters.map((cluster, index) => (
            <div key={index}>
              <h2>Cluster {index + 1}</h2>
              <select
                value={selectedDrivers[cluster._id] || ""}
                onChange={(e) =>
                  handleDriverChange(cluster._id, e.target.value)
                }
              >
                <option value="">Select Driver</option>
                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name}
                  </option>
                ))}
              </select>
              <ul>
                {cluster.map((point, idx) => (
                  <li key={idx}>{point.join(", ")}</li>
                ))}
              </ul>
            </div>
          ))}
          <button onClick={handleAssignDrivers}>Assign Drivers</button>
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDetailsScreen;
