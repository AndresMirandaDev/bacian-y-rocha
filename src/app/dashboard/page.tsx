import React, { useEffect, useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';

const Dashboard = () => {
  //   const [loading, setLoading] = useState(true);
  //   useEffect(() => {
  //     const checkIfInitialLoad = !localStorage.getItem('isInitialLoad');

  //     if (checkIfInitialLoad) {
  //       // It's the initial load (refreshing the page)
  //       localStorage.setItem('isInitialLoad', 'true');
  //       setLoading(true); // Set loading to true when refreshing
  //     } else {
  //       // It's not the initial load
  //       localStorage.removeItem('isInitialLoad');
  //       setLoading(false); // Set loading to false after rendering
  //     }
  //   }, []);

  //   if (loading) return <LoadingScreen />;
  return <div>Dashboard</div>;
};

export default Dashboard;
