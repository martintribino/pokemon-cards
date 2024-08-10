import { CssBaseline } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import Hero from "./Hero";
import LoggedOut from "./LoggedOut";

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <CssBaseline />
      {isAuthenticated ? (
        <Hero />
      ) : (
        <LoggedOut />
      )}
    </div>
  );
};

export default Dashboard;
