import {
  AppBar,
  Box,
  Button,
  Container,
  MenuItem,
  Toolbar
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const TopBar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '999px',
            bgcolor:
              theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.4)'
                : 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(24px)',
            maxHeight: 40,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
          })}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              ml: '-18px',
              px: 0,
            }}
          >
            <Box sx={{ paddingLeft: 5, paddingRight: 5, display: { xs: 'none', md: 'flex' } }}>
              <img alt="CookUnity" src="https://cu-landings-web-assets.imgix.net/assets/icons/cu-logo.svg"></img>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <MenuItem onClick={() => navigate('')} sx={{ py: '6px', px: '12px' }}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={() => navigate('cards')} sx={{ py: '6px', px: '12px' }}>
                Go to Cards
              </MenuItem>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 0.5,
              alignItems: 'center',
            }}
          >
            {
              isAuthenticated ?

                <MenuItem>
                  <Button
                    color="primary"
                    variant="contained"
                    component="a"
                    onClick={() => logout()}
                    target="_blank"
                    sx={{ width: '100%' }}
                  >
                    Log out
                  </Button>
                </MenuItem>
              :
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      onClick={() => navigate('register')}
                      target="_blank"
                      sx={{ width: '100%' }}
                    >
                      Register
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      onClick={() => navigate('login')}
                      target="_blank"
                      sx={{ width: '100%' }}
                    >
                      Log in
                    </Button>
                  </MenuItem>
                </Box>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopBar;
