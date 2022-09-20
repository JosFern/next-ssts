import { Avatar, ButtonGroup, Modal, Table, TableBody, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
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
import styles from '../../styles/Home.module.css'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';

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
 

function createData(id, first, last, email, position, Salary, password) {
    return { id, first, last, email, position, Salary, password };
}

const rows = [
    createData( 1, 'Frozen','yoghurt', 'forze@gmail.com', 'ice cream', 20, '123123123'),
    createData( 2, 'Frozen','yoghurt', 'froze@gmail.com', 'ice cream', 20, '123123123'),
    createData( 3, 'Frozen','yoghurt', 'forza@gmail.com', 'ice cream', 20, '123123123'),
    createData( 4, 'Frozen','yoghurt', 'forzo@gmail.com', 'ice cream', 20, '123123123'),
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

function Employer() {

    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)

    const router = useRouter()

    const [editEmpInfo, setEditEmpInfo] = useState({
        firstname: '',
        lastname: '',
        email: '',
        position: '',
        password: '',
        index: 0
    })

    // handles modal for edit employee form and load the values of the employee on the inputs
    const toggleUpdateModal = (emp, index) => {

        const { first, last, email, position, password} = emp

        setEditModal(prevState => !prevState)


        setEditEmpInfo({firstname: first,lastname: last, email, position, password, index})
    }

    const handleAddEmpSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <DashboardLayout>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    color: '#fff',
                }}
            >

                <div className={styles.dbProfInfo}>
                    <Link href='../profile'>
                        <Avatar sx={{ bgcolor: green[400], width: 100, height: 100, fontSize: '40px' }}>E</Avatar>
                    </Link>
                    
                    <div>
                        <Link href='../profile'>
                            <Typography style={{cursor: 'pointer'}} mt={2} variant='h5' margin={0} padding={0}>EmployerName</Typography>
                        </Link>
                        <Typography mt={2} mb={2}>Employer</Typography>
                        <Button onClick={() => router.push('/employee/form')} variant='contained'>+ Add Employee</Button>
                    </div>

                </div>

                <div className={styles.dbLeaves}>
                    <MeetingRoomIcon sx={{ width: 70, height: 70 }}/>
                    <Typography mt={2} variant='h5' >Leaves: 2</Typography>
                </div>
                <div className={styles.dbOvertimeLimit}>
                    <MoreTimeIcon sx={{ width: 70, height: 70 }}/>
                    <Typography mt={2} variant='h5' >Overtime Limit: 20 hrs</Typography>
                </div>

                <div className={styles.dbAbsentLimit}>
                    <RunningWithErrorsIcon sx={{ width: 70, height: 70 }}/>
                    <Typography mt={2} variant='h5' >Absent Limit: 2</Typography>
                </div>

            
            </div>

            <div
                style={{
                    marginTop: '20px'
                }}
            >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>First Name</StyledTableCell>
                                <StyledTableCell>Last Name</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Position</StyledTableCell>
                                <StyledTableCell>Salary</StyledTableCell>
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
                                    <StyledTableCell >{row.position}</StyledTableCell>
                                    <StyledTableCell >{row.Salary}</StyledTableCell>
                                    <StyledTableCell >
                                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                            <Button color='info' onClick={() => router.push('/employee/'+row.id)} >Info</Button>
                                            <Button color='success' onClick={() => router.push('/employee/form?id='+row.id)}>Update</Button>
                                            <Button color='error'>Delete</Button>
                                        </ButtonGroup>
                                    </StyledTableCell>
                                </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            {/*MODAL FOR ADD EMPLOYEE */}
            <Modal
                open={addModal}
                onClose={() => setAddModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                    Add Employee
                    </Typography>
                    <form onSubmit={handleAddEmpSubmit}>
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
                            type="text"
                            label='Position'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                        />
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                margin: '10px 0' 
                            }}
                        >
                            <TextField
                                type='number'
                                label='Overtime'
                            />
                            <TextField
                                type='number'
                                label='Absences'
                            />
                            <TextField
                                type='number'
                                label='leaves'
                            />
                        </div>

                        <Button variant='contained'>Submit</Button>
                    </form>
                </Box>
            </Modal>

            {/*MODAL FOR ADD EMPLOYEE */}

            <Modal
                open={editModal}
                onClose={() => setEditModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                    Add Employee
                    </Typography>
                    <form onSubmit={handleAddEmpSubmit}>
                        <TextField
                            defaultValue={editEmpInfo.firstname}
                            type="text"
                            label='First name'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                        />
                        <TextField
                            defaultValue={editEmpInfo.lastname}
                            type="text"
                            label='Last name'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                        />
                        <TextField
                            defaultValue={editEmpInfo.email}
                            type="text"
                            label='Email'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                        />
                        <TextField
                            defaultValue={editEmpInfo.position}
                            type="text"
                            label='Position'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                        />

                        <TextField
                            defaultValue={editEmpInfo.password}
                            type="text"
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

export default Employer
