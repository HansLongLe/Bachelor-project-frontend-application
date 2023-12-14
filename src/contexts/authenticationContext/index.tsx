import { useAtom } from "jotai";
import { FunctionComponent, createContext, PropsWithChildren } from "react";
import { accessTokenAtom, useAuth } from "@remotes/coreAuth/auth";
import { AuthenticationContextState } from "../../definitions/types";

export const AuthenticationContext = createContext<AuthenticationContextState>({
  accessToken: "",
  customerId: "",
  authenticationTenantName: "",
  authenticationName: ""
});

export const AuthenticationProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [accessToken] = useAtom(accessTokenAtom);
  const auth = useAuth();

  const idTokenClaims = auth.instance.getActiveAccount()?.idTokenClaims;

  const customerId = (idTokenClaims?.["tenant"] as string) ?? "";

  const authenticationTenantName = (idTokenClaims?.["tenant_name"] as string) ?? "";
  const authenticationName = (idTokenClaims?.["name"] as string) ?? "";

  return (
    <AuthenticationContext.Provider
      value={{
        accessToken: accessToken ?? "",
        customerId,
        authenticationTenantName,
        authenticationName
      }}
    >
      {accessToken && auth ? children : <div />}
    </AuthenticationContext.Provider>
  );
};
