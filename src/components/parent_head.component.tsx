import { Typography } from '@mui/material';

interface ParentHeadProps {
    mainHeader: string;
    subHeader: string;
}

const ParentHead =(props: ParentHeadProps) =>{
    const {mainHeader,subHeader} = props;

  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
       {mainHeader}
      </Typography>
      <Typography variant="subtitle2">
        {subHeader}
      </Typography>
    </>
  );
}

export default ParentHead;
