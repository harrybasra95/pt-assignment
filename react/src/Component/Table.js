import React, { useEffect, useState } from 'react';
import { utils } from 'web3';
import { format } from 'date-fns';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { getTransactions } from '../Helpers/Ether';
import WriteDataModal from './WriteDataModal';
const rowsPerPage = 5;

const StyledTableCell = styled(TableCell)(() => ({
     [`&.${tableCellClasses.head}`]: {
          backgroundColor: '#ECF2F9',
          color: '#697584',
     },
     [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
     },
}));

const renderTableHeaders = () => {
     const headers = ['Tx Hash', 'Data', 'Date', 'Sender'];
     return headers.map((header) => (
          <StyledTableCell key={header}>{header}</StyledTableCell>
     ));
};

const minifyAddress = (addr) => {
     return `${addr.substring(0, 5)}...${addr.slice(-3)}`;
};

const renderDate = (date) => {
     return format(date * 1000, 'dd MMM, yyyy');
};

const BasicTable = () => {
     const [rows, setRows] = useState([]);
     const [paginatedData, setPaginatedData] = useState([]);
     const [page, setPage] = useState(0);
     const [showWriteDataModal, setShowWriteDataModal] = useState(false);

     const onPageChange = (e, page) => {
          setPage(page);
     };

     useEffect(() => {
          setPaginatedData(
               rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          );
     }, [page]);

     useEffect(() => {
          getTransactions().then((data) => {
               data.reverse();
               const parsedData = data.map(
                    ({ hash, data, from, timestamp }) => ({
                         hash,
                         data,
                         from,
                         timestamp,
                    })
               );
               setRows(parsedData);
               setPaginatedData(parsedData.slice(0, 5));
          });
     }, []);

     const handleWriteModalShow = () => setShowWriteDataModal(true);

     const handleWriteModalHide = () => setShowWriteDataModal(false);

     const renderWriteDataModal = () => {
          if (!showWriteDataModal) return;
          return <WriteDataModal onClose={handleWriteModalHide} />;
     };

     return (
          <>
               {renderWriteDataModal()}
               <Paper>
                    <TableContainer component={Paper}>
                         <Table aria-label="simple table" size="small">
                              <TableHead>
                                   <TableRow>
                                        <Typography
                                             sx={{ flex: '1 1 100%', p: 1 }}
                                             variant="h6"
                                             id="tableTitle"
                                             component="div"
                                        >
                                             Storage
                                        </Typography>
                                   </TableRow>
                                   <TableRow>{renderTableHeaders()}</TableRow>
                              </TableHead>
                              <TableBody>
                                   {paginatedData.map((row) => (
                                        <TableRow
                                             key={row.hash}
                                             sx={{
                                                  '&:last-child td, &:last-child th':
                                                       {
                                                            border: 0,
                                                       },
                                             }}
                                        >
                                             <TableCell
                                                  component="th"
                                                  scope="row"
                                             >
                                                  {minifyAddress(row.hash)}
                                             </TableCell>
                                             <TableCell>
                                                  {utils.hexToAscii(
                                                       '0x' +
                                                            row.data.slice(138)
                                                  )}
                                             </TableCell>
                                             <TableCell>
                                                  {renderDate(row.timestamp)}
                                             </TableCell>
                                             <TableCell>
                                                  {minifyAddress(row.from)}
                                             </TableCell>
                                        </TableRow>
                                   ))}
                              </TableBody>
                         </Table>
                    </TableContainer>
                    <Box
                         sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                         }}
                    >
                         <TablePagination
                              component="div"
                              rowsPerPageOptions={[]}
                              count={rows.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onPageChange={onPageChange}
                         />
                         <Button
                              sx={{ mx: 1 }}
                              variant="contained"
                              onClick={handleWriteModalShow}
                         >
                              Write data on chain
                         </Button>
                    </Box>
               </Paper>
          </>
     );
};

export default BasicTable;
