import { Avatar, ButtonGroup, Box, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import { green } from '@mui/material/colors'
import { useRouter } from 'next/router';
import Link from 'next/link';
import DashboardLayout from '../components/DashboardLayout'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { deleteAccount } from '../../store/reducers/account';
import { deleteEmployer } from '../../store/reducers/employer';
import { deleteCompany } from '../../store/reducers/company';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#192a56',
        color: theme.palette.common.white,
        textAlign: 'center'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: 'center'
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
    createData(1, 'Employer', 'main', 'employer1@gmail.com', 'ice cream', 20, '123123123', 'Lemondrop'),
    createData(2, 'main', 'Employer', 'employer2@gmail.com', 'ice cream', 20, '123123123', 'Workbean'),
];

function Admin() {

    const router = useRouter()

    const comp = useSelector(state => state.company)
    const emplyr = useSelector(state => state.employer)
    const dispatch = useDispatch()

    const handleDeleteEmployer = (id) => {
        dispatch(deleteAccount(id))
        dispatch(deleteEmployer(id))
    }

    return (
        <DashboardLayout >
            <Box
                className='bg-white p-3 rounded-md flex items-center gap-4 text-gray-700 shadow-md mb-6'

                data-testid="admin-basic-info"
            >
                <Link href='../profile'>
                    <Avatar sx={{ bgcolor: green[800], width: 100, height: 100, fontSize: '40px' }}>A</Avatar>
                </Link>

                <Box>
                    <Link href='../profile'>
                        <Typography style={{ cursor: 'pointer' }} mt={2} variant='h4' margin={0} padding={0}>AdminName</Typography>
                    </Link>
                    <Typography mb={2}>Admin</Typography>
                    <Box>
                        <Button className='bg-[#0055fb] text-white hover:bg-[#001b51] mr-4' onClick={() => router.push('/employer/form')} variant='contained'>+ Add Employer</Button>

                        <Button className='bg-[#0055fb] text-white hover:bg-[#001b51]' onClick={() => router.push('/company/form')} variant='contained'>+ Add Company</Button>

                    </Box>

                </Box>


            </Box>

            <Typography className='text-center my-4 font-bold text-2xl tracking-wide'>
                Employers
            </Typography>

            <TableContainer component={Paper} data-testid="employer-table">
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
                        {_.map(emplyr.employers, (row, index) => (
                            <StyledTableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {row.firstName}
                                </StyledTableCell>
                                <StyledTableCell >{row.lastName}</StyledTableCell>
                                <StyledTableCell >{row.email}</StyledTableCell>
                                <StyledTableCell >{row.company}</StyledTableCell>
                                <StyledTableCell >
                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                        <Button className='bg-[#33b33d]' color='success' onClick={() => router.push('/employer/form?id=' + row.id)}>Update</Button>
                                        <Button className='bg-[#dc3c18]' color='error' onClick={() => handleDeleteEmployer(index)}>Delete</Button>
                                    </ButtonGroup>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            <Typography className='text-center my-4 font-bold text-2xl tracking-wide'>
                Companies
            </Typography>
            <TableContainer component={Paper} data-testid="employer-table">
                <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Account ID</StyledTableCell>
                            <StyledTableCell>Company name</StyledTableCell>
                            <StyledTableCell>Leaves</StyledTableCell>
                            <StyledTableCell>Overtime Limit</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_.map(comp.companies, (row, index) => (
                            <StyledTableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {row.accountID}
                                </StyledTableCell>
                                <StyledTableCell >{row.name}</StyledTableCell>
                                <StyledTableCell >{row.leaves}</StyledTableCell>
                                <StyledTableCell >{row.overtimeLimit}</StyledTableCell>
                                <StyledTableCell >
                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                        <Button className='bg-[#33b33d]' color='success'>Update</Button>
                                        <Button onClick={() => dispatch(deleteCompany(index))} className='bg-[#dc3c18]' color='error'>Delete</Button>
                                    </ButtonGroup>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </DashboardLayout>
    )
}

export default Admin
