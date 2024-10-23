import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

interface ProtectedRouteProps {
  element: React.FC;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Component,
  ...rest
}) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
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
