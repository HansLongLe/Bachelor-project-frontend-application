import { useContext } from "react";
import { AuthenticationContext } from "../contexts/authenticationContext";

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw Error("AuthenticationContext was not initialized");
  }

  return {
    userId: context.customerId,
    token: context.accessToken,
    authenticationName: context.authenticationName,
    authenticationTenantName: context.authenticationTenantName
  };
};
