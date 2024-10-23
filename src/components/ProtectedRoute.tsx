import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SpinLoader from "./Loader";

interface ProtectedRouteProps {
  element: React.FC;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Component,
  ...rest
}) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <SpinLoader isLoading={true} />;
  } else {
    <SpinLoader isLoading={false} />;
  }

  // Si el usuario no está autenticado, redirigir a la página de login de Auth0
  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  // Si está autenticado, renderizar el componente protegido
  return isAuthenticated ? <Component /> : null;
};
