import { Avatar, ButtonGroup, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import { blue } from '@mui/material/colors'
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import Link from 'next/link';
import DashboardLayout from '../components/DashboardLayout'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useEffect } from 'react';
import { setEmployees } from '../../store/reducers/employee';

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

function createData(id, first, last, email, position, password) {
    return { id, first, last, email, position, password };
}

const rows = [
    createData(1, 'Frozen', 'yoghurt', 'forze@gmail.com', 'ice cream', 20, '123123123'),
    createData(2, 'Frozen', 'yoghurt', 'froze@gmail.com', 'ice cream', 20, '123123123'),
    createData(3, 'Frozen', 'yoghurt', 'forza@gmail.com', 'ice cream', 20, '123123123'),
    createData(4, 'Frozen', 'yoghurt', 'forzo@gmail.com', 'ice cream', 20, '123123123'),
];

function Employer() {

    const router = useRouter()

    const emplyr = useSelector(state => state.employer)
    const user = useSelector(state => state.logged)
    const emp = useSelector(state => state.employee)
    const dispatch = useDispatch()

    const employees = [
        //sample employee data
        {
            employeeType: 'fulltime',
            accountID: 2,
            employeeID: 102,
            firstName: 'jose',
            lastName: 'Basic',
            associatedCompany: 1,
            salaryPerHour: 10,
            dailyWage: 0,
            currMonthSal: 0
        },
        {
            employeeType: 'fulltime',
            accountID: 1,
            employeeID: 101,
            firstName: 'Joselito',
            lastName: 'Basic',
            associatedCompany: 1,
            salaryPerHour: 15,
            dailyWage: 0,
            currMonthSal: 0
        }
    ]

    // useEffect(() => {
    //     const initalizeReducers = async () => {
    //         await dispatch(setEmployees(employees))
    //     }

    //     initalizeReducers()
    // }, [dispatch])

    return (
        <DashboardLayout>

            <Box
                className='flex justify-between items-center gap-3 text-white h-[160px]'
                data-testid="basic-profile-info"
            >

                <Box className='bg-[#fba600] flex p-4 rounded-md gap-4 h-full'>
                    <Link href='../profile'>
                        <Avatar sx={{ bgcolor: blue[800], width: 100, height: 100, fontSize: '40px' }}>E</Avatar>
                    </Link>

                    <Box>
                        <Link href='../profile'>
                            <Typography data-testid="name" style={{ cursor: 'pointer' }} mt={2} variant='h5' margin={0} padding={0}>{user.loggedIn.firstName}</Typography>
                        </Link>
                        <Typography mt={2} mb={2}>Employer</Typography>
                        <Button data-testid="add-employer" className='bg-[#44bd32] text-white hover:bg-[#4cd137]' onClick={() => router.push('/employee/form')} variant='contained'>+ Add Employee</Button>
                    </Box>

                </Box>

                <Box className='bg-[#8e44ad] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
                    <MeetingRoomIcon sx={{ width: 70, height: 70 }} />
                    <Typography data-testid="leaves" mt={2} variant='h5' >Leaves: 6</Typography>
                </Box>
                <Box className='bg-[#0097e6] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
                    <MoreTimeIcon sx={{ width: 70, height: 70 }} />
                    <Typography data-testid="overtime-limit" mt={2} variant='h5' >Overtime Limit: 30 hrs</Typography>
                </Box>

                <Box className='bg-[#d35400] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
                    <RunningWithErrorsIcon sx={{ width: 70, height: 70 }} />
                    <Typography data-testid="absent-limit" mt={2} variant='h5' >Absent Limit: 2</Typography>
                </Box>


            </Box>

            <Box
                style={{
                    marginTop: '20px'
                }}
            >
                <TableContainer component={Paper} data-testid="employee-table">
                    <Table sx={{ minWidth: 700 }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell>First Name</StyledTableCell>
                                <StyledTableCell>Last Name</StyledTableCell>
                                <StyledTableCell>Salary Per Hour</StyledTableCell>
                                <StyledTableCell>Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {_.map(emp.employees, (row, index) => (
                                <StyledTableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell>
                                        {row.employeeID}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.firstName}
                                    </StyledTableCell>
                                    <StyledTableCell >{row.lastName}</StyledTableCell>
                                    <StyledTableCell >{row.salaryPerHour}</StyledTableCell>
                                    <StyledTableCell >
                                        <ButtonGroup variant="contained">
                                            <Button className='bg-[#0e79e1]' color='info' onClick={() => router.push('/employee/' + row.id)} >Info</Button>
                                            <Button className='bg-[#33b33d]' color='success' onClick={() => router.push('/employee/form?id=' + row.id)}>Update</Button>
                                            <Button className='bg-[#dc3c18]' color='error'>Delete</Button>
                                        </ButtonGroup>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </DashboardLayout>
    )
}

export default Employer
