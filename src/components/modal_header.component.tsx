import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Grid, Typography } from '@mui/material';

interface ModalHeaderProps {
  title?: string;
  purpose?: 'CREATE' | 'EDIT';
  color?: string;
  titleColor?: string;
}
const ModalHeader = (props: ModalHeaderProps) => {
  const { title, titleColor, color, purpose } = props;
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      
    >
      {purpose === 'CREATE' ? <ControlPointTwoToneIcon fontSize='large' style={{color:color}} /> : <EditTwoToneIcon style={{color:color}}  />}
      <Typography variant="h3" color={titleColor} sx={{ml:2}}>
        {title}
      </Typography>
    </Grid>
  );
};

export default ModalHeader;
