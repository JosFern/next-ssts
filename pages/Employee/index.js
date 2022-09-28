import { useEffect, useState } from 'react';
import { Avatar, TextField, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
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
import DashboardLayout from '../components/DashboardLayout';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import PaidIcon from '@mui/icons-material/Paid';
import { useDispatch, useSelector } from 'react-redux';
import { computeRemainingLeaves, setLeaves } from '../../store/reducers/leaves';
import { addDays, parseISO, formatISO, format, isSameMonth } from 'date-fns';
import { computeTotalAbsences, setAbsences } from '../../store/reducers/absences';
import { computeTotalOvertime, setOvertime } from '../../store/reducers/overtime';
import { computeDailyWage, computeMonthlySalary, setMonthlySalares } from '../../store/reducers/employee';
import { setCompanies } from '../../store/reducers/company';
import _ from 'lodash';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#192a56',
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

    const dispatch = useDispatch();
    const emp = useSelector(state => state.employee)
    const leave = useSelector(state => state.leaves)
    const absence = useSelector(state => state.absences)
    const overTime = useSelector(state => state.overtime)
    const log = useSelector(state => state.logged)

    const employeeInfoIndex = _.findIndex(emp.employees, { accountID: log.loggedIn.id })

    const leaves = [
        {
            id: 1,
            employeeId: 1,
            dateStarted: '2022-09-21T20:10:34+08:00',
            dateEnded: '2022-09-21T20:10:34+08:00',
            reason: 'vacation'
        },
        {
            id: 2,
            employeeId: 1,
            dateStarted: '2022-09-23T20:10:34+08:00',
            dateEnded: '2022-09-23T20:10:34+08:00',
            reason: 'fever'
        },
        {
            id: 3,
            employeeId: 1,
            dateStarted: '2022-09-26T20:10:34+08:00',
            dateEnded: '2022-09-28T20:10:34+08:00',
            reason: 'vacation'
        }
    ];

    const absences = [
        {
            id: 1,
            employeeId: 1,
            dateStarted: '2022-09-01T20:10:34+08:00',
            dateEnded: '2022-09-02T20:10:34+08:00',
            reason: 'hospital'
        },
        {
            id: 2,
            employeeId: 1,
            dateStarted: '2022-09-21T20:10:34+08:00',
            dateEnded: '2022-09-22T20:10:34+08:00',
            reason: 'hospital'
        },
        {
            id: 3,
            employeeId: 1,
            dateStarted: '2022-09-26T20:10:34+08:00',
            dateEnded: '2022-09-26T20:10:34+08:00',
            reason: 'hospital'
        }
    ]

    const overtimes = [
        {
            id: 1,
            employeeId: 1,
            dateStarted: '2022-09-01T17:10:34+08:00',
            dateEnded: '2022-09-01T21:10:34+08:00',
            reason: 'fix some bugs'
        },
        {
            id: 1,
            employeeId: 1,
            dateStarted: '2022-09-12T17:10:34+08:00',
            dateEnded: '2022-09-12T20:10:34+08:00',
            reason: 'fix some bugs'
        },
    ]

    const companies = [
        //sample company data
        {
            id: 1,
            name: 'Lemondrop',
            leaves: 6,
            accountID: 101,
            overtimeLimit: 30
        },
        {
            id: 2,
            name: 'Workbean',
            leaves: 6,
            accountID: 102,
            overtimeLimit: 30
        }
    ]

    const monthlySalaries = [
        {
            empId: 1,
            dateMonth: '2022-08-01T21:10:34+08:00',
            salary: 0
        },
        {
            empId: 1,
            dateMonth: '2022-07-01T21:10:34+08:00',
            salary: 0
        },
        {
            empId: 1,
            dateMonth: '2022-09-01T21:10:34+08:00',
            salary: 0
        },
    ]



    useEffect(() => {
        const initiateReducers = async () => {

            await dispatch(setLeaves(leaves))

            await dispatch(setAbsences(absences))

            await dispatch(setOvertime(overtimes))

            // await dispatch(setCompanies(companies))

            await dispatch(setMonthlySalares(monthlySalaries))

            await dispatch(computeRemainingLeaves({ companyLeaves: 6, id: log.loggedIn.id }))

            await dispatch(computeTotalAbsences({ id: log.loggedIn.id, leaves: 3, companyLeaves: 6 }))

            await dispatch(computeTotalOvertime({ id: log.loggedIn.id, companyOvertimeLimit: 30 }))

            await dispatch(computeDailyWage({ id: log.loggedIn.id }))

            await dispatch(computeMonthlySalary({ id: log.loggedIn.id, overtime: 7, leavesRemaining: 1, totalAbsences: 5 }))

        }

        initiateReducers()
    }, [dispatch, log])

    return (
        <DashboardLayout>

            <Box
                data-testid="employee-basic-info"
                className='flex flex-col justify-between items-center gap-3 text-white'
            >
                {/*----------------------FIRST ROW EMP INFO--------------------------- */}
                <Box className='flex justify-between items-center gap-3 w-full h-[140px]'>
                    <Box className='bg-[#fba600] flex p-4 rounded-md gap-4 h-full grow'>
                        <Link href='../profile'>
                            <Avatar sx={{ bgcolor: blue[800], width: 80, height: 80, fontSize: '40px' }}>E</Avatar>
                        </Link>

                        <Box>
                            <Link href='../profile'>
                                <Typography data-testid="name" style={{ cursor: 'pointer' }} mt={2} variant='h5' margin={0} padding={0}>{log.loggedIn.firstName}</Typography>
                            </Link>
                            <Typography mb={2} variant='body1'>Employee</Typography>
                            <Button data-testid="request-leave" className='bg-[#0055fb] text-white hover:bg-[#001b51]' variant='contained' onClick={() => setOpen(true)}>Request leave</Button>

                        </Box>

                    </Box>

                    <Box className='bg-[#8e44ad] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
                        <MeetingRoomIcon sx={{ width: 60, height: 60 }} />
                        <Typography data-testid="leaves" mt={2} variant='h6' >Leaves: {6 - leave.employee.remainingLeaves}</Typography>
                    </Box>

                    <Box className='bg-[#d35400] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
                        <RunningWithErrorsIcon sx={{ width: 60, height: 60 }} />
                        <Typography data-testid="absences" mt={2} variant='h6' >Absences: {absence.employee.totalAbsences}</Typography>
                    </Box>

                    <Box className='bg-[#0097e6] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
                        <MoreTimeIcon sx={{ width: 60, height: 60 }} />
                        <Typography data-testid="overtime" mt={2} variant='h6' >Overtime: {overTime.employee.totalOvertime}</Typography>
                    </Box>



                </Box>

                {/*----------------------SECOND ROW EMP INFO--------------------------- */}

                <Box className='flex justify-between items-center gap-3 w-full  h-[140px]'>
                    <Box className='bg-[#8e44ad] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
                        <MeetingRoomIcon sx={{ width: 60, height: 60 }} />
                        <Typography data-testid="remaining-leaves" mt={2} variant='h6' >Remaining Leaves: {leave.employee.remainingLeaves}</Typography>
                    </Box>

                    <Box className='bg-[#44bd32] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
                        <LocalAtmIcon sx={{ width: 60, height: 60 }} />
                        <Typography data-testid="salary-per-hour" mt={2} variant='h6' >Salary/Hour: {emp.employees[employeeInfoIndex].salaryPerHour}</Typography>
                    </Box>

                    <Box className='bg-[#192a56] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
                        <PaidIcon sx={{ width: 60, height: 60 }} />
                        <Typography data-testid="daily-wage" mt={2} variant='h6' >Daily Wage: {emp.employees[employeeInfoIndex].dailyWage}</Typography>
                    </Box>

                    <Box className='bg-[#16a085] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
                        <AccountBalanceIcon sx={{ width: 60, height: 60 }} />
                        <Typography data-testid="monthly-salary" mt={2} variant='h6' >Monthly Salary: {emp.employees[employeeInfoIndex].currMonthSal}</Typography>
                    </Box>

                </Box>


            </Box>

            {/**---------------LEAVES TABLE----------------------- */}
            <Typography className='text-center my-4 font-bold text-2xl tracking-wide'>
                Leaves
            </Typography>
            <TableContainer component={Paper} data-testid="leaves-table">
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Date Started</StyledTableCell>
                            <StyledTableCell>Date Ended</StyledTableCell>
                            <StyledTableCell>Reason</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_.map(leave.leaves, (row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {format(parseISO(row.dateStarted), 'PPpp')}
                                </StyledTableCell>
                                <StyledTableCell >{format(parseISO(row.dateEnded), 'PPpp')}</StyledTableCell>
                                <StyledTableCell >{row.reason}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/**---------------ABCENCES TABLE----------------------- */}
            <Typography className='text-center my-4 font-bold text-2xl tracking-wide'>
                Absences
            </Typography>
            <TableContainer component={Paper} data-testid="absences-table">
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Date Started</StyledTableCell>
                            <StyledTableCell>Date Ended</StyledTableCell>
                            <StyledTableCell>Reason</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_.map(absence.absences, (row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {format(parseISO(row.dateStarted), 'PPpp')}
                                </StyledTableCell>
                                <StyledTableCell >{format(parseISO(row.dateEnded), 'PPpp')}</StyledTableCell>
                                <StyledTableCell >{row.reason}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/**---------------OVERTIME TABLE----------------------- */}
            <Typography className='text-center my-4 font-bold text-2xl tracking-wide'>
                Overtime
            </Typography>
            <TableContainer component={Paper} data-testid="overtime-table">
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Date Started</StyledTableCell>
                            <StyledTableCell>Date Ended</StyledTableCell>
                            <StyledTableCell>Reason</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_.map(overTime.overtime, (row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {format(parseISO(row.dateStarted), 'PPpp')}
                                </StyledTableCell>
                                <StyledTableCell >{format(parseISO(row.dateEnded), 'PPpp')}</StyledTableCell>
                                <StyledTableCell >{row.reason}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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

                    <Button className='bg-[#33b33d]' color='success' variant='contained'>Submit</Button>
                </Box>
            </Modal>
        </DashboardLayout>
    )
}

export default Employee
