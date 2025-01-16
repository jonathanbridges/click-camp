import { AppBar, Avatar, Box, Button, Container, Menu, MenuItem, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import { QueryKeys } from '../../lib/queryKeys';
import { rootRoute } from '../../routes/__root';
import AuthModalController from '../AuthModal/AuthModalController';
import { ModalMode } from '../AuthModal/types';
import Logo from '../Logo/Logo';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export default function Navbar() {
  const { auth: { user, logout, isLoading }, queryClient, redirect } = rootRoute.useRouteContext();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode | null>(null);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function toggleUserMenu() {
    setIsUserMenuOpen((prev) => !prev);
  }

  const handleLoginButtonClick = (mode: ModalMode | null = null): void => {
    setFieldErrors({});
    setModalMode(mode);
  };

  const handleCloseModal = () => {
    setModalMode(null);
  };

  const handleLogout = async () => {
    toggleUserMenu();
    await logout();
    
    queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] });
    redirect({ to: '/' });
  };

  const displayFieldErrors = (errors: Record<string, string> = {}): void => {
    setFieldErrors(errors);
  };

  return (
    <>
      <StyledAppBar position="sticky">
        <Container>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <Box 
                component={Link} 
                to="/"
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  '&:hover': {
                    opacity: 0.8
                  }
                }}
              >
                <Logo />
              </Box>
              <Button
                component={Link}
                to="/listings"
                sx={{
                  ml: 4,
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                Listings
              </Button>
            </Box>

            {!isLoading && (
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {user ? (
                  <>
                    <Button
                      ref={anchorRef}
                      onClick={toggleUserMenu}
                      sx={{ 
                        textTransform: 'none',
                        color: 'text.primary',
                      }}
                      startIcon={
                        <Avatar 
                          sx={{ width: 32, height: 32 }}
                          src={user.avatar_url ?? undefined}
                        >
                          {user.username[0].toUpperCase()}
                        </Avatar>
                      }
                    >
                      {user.username}
                    </Button>
                    <Menu
                      anchorEl={anchorRef.current}
                      open={isUserMenuOpen}
                      onClose={toggleUserMenu}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem component={Link} to="/profile">Profile</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Button 
                      onClick={() => handleLoginButtonClick(ModalMode.LOGIN)}
                      sx={{ 
                        color: 'text.primary',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        }
                      }}
                    >
                      Log in
                    </Button>
                    <Button 
                      variant="outlined"
                      onClick={() => handleLoginButtonClick(ModalMode.DEMO_LOGIN)}
                      sx={{ 
                        minWidth: 120,
                        py: 1,
                        px: 3,
                        borderRadius: 28,
                        borderColor: 'grey.300',
                        color: 'text.primary',
                        bgcolor: 'background.paper',
                        '&:hover': {
                          bgcolor: 'grey.50',
                          borderColor: 'grey.400'
                        }
                      }}
                    >
                      Demo Login
                    </Button>
                    <Button 
                      variant="contained"
                      onClick={() => handleLoginButtonClick(ModalMode.SIGNUP)}
                      sx={{ 
                        minWidth: 120,
                        py: 1,
                        px: 3,
                        borderRadius: 28,
                        bgcolor: 'primary.main',
                        color: 'common.white',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        }
                      }}
                    >
                      Sign up
                    </Button>
                  </>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>

      <AuthModalController
        onClose={handleCloseModal}
        mode={modalMode}
        onChangeMode={handleLoginButtonClick}
        fieldErrors={fieldErrors}
        displayFieldErrors={displayFieldErrors}
      />
    </>
  );
} 