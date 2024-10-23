import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <a className="dropdown-item" href="#" onClick={() => logout()}>
      Logout
    </a>
  );
};

export default LogoutButton;
