import { AppBar, Toolbar, Button, Box, Container, Avatar, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import Logo from '../Logo/Logo';
import AuthModalController from '../AuthModal/AuthModalController';
import { useAuth } from '../../hooks/useAuth';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export default function Navbar() {
  const { user, isLoading, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'login' | 'signup'>('login');
  const [isDemoLogin, setIsDemoLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleOpenModal = (mode: 'login' | 'signup', isDemo = false) => {
    setModalMode(mode);
    setIsDemoLogin(isDemo);
    setIsModalOpen(true);
  };

  const handleOpenMenu = () => {
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    handleCloseMenu();
    await logout();
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
                      onClick={handleOpenMenu}
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
                      open={menuOpen}
                      onClose={handleCloseMenu}
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
                      onClick={() => handleOpenModal('login')}
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
                      onClick={() => handleOpenModal('login', true)}
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
                      onClick={() => handleOpenModal('signup')}
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
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialMode={modalMode}
        isDemoLogin={isDemoLogin}
      />
    </>
  );
} 