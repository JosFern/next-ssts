import { Avatar, Box, Typography, Tab, Tabs } from '@mui/material'
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
import { computeTotalAbsences, setAbsences } from '../../store/reducers/absences';
import { setOvertime } from '../../store/reducers/overtime';
import { setCompanies } from '../../store/reducers/company';
import { setCurrentEmployee, setMonthlySalares } from '../../store/reducers/employee';
import { parseISO, format } from 'date-fns';
import LeavesTable from '../components/LeavesTable';
import AbsencesTable from '../components/AbsencesTable';
import OvertimeTable from '../components/OvertimeTable';

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


export default function EmployeeInfo() {

  const emp = useSelector(state => state.employee)
  const leave = useSelector(state => state.leaves)
  const comp = useSelector(state => state.company)
  const abs = useSelector(state => state.absences)
  const ot = useSelector(state => state.overtime)
  const dispatch = useDispatch()

  const router = useRouter()

  const id = router?.query?.id

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

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

      // await setCurrEmployee({ ...employee })

      console.log(employee);

      await dispatch(setCurrentEmployee(employee))

      await dispatch(setLeaves(leaves))

      await dispatch(setAbsences(absences))

      await dispatch(setOvertime(overtimes))

      await dispatch(setMonthlySalares(monthlySalaries))

      console.log(comp.company.leaves);

      await dispatch(computeRemainingLeaves({
        companyLeaves: comp.company.leaves,
        id: employee?.accountID
      }))

      await dispatch(computeTotalAbsences({
        id: employee?.accountID,
        leaves: (comp.company.leaves - leave.employee.remainingLeaves),
        companyLeaves: comp.company.leaves
      }))
    }

    initalizeReducers()

    console.log('useeffect checker');
  }, [dispatch])

  return (

    <DashboardLayout>
      <Container>

        <Box
          data-testid="employee-info"
          className='flex justify-between items-center gap-4 mb-4 w-full text-white h-[160px]'
        >

          <Box className='bg-[#fba600] flex p-4 rounded-md gap-4 h-full'>

            <Avatar sx={{ bgcolor: blue[800], width: 100, height: 100, fontSize: '40px' }} />

            <Box>
              <Typography mt={2} variant="h5" >Name: {emp.employee.firstName}</Typography>
              <Typography mt={2} >Position: {emp.employee.position}</Typography>
              <Typography mt={2} >Type: {emp.employee.employeeType}</Typography>

            </Box>
          </Box>

          <Box className='bg-[#44bd32] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
            <LocalAtmIcon sx={{ width: 60, height: 60 }} />
            <Typography mt={2} variant='h6' >Salary/Hour: {emp.employee.salaryPerHour}</Typography>
          </Box>
          <Box className='bg-[#8e44ad] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
            <MeetingRoomIcon sx={{ width: 60, height: 60 }} />
            <Typography mt={2} variant='h6' >Remaining Leaves: {leave.employee.remainingLeaves}</Typography>
          </Box>

          <Box className='bg-[#d35400] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
            <RunningWithErrorsIcon sx={{ width: 60, height: 60 }} />
            <Typography mt={2} variant='h6' >Absences: {abs.employee.totalAbsences}</Typography>
          </Box>


        </Box>

        <Box className='bg-white w-full'>
          <Box>
            <Tabs value={tabIndex} onChange={handleTabChange}>
              <Tab label="Leaves" />
              <Tab label="Absences" />
              <Tab label="Overtime" />
            </Tabs>
          </Box>
          <Box>
            {/*----------------------LIST OF LEAVES TAB--------------------- */}
            {tabIndex === 0 && (
              <LeavesTable leaves={_.filter(leave.leaves, { employeeId: emp.employee.accountID })} />
            )}
            {/*----------------------LIST OF ABSENCES TAB--------------------- */}
            {tabIndex === 1 && (
              <AbsencesTable absences={_.filter(abs.absences, { employeeId: emp.employee.accountID })} />
            )}
            {/*----------------------LIST OF OVERTIME TAB--------------------- */}
            {tabIndex === 2 && (
              <OvertimeTable overtimes={_.filter(ot.overtime, { employeeId: emp.employee.accountID })} />
            )}
          </Box>
        </Box>
      </Container>
    </DashboardLayout>
  )
}
