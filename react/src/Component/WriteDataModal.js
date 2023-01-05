import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as ethers from '../Helpers/Ether';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: 400,
     bgcolor: 'background.paper',
     boxShadow: 24,
     borderRadius: 1,
     minHeight: '50%',
     display: 'flex',
     flexDirection: 'column',
};

const renderModalHeader = () => {
     return (
          <Box
               sx={{
                    p: 1,
                    boxShadow: 1,
               }}
          >
               <Typography id="modal-modal-title" variant="h6" component="h2">
                    Write data on chain
               </Typography>
          </Box>
     );
};

const WriteDataModal = ({ onClose }) => {
     const [isLoading, setIsLoading] = useState(false);
     const [errorMessage, setErrorMessage] = useState(null);
     const [message, setMessage] = useState('');

     useEffect(() => {
          const isMetamaskInstalled = ethers.isMetamaskInstalled();
          if (errorMessage === null && !isMetamaskInstalled) {
               return setErrorMessage('Please install metamask');
          }
          const isMetamaskEnabled = ethers.isMetamaskEnabled();
          if (errorMessage === null && !isMetamaskEnabled) {
               return setErrorMessage('Please connect metamask');
          }
          if (ethers.isReady()) {
               ethers.load();
          }
     }, []);

     const handleInputChange = ({ target: { value } }) => {
          setMessage(value);
     };

     const writeData = async () => {
          if (!message) return;
          setIsLoading(true);
          try {
               await ethers.writeData(message);
               onClose();
          } catch (error) {
               alert('User rejected the transaction');
          } finally {
               setIsLoading(false);
          }
     };

     const renderBody = () => {
          return (
               <>
                    <Box
                         sx={{
                              p: 1,
                              flex: 1,
                         }}
                    >
                         <TextField
                              sx={{
                                   width: '100%',
                              }}
                              id="filled-basic"
                              label="Data"
                              variant="filled"
                              size="small"
                              onChange={handleInputChange}
                              value={message}
                         />
                    </Box>
                    <Box
                         sx={{
                              p: 1,
                              display: 'flex',
                              justifyContent: 'flex-end',
                              alignItems: 'center',
                         }}
                    >
                         {isLoading && (
                              <Box sx={{ flex: 1, px: 1 }}>
                                   <CircularProgress size={15} />
                              </Box>
                         )}
                         <Button
                              sx={{ mx: 1 }}
                              variant="outlined"
                              onClick={onClose}
                              disabled={isLoading}
                         >
                              Cancel
                         </Button>
                         <Button
                              sx={{ mx: 1 }}
                              variant="contained"
                              onClick={writeData}
                              disabled={isLoading}
                         >
                              Write
                         </Button>
                    </Box>
               </>
          );
     };

     const renderErrorBox = () => {
          return (
               <Box>
                    <p>{errorMessage}</p>
               </Box>
          );
     };

     return (
          <Modal
               open={true}
               onClose={onClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
          >
               <Box sx={style}>
                    {renderModalHeader()}
                    {errorMessage ? renderErrorBox() : renderBody()}
               </Box>
          </Modal>
     );
};

WriteDataModal.propTypes = {
     onClose: PropTypes.func,
};

export default WriteDataModal;
