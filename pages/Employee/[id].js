import { Avatar, Box, Typography, Tab, Tabs, Button, Modal, TextField } from '@mui/material'
import { blue } from '@mui/material/colors'
import Container from '@mui/material/Container'
import DashboardLayout from '../components/DashboardLayout'
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import PaidIcon from '@mui/icons-material/Paid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { computeRemainingLeaves, setLeaves } from '../../store/reducers/leaves';
import { addAbsent, computeTotalAbsences, setAbsences } from '../../store/reducers/absences';
import { computeTotalOvertime, setOvertime } from '../../store/reducers/overtime';
import { computeDailyWage, computeMonthlySalary, setCurrentEmployee, setMonthlySalares } from '../../store/reducers/employee';
import LeavesTable from '../components/LeavesTable';
import AbsencesTable from '../components/AbsencesTable';
import OvertimeTable from '../components/OvertimeTable';
import leaves from '../../_sampleData/leaves'
import absences from '../../_sampleData/absences'
import overtime from '../../_sampleData/overtime'
import monthlySalaries from '../../_sampleData/monthlySalaries'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formatISO } from 'date-fns';
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

  const [absentModal, setAbsentModal] = useState(false)

  const [absentDateStart, setAbsentDateStart] = useState(new Date())
  const [absentDateEnd, setAbsentDateEnd] = useState(new Date())

  const [reason, setReason] = useState('')

  useEffect(() => {
    const initalizeReducers = async () => {

      const employee = _.find(emp.employees, { accountID: Number(id) })

      await dispatch(setCurrentEmployee(employee))

      // await dispatch(setLeaves(leaves))

      // await dispatch(setAbsences(absences))

      // await dispatch(setOvertime(overtime))

      await dispatch(setMonthlySalares(monthlySalaries))

      await dispatch(computeRemainingLeaves({
        companyLeaves: comp.company.leaves,
        id: employee?.accountID
      }))

      await dispatch(computeTotalAbsences({
        id: employee?.accountID,
        leaves: (comp.company.leaves - leave.employee.remainingLeaves),
        companyLeaves: comp.company.leaves
      }))

      await dispatch(computeTotalOvertime({
        id: employee?.accountID,
        companyOvertimeLimit: comp.company.overtimeLimit
      }))

      await dispatch(computeDailyWage({ id: employee?.accountID }))

      await dispatch(computeMonthlySalary({
        id: employee?.accountID,
        overtime: ot.employee.totalOvertime,
        leavesRemaining: leave.employee.remainingLeaves,
        totalAbsences: abs.employee.totalAbsences
      }))

    }

    console.log(abs.absences);
    initalizeReducers()

  }, [dispatch, abs.employee.totalAbsences, comp.company.leaves, comp.company.overtimeLimit, emp.employees, id, leave.employee.remainingLeaves, ot.employee.totalOvertime])

  const handleAbsentFormSubmit = (e) => {
    e.preventDefault()

    let idGenerate = Math.floor((Math.random() * 1000) + 1);

    dispatch(addAbsent({
      id: idGenerate,
      employeeId: Number(id),
      dateStarted: formatISO(absentDateStart),
      dateEnded: formatISO(absentDateEnd),
      reason: reason
    }))
    setAbsentModal(false)
    setReason('')
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>

      <DashboardLayout>
        <Container>

          <Box
            data-testid="employee-info"
            className='flex flex-col justify-between items-center gap-3 text-white'
          >
            <Box className='flex justify-between items-center gap-3 w-full h-[150px]'>

              <Box className='bg-[#fba600] flex p-4 rounded-md gap-4 h-full'>

                <Avatar sx={{ bgcolor: blue[800], width: 100, height: 100, fontSize: '40px' }} />

                <Box>
                  <Typography mt={2} variant="h5" >Name: {emp.employee.firstName}</Typography>
                  <Typography mt={2} >Position: {emp.employee.position}</Typography>
                  <Typography mt={2} >Type: {emp.employee.employeeType}</Typography>

                  <Button data-testid="add-employer" onClick={() => setAbsentModal(true)} className='bg-[#0055fb] text-white hover:bg-[#001b51]' variant='contained'>Set Absent</Button>
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

            {/*----------------------SECOND ROW EMP INFO--------------------------- */}

            <Box className='flex justify-between items-center gap-3 w-full  h-[140px]'>
              <Box className='bg-[#8e44ad] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
                <MeetingRoomIcon sx={{ width: 60, height: 60 }} />
                <Typography data-testid="remaining-leaves" mt={2} variant='h6' >Leaves: {comp.company.leaves - leave.employee.remainingLeaves}</Typography>
              </Box>

              <Box className='bg-[#0097e6] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
                <MoreTimeIcon sx={{ width: 60, height: 60 }} />
                <Typography data-testid="overtime" mt={2} variant='h6' >Overtime: {ot.employee.totalOvertime}</Typography>
              </Box>

              <Box className='bg-[#192a56] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
                <PaidIcon sx={{ width: 60, height: 60 }} />
                <Typography data-testid="daily-wage" mt={2} variant='h6' >Daily Wage: {emp.employee.dailyWage}</Typography>
              </Box>

              <Box className='bg-[#16a085] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
                <AccountBalanceIcon sx={{ width: 60, height: 60 }} />
                <Typography data-testid="monthly-salary" mt={2} variant='h6' >Monthly Salary: {emp.employee.currMonthSal}</Typography>
              </Box>

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
          {/*-----------------SET EMPLOYEE ABSENT MODAL-------------- */}
          <Modal
            open={absentModal}
            onClose={() => setAbsentModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} component="form" className="flex flex-col items-center gap-3" onSubmit={handleAbsentFormSubmit}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Set Employee Absence
              </Typography>

              <DatePicker
                label="Start Date"
                className='w-full'
                value={absentDateStart}
                onChange={setAbsentDateStart}
                renderInput={(params) => <TextField {...params} />}
              />

              <DatePicker
                label="End Date"
                className='w-full'
                value={absentDateEnd}
                onChange={setAbsentDateEnd}
                renderInput={(params) => <TextField {...params} />}
              />

              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label='Reason'
                fullWidth
                required
                name='reason'
                value={reason}
                onChange={(e) => setReason(e.target.value)}

              />

              <Button type='submit' className='bg-[#33b33d]' color='success' variant='contained'>Submit</Button>
            </Box>
          </Modal>
        </Container>

      </DashboardLayout>
    </LocalizationProvider >
  )
}
