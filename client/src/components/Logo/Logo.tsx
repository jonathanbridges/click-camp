import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const LogoImage = styled('img')({
  height: '32px',
  width: 'auto',
  cursor: 'pointer',
});

const Logo = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <LogoImage 
        src="https://app-name-seeds.s3-us-west-1.amazonaws.com/clickcamp-text.png" 
        alt="ClickCamp" 
      />
    </Box>
  );
};

export default Logo; 