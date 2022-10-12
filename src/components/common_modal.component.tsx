import { Box, Divider } from '@mui/material';

import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import React from 'react';
import Rodal from 'rodal';
import ModalHeader from './modal_header.component';


interface CommonModalProps {
  open: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  height?: number | string;
  width?: number | string;
  children?: React.ReactNode;
  header?: React.ReactNode;
  title?:string;
  titleColor?: string;
  purpose?: 'CREATE'| 'EDIT';
  color?: string;
}


const CommonModal = (props: CommonModalProps) => {
  const { height, width, children, open, onClose, onOpen, title,titleColor, purpose,color } = props;
  return (
    <Rodal
      visible={open}
      onOpen={onOpen}
      onClose={onClose}
      enterAnimation="slideRight"
      leaveAnimation="slideRight"
      duration={100}
      customMaskStyles={{
        backgroundColor: '#070C27',
        opacity: 0.9
      }}
      customStyles={{
        width: `${width}`,
        height: `${height}`,
        marginRight: 0,
        backgroundColor: '#111634',
        zIndex: 9999,
        overflowY: 'scroll',
    
      }}
    >
      <Box
        style={{
          height: '10%',
          width: '100%',
          marginTop: '6%',
          display: 'flex',
          padding: '10px',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
       <ModalHeader title={title} titleColor ={titleColor} color={color} purpose={purpose}/>
        <HighlightOffTwoToneIcon onClick={onClose} />
      </Box>
      <Divider />
      {children}
    </Rodal>
  );
};

export default CommonModal;
