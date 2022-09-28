import { Avatar, Box, Typography } from '@mui/material'
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
import DashboardLayout from '../components/DashboardLayout'
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import _, { upperCase } from 'lodash';
import { useRouter } from 'next/router';
import { computeRemainingLeaves, setLeaves } from '../../store/reducers/leaves';
import { setAbsences } from '../../store/reducers/absences';
import { setOvertime } from '../../store/reducers/overtime';
import { setCompanies } from '../../store/reducers/company';
import { setMonthlySalares } from '../../store/reducers/employee';
import { parseISO, format } from 'date-fns';

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

function createData(start, end, reason) {
  return { start, end, reason };
}

const rows = [
  // createData('Sep 13, 22', 'Sep 15, 22', 'fever'),
  // createData('Nov 14,22', 'Nov 18,22', 'holiday vacation'),
];


export default function EmployeeInfo() {

  const emp = useSelector(state => state.employee)
  const leave = useSelector(state => state.leaves)
  const comp = useSelector(state => state.company)
  const dispatch = useDispatch()

  const router = useRouter()

  const id = router?.query?.id

  const [currEmployee, setCurrEmployee] = useState(null)

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
    const initalizeReducers = async () => {
      const employee = _.find(emp.employees, { accountID: Number(id) })

      await setCurrEmployee({ ...employee })

      console.log(employee);

      await dispatch(setLeaves(leaves))

      await dispatch(setAbsences(absences))

      await dispatch(setOvertime(overtimes))

      await dispatch(setMonthlySalares(monthlySalaries))

      console.log(comp.company.leaves, currEmployee?.accountID);

      await dispatch(computeRemainingLeaves({ companyLeaves: comp.company.leaves, id: employee?.accountID }))
    }

    initalizeReducers()
  }, [dispatch])

  return (

    <DashboardLayout>
      <Container>

        <Box
          data-testid="employee-info"
          className='flex justify-between items-center gap-4 mb-4 w-full text-white h-[160px]'
        >

          <Box className='bg-[#fba600] flex p-4 rounded-md gap-4 h-full'>

            <Avatar sx={{ bgcolor: blue[800], width: 100, height: 100, fontSize: '40px' }}>{upperCase(currEmployee?.firstName[0])}</Avatar>

            <Box>
              <Typography mt={2} variant="h5" >Name: {currEmployee?.firstName}</Typography>
              <Typography mt={2} >Position: {currEmployee?.position}</Typography>
              <Typography mt={2} >Type: {currEmployee?.employeeType}</Typography>

            </Box>
          </Box>

          <Box className='bg-[#44bd32] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
            <LocalAtmIcon sx={{ width: 60, height: 60 }} />
            <Typography mt={2} variant='h6' >Salary/Hour: {currEmployee?.salaryPerHour}</Typography>
          </Box>
          <Box className='bg-[#8e44ad] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
            <MeetingRoomIcon sx={{ width: 60, height: 60 }} />
            <Typography mt={2} variant='h6' >Remaining Leaves: {leave?.employee?.remainingLeaves}</Typography>
          </Box>

          <Box className='bg-[#d35400] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
            <RunningWithErrorsIcon sx={{ width: 60, height: 60 }} />
            <Typography mt={2} variant='h6' >Absences: 0</Typography>
          </Box>


        </Box>

        <Box>
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
                {_.map(_.filter(leave.leaves, { employeeId: currEmployee?.accountID }), (row, index) => (
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
        </Box>
      </Container>
    </DashboardLayout>
  )
}
