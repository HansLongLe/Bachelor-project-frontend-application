import "./style.scss";
import {
  Box,
  IconButton,
  LayoutContent,
  LayoutLogo,
  LayoutProvider,
  LayoutTopBar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  UserIcon
} from "@kamstrup/kfl";
import Dashboard from "../dashboard/dashboard";
import { useEffect, useState } from "react";
import { createHubConnection, startConnection } from "../../services/signalRService";
import { useAuth } from "@remotes/coreAuth/auth";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useDispatch } from "react-redux";
import { setConnection } from "../../redux/slices/connectionSlice";
import { useTranslations } from "../../hooks/useTranslation";

const App = () => {
  const translations = useTranslations();
  const auth = useAuth();
  const { authenticationName, authenticationTenantName, token } = useAuthentication();
  const dispatch = useDispatch();
  const [userMenuAnchor, setUserMenuAnchor] = useState<(EventTarget & Element) | undefined>(
    undefined
  );

  useEffect(() => {
    const connection = createHubConnection(token);
    startConnection(connection);
    dispatch(setConnection(connection));
  }, [dispatch, token]);

  const userClick = (event: React.MouseEvent) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(undefined);
  };
  const renderUserMenu = () => {
    return (
      <Menu
        id={"userMenu"}
        anchorEl={userMenuAnchor}
        open={userMenuAnchor !== undefined}
        onClose={handleUserMenuClose}
      >
        <MenuItem
          onClick={() => {
            auth.instance.logoutRedirect({
              postLogoutRedirectUri: `${process.env.REACT_APP_LOGOUT_URL}${encodeURI(
                window.location.href
              )}`
            });
          }}
        >
          <Typography variant="body1">{translations.sign_out}</Typography>
        </MenuItem>
      </Menu>
    );
  };

  return (
    <LayoutProvider>
      <LayoutTopBar>
        <Toolbar
          sx={{
            justifyContent: "space-between"
          }}
        >
          <LayoutLogo />
          <Typography variant="h2">Support landing page</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                "&:hover": {
                  cursor: "pointer"
                }
              }}
              onClick={(ev) => {
                userClick(ev);
              }}
            >
              <IconButton>
                <UserIcon
                  sx={{
                    color: (theme) => theme.palette.common.black
                  }}
                />
              </IconButton>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <Typography
                  variant="h3"
                  title={authenticationName}
                  sx={{
                    color: (theme) => theme.palette.common.black,
                    maxWidth: "100px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                  }}
                >
                  {authenticationName}
                </Typography>
                <Typography
                  variant="body2"
                  title={authenticationTenantName}
                  sx={{
                    color: (theme) => theme.palette.common.black,
                    maxWidth: "100px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                  }}
                >
                  {authenticationTenantName}
                </Typography>
              </Box>
            </Box>
          </Box>
          {renderUserMenu()}
        </Toolbar>
      </LayoutTopBar>
      <LayoutContent>
        <Dashboard />
      </LayoutContent>
    </LayoutProvider>
  );
};

App.displayName = "App";

export default App;
