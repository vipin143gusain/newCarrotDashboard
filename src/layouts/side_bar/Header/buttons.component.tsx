import { Box } from '@mui/material';
import HeaderNotifications from './Buttons/Notifications';
import HeaderSearch from './search.button';

function HeaderButtons() {
  return (
    <Box sx={{ mr: 1 }}>
      <HeaderSearch />
      <Box sx={{ mx: 0.5 }} component="span">
        <HeaderNotifications />
      </Box>
    </Box>
  );
}

export default HeaderButtons;

