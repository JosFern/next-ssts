import { useState } from 'react';
import { Avatar, TextField, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import Container from '@mui/material/Container'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Link from 'next/link';
import DashboardLayout from '../components/DashboardLayout'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(start, end, reason) {
  return { start, end, reason};
}

const rows = [
  createData('Sep 13, 22', 'Sep 15, 22', 'fever'),
  createData('Nov 14,22', 'Nov 18,22', 'holiday vacation'),
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
};

function Employee() {

    const [open, setOpen] = useState(false)

    return (
        <DashboardLayout>

            <div
                style={{
                    background: '#ffffff',
                    padding: '1rem',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    color: 'gray',
                    boxShadow: '1px 1px 10px',
                    marginBottom: '15px'
                }}
            >
                <Link href='../profile'>
                    <Avatar sx={{ bgcolor: blue[400], width: 100, height: 100 }}>J</Avatar>
                </Link>
                
                <div>
                    <Link href='../profile'>
                        <Typography style={{cursor: 'pointer'}} mt={2} variant='h4' margin={0} padding={0}>Joselito</Typography>
                    </Link>
                    <Typography mb={2}>Employee</Typography>
                    <Button variant='contained' onClick={() => setOpen(true)}>Request leave</Button>

                </div>

                <div>
                    <Typography mt={2} >Leaves: 2</Typography>
                    <Typography mt={2} >Absences: 2</Typography>
                    <Typography mt={2} >Salary/Hour: 390</Typography>
                    <Typography mt={2} >Monthly Salary: 10,000</Typography>
                </div>

            
            </div>

            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Date Started</StyledTableCell>
                            <StyledTableCell>Date Ended</StyledTableCell>
                            <StyledTableCell>Reason</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {row.start}
                                </StyledTableCell>
                                <StyledTableCell >{row.end}</StyledTableCell>
                                <StyledTableCell >{row.reason}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Request leave form
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Start Date:
                    </Typography>
                    <TextField
                        type="date"
                        variant="outlined"
                        color="secondary"
                        margin='normal'
                        fullWidth
                        required
                    />

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        End Date:
                    </Typography>
                    <TextField
                        type="date"
                        variant="outlined"
                        color="secondary"
                        margin='normal'
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        margin='normal'
                        label='Reason'
                        fullWidth
                        required
                    />

                    <Button variant='contained'>Submit</Button>
                </Box>
            </Modal>
        </DashboardLayout>
    )
}

export default Employee
