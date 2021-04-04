import React from "react";
import {useAuth} from "../hooks/useAuthContext"

const Dashboard = ({ user }) => {
  const auth = useAuth()
  return (
    <div>
      <p>{auth.user.name}</p>
    </div>
  );
};

export default Dashboard;
