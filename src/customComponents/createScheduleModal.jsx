import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CustomButton from '../../home/components/custom_button';
import album_cover from '../../../assets/java.png';
import { Link } from 'react-router-dom';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-container": {
    "& .MuiPaper-root": {
      width: "100%",
      maxWidth: "55%",
      minWidth: '800px',
      height: '60%',
      background: 'linear-gradient(to bottom, #353c5e 60%, #242323 100%)',
      borderRadius: theme.spacing(1)
    },
  },

}));

export default function CustomizedDialogs({ alertState, onClose }) {

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={alertState}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className='flex flex-row items-center justify-evenly' >
          <div className='h-[270px] w-[270px]'>
            <img className='w-full h-full object-fill rounded-lg ml-0.5' src={album_cover} alt="" />

          </div>
          <div className=' h-[250px] w-[270px] flex flex-col items-center space-y-4'>
            <p className='text-white font-bold text-2xl text-center'>
              Start listening with a free spotify account
            </p>
            <Link to={`login`}>
            <CustomButton content={'Sign up free'} classname={'bg-green-500'} />
            </Link>
            <CustomButton content={'Download app'} classname={'bg-transparent border text-white'} />
            <div className="flex justify-center">
              <p className="text-gray-400 mr-2 text-xs">
                Already have an account?
              </p>
              <Link className="text-white font-medium text-center hover:text-green-500 text-xs" to={`login`}>Log in</Link>
            </div>
          </div>

        </DialogContent>

      </BootstrapDialog>
    </React.Fragment>
  );
}



