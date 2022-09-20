import { Avatar, ButtonGroup, Modal, Table, TableBody, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import { green } from '@mui/material/colors'
import { useState } from 'react';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
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
 

function createData(id, first, last, email, position, Salary, password, companyName) {
    return { id, first, last, email, position, Salary, password, companyName };
}

const rows = [
    createData(1, 'Employer','main', 'employer1@gmail.com', 'ice cream', 20, '123123123', 'Lemondrop'),
    createData(2, 'main','Employer', 'employer2@gmail.com', 'ice cream', 20, '123123123', 'Workbean'),
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

function Admin() {

    const [addModal, setAddModal] = useState(false)

    const router = useRouter()

    const handleAddEmpSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <DashboardLayout >
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
                    <Avatar sx={{ bgcolor: green[400], width: 100, height: 100 }}>A</Avatar>
                </Link>
                
                <div>
                    <Link href='../profile'>
                        <Typography style={{cursor: 'pointer'}} mt={2} variant='h4' margin={0} padding={0}>AdminName</Typography>
                    </Link>
                    <Typography mb={2}>Admin</Typography>
                    <Button onClick={() => router.push('/employer/form')} variant='contained'>+ Add Employer</Button>

                </div>

            
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>First Name</StyledTableCell>
                            <StyledTableCell>Last Name</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Company name</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <StyledTableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                {row.first}
                                </StyledTableCell>
                                <StyledTableCell >{row.last}</StyledTableCell>
                                <StyledTableCell >{row.email}</StyledTableCell>
                                <StyledTableCell >{row.companyName}</StyledTableCell>
                                <StyledTableCell >
                                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                            <Button color='success' onClick={() => router.push('/employer/form?id='+row.id)}>Update</Button>
                                            <Button color='error'>Delete</Button>
                                        </ButtonGroup>
                                    </StyledTableCell>
                            </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                open={addModal}
                onClose={() => setAddModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                    Add Employer
                    </Typography>
                    <form onSubmit={handleAddEmpSubmit}>
                        <TextField
                            type="text"
                            label='Company name'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                        />
                        <TextField
                            type="text"
                            label='First name'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                        />
                        <TextField
                            type="text"
                            label='Last name'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                        />
                        <TextField
                            type="text"
                            label='Email'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                        />
                        <TextField
                            type="password"
                            label='Password'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                        />

                        <Button variant='contained'>Submit</Button>
                    </form>
                </Box>
            </Modal>

        </DashboardLayout>
    )
}

export default Admin
