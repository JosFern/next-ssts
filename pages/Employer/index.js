import { Avatar, ButtonGroup, Table, TableBody, TableContainer, TableHead, TableRow, Tab, Tabs } from '@mui/material'
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
import { useDispatch, useSelector } from 'react-redux';
import _, { filter, map, upperCase } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import employee, { deleteEmployee, setEmployees } from '../../store/reducers/employee';
import { deleteAccount } from '../../store/reducers/account';
import { setCompany } from '../../store/reducers/company';
import BusinessIcon from '@mui/icons-material/Business';
import { format, parseISO } from 'date-fns';
import { approveRequest, disapproveRequest } from '../../store/reducers/leaves';
import { approveOTRequest, disapproveOTRequest } from '../../store/reducers/overtime';
import { axiosAuth, verifyParams } from '../../auth/authParams';

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


function Employer() {

    const router = useRouter()

    const user = useSelector(state => state.logged)
    const emp = useSelector(state => state.employee)
    const comp = useSelector(state => state.company)
    const leave = useSelector(state => state.leaves)
    const ot = useSelector(state => state.overtime)

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    const dispatch = useDispatch()

    useEffect(() => {
        const initializeApi = async () => {
            await getEmployerInfo()
            await getEmployeesInfo()
        }

        initializeApi()
        console.log("employer page mounted");

    }, [dispatch, getEmployerInfo, getEmployeesInfo])

    //HANDLES GETTING EMPLOYER ADDITIONAL INFO
    const getEmployerInfo = useCallback(async () => {
        const employer = await axiosAuth(user.loggedIn.token).get(`/employer/${user.loggedIn.id}`)
            .catch(err => console.log("error: " + err))

        if (employer.status === 200) {
            const data = await verifyParams(employer.data)
            dispatch(setCompany(data))
        }

    }, [dispatch, user.loggedIn.token, user.loggedIn.id])

    //HANDLES GETTING COMPANY EMPLOYEES
    const getEmployeesInfo = useCallback(async () => {
        const employees = await axiosAuth(user.loggedIn.token).get('/employee')
            .catch(err => console.log("error: " + err))

        if (employees.status === 200) {
            const data = await verifyParams(employees.data)
            const filterEmployees = filter(data, { companyID: comp.company.id })
            dispatch(setEmployees(filterEmployees))
        }
    }, [dispatch, user.loggedIn.token, comp.company.id])

    //HANDLES EMPLOYEE DELETION
    const deleteEmployeeInfo = async (id) => {
        const deleteEmployee = await axiosAuth(user.loggedIn.token).delete(`/employee/${id}`)
            .catch(err => console.log("error: " + err))

        if (deleteEmployee?.status === 200) getEmployeesInfo()
    }

    const getEmployeeLeaveRequests = (leaves) => {

        const getAssocEmp = _.chain(leaves).map((leave) => {
            const employee = _.find(emp.employees, { accountID: leave.employeeId })
            if (employee?.associatedCompany === comp.company.accountID) {
                return { ...leave, name: employee.firstName }
            }
            return null

        }).filter((leave) => { return leave }).value()

        return getAssocEmp;
    }

    const getEmployeeOTRequests = (overtimes) => {

        const getAssocEmp = _.chain(overtimes).map((overtime) => {
            const employee = _.find(emp.employees, { accountID: overtime.employeeId })
            if (employee?.associatedCompany === comp.company.accountID) {
                return { ...overtime, name: employee.firstName }
            }
            return null
        }).filter((overtime) => { return overtime }).value()

        return getAssocEmp;
    }

    return (
        <DashboardLayout>

            <Box
                className='flex justify-between items-center gap-3 text-white h-[160px]'
                data-testid="basic-profile-info"
            >

                <Box className='bg-[#fba600] flex p-4 rounded-md gap-4 h-full'>
                    <Link href='../profile'>
                        <Avatar sx={{ bgcolor: blue[800], width: 100, height: 100, fontSize: '40px' }}>{upperCase(user.loggedIn.firstName[0])}</Avatar>
                    </Link>

                    <Box>
                        <Link href='../profile'>
                            <Typography data-testid="name" style={{ cursor: 'pointer' }} mt={2} variant='h5' margin={0} padding={0}>{user.loggedIn.firstName} {user.loggedIn.lastName}</Typography>
                        </Link>
                        <Typography mt={2} mb={2}>Employer</Typography>
                        <Button data-testid="add-employer" className='bg-[#44bd32] text-white hover:bg-[#4cd137]' onClick={() => router.push('/employee/form')} variant='contained'>+ Add Employee</Button>
                    </Box>

                </Box>

                <Box className='bg-[#8e44ad] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
                    <MeetingRoomIcon sx={{ width: 70, height: 70 }} />
                    <Typography data-testid="leaves" mt={2} variant='h5' >Leaves: {comp.company?.allocateLeaves}</Typography>
                </Box>
                <Box className='bg-[#0097e6] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
                    <MoreTimeIcon sx={{ width: 70, height: 70 }} />
                    <Typography data-testid="overtime-limit" mt={2} variant='h5' >Overtime Limit: {comp.company?.allocateOvertime} hrs</Typography>
                </Box>

                <Box className='bg-[#d35400] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
                    <BusinessIcon sx={{ width: 70, height: 70 }} />
                    <Typography data-testid="absent-limit" mt={2} variant='h5' >{comp.company?.name}</Typography>
                </Box>


            </Box>

            <Box className='bg-white w-full'>
                <Box>
                    <Tabs value={tabIndex} onChange={handleTabChange}>
                        <Tab label="Employees" />
                        <Tab label="Leave Requests" />
                        <Tab label="Overtime Requests" />
                    </Tabs>
                </Box>
                <Box>
                    {/*----------------------LIST OF EMPLOYEES TAB--------------------- */}
                    {tabIndex === 0 && (
                        <TableContainer component={Paper} data-testid="employee-table">
                            <Table sx={{ minWidth: 700 }}>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>First Name</StyledTableCell>
                                        <StyledTableCell>Last Name</StyledTableCell>
                                        <StyledTableCell>Position</StyledTableCell>
                                        <StyledTableCell>Salary Per Hour</StyledTableCell>
                                        <StyledTableCell>Employee Type</StyledTableCell>
                                        <StyledTableCell>Actions</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {map(emp.employees, (row, index) => (
                                        <StyledTableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <StyledTableCell>
                                                {row.firstname}
                                            </StyledTableCell>
                                            <StyledTableCell >{row.lastname}</StyledTableCell>
                                            <StyledTableCell >{row.pos}</StyledTableCell>
                                            <StyledTableCell >{row.rate}</StyledTableCell>
                                            <StyledTableCell >{row.empType === 'fulltime' ? 'Full Time' : 'Part Time'}</StyledTableCell>
                                            <StyledTableCell >
                                                <ButtonGroup variant="contained">
                                                    <Button className='bg-[#0e79e1]' color='info' onClick={() => router.push('/employee/' + row.employeeID)} >Info</Button>
                                                    <Button className='bg-[#33b33d]' color='success' onClick={() => router.push('/employee/form?id=' + row.employeeID)}>Update</Button>
                                                    <Button onClick={() => deleteEmployeeInfo(row.employeeID)} className='bg-[#dc3c18]' color='error'>Delete</Button>
                                                </ButtonGroup>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    {/*----------------------LIST OF REQUEST LEAVES TAB--------------------- */}
                    {/* {tabIndex === 1 && (
                        <TableContainer component={Paper} data-testid="employer-table">
                            <Table sx={{ minWidth: 700 }}>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Account ID</StyledTableCell>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell>Date Started</StyledTableCell>
                                        <StyledTableCell>Date Ended</StyledTableCell>
                                        <StyledTableCell>Reason</StyledTableCell>
                                        <StyledTableCell>Actions</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {_.map(getEmployeeLeaveRequests(leave.requestLeaves), (row, index) => (
                                        <StyledTableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <StyledTableCell >{row.employeeId}</StyledTableCell>
                                            <StyledTableCell >{row.name}</StyledTableCell>
                                            <StyledTableCell >{format(parseISO(row.dateStarted), 'PPpp')}</StyledTableCell>
                                            <StyledTableCell >{format(parseISO(row.dateEnded), 'PPpp')}</StyledTableCell>
                                            <StyledTableCell >{row.reason}</StyledTableCell>
                                            <StyledTableCell >
                                                <ButtonGroup variant="contained">
                                                    <Button onClick={() => dispatch(approveRequest(index))} className='bg-[#33b33d]' color='success' >Approve</Button>
                                                    <Button onClick={(index) => dispatch(disapproveRequest(index))} className='bg-[#dc3c18]' color='error'>Disapprove</Button>
                                                </ButtonGroup>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )} */}
                    {/*----------------------LIST OF REQUEST OVERTIME TAB--------------------- */}
                    {/* {tabIndex === 2 && (
                        <TableContainer component={Paper} data-testid="employer-table">
                            <Table sx={{ minWidth: 700 }}>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Account ID</StyledTableCell>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell>Date Started</StyledTableCell>
                                        <StyledTableCell>Date Ended</StyledTableCell>
                                        <StyledTableCell>Reason</StyledTableCell>
                                        <StyledTableCell>Actions</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {_.map(getEmployeeOTRequests(ot.requestOvertime), (row, index) => (
                                        <StyledTableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <StyledTableCell >{row.employeeId}</StyledTableCell>
                                            <StyledTableCell >{row.name}</StyledTableCell>
                                            <StyledTableCell >{format(parseISO(row.dateStarted), 'PPpp')}</StyledTableCell>
                                            <StyledTableCell >{format(parseISO(row.dateEnded), 'PPpp')}</StyledTableCell>
                                            <StyledTableCell >{row.reason}</StyledTableCell>
                                            <StyledTableCell >
                                                <ButtonGroup variant="contained">
                                                    <Button onClick={() => dispatch(approveOTRequest(index))} className='bg-[#33b33d]' color='success' >Approve</Button>
                                                    <Button onClick={(index) => dispatch(disapproveOTRequest(index))} className='bg-[#dc3c18]' color='error'>Disapprove</Button>
                                                </ButtonGroup>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )} */}

                </Box>
            </Box>

        </DashboardLayout>
    )
}

export default Employer
