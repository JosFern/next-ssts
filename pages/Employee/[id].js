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
import { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { setCurrentEmployee, setCurrentMonthlySalary, setDailyWage } from '../../store/reducers/employee';
import LeavesTable from '../components/LeavesTable';
import AbsencesTable from '../components/AbsencesTable';
import OvertimeTable from '../components/OvertimeTable';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formatISO } from 'date-fns';
import { axiosAuth, encryptParams, verifyParams } from '../../auth/authParams';
import { setLeaves, setRemainingLeaves } from '../../store/reducers/leaves';
import { setAbsences, setTotalAbsences } from '../../store/reducers/absences';
import { setOvertime, setTotalOvertime } from '../../store/reducers/overtime';
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

  const user = useSelector(state => state.logged)
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

  useEffect(() => {
    const initalizeReducers = async () => {

      const employee = _.find(emp.employees, { employeeID: id })

      dispatch(setCurrentEmployee(employee))
      await getEmployeeDailyWage()
      await getEmployeeRemainingLeaves()
      await getEmployeeAbsences()
      await getEmployeeOvertimes()
      await getEmployeeMonthlySalary()
      console.log("api executed");
    }


    if (router.isReady) {
      initalizeReducers()
    }
    console.log('emp info useeffect checker');
  }, [dispatch, id, emp.employees, router.isReady, getEmployeeDailyWage, getEmployeeRemainingLeaves, getEmployeeAbsences, getEmployeeOvertimes, getEmployeeMonthlySalary])

  //HANDLES GETTING EMPLOYEE DAILY WAGE
  const getEmployeeDailyWage = useCallback(async () => {
    const dailyWage = await axiosAuth(user.loggedIn.token).get(`/employee/dailywage/${id}`)
      .catch(err => console.log("error: " + err))

    if (dailyWage.status === 200) {
      const data = await verifyParams(dailyWage.data)
      dispatch(setDailyWage(data))
    }

  }, [dispatch, user.loggedIn.token, id])

  //HANDLES GETTING EMPLOYEE REMAINING LEAVES
  const getEmployeeRemainingLeaves = useCallback(async () => {
    const remainingLeaves = await axiosAuth(user.loggedIn.token).get(`/employee/remainingleave/${id}`)


    if (remainingLeaves.status === 200) {
      const data = await verifyParams(remainingLeaves.data)
      dispatch(setRemainingLeaves(data))
    }

    const leaves = await axiosAuth(user.loggedIn.token).get(`/employee/leave/${id}`)
      .catch(err => console.log("error: " + err))

    if (leaves.status === 200) {
      const data = await verifyParams(leaves.data)
      dispatch(setLeaves(data))
    }

  }, [dispatch, user.loggedIn.token, id])

  //HANDLES GETTING EMPLOYEE TOTAL OVERTIME HOURS
  const getEmployeeOvertimes = useCallback(async () => {
    const totalOTs = await axiosAuth(user.loggedIn.token).get(`/employee/totalovertime/${id}`)
      .catch(err => console.log("error: " + err))

    if (totalOTs.status === 200) {
      const data = await verifyParams(totalOTs.data)
      dispatch(setTotalOvertime(data))
    }

    const ot = await axiosAuth(user.loggedIn.token).get(`/employee/overtime/${id}`)
      .catch(err => console.log("error: " + err))

    if (ot.status === 200) {
      const data = await verifyParams(ot.data)
      dispatch(setOvertime(data))
    }

  }, [dispatch, user.loggedIn.token, id])

  //HANDLES GETTING EMPLOYEE TOTAL ABSENCES
  const getEmployeeAbsences = useCallback(async () => {
    const totalAbsences = await axiosAuth(user.loggedIn.token).get(`/employee/totalabsence/${id}`)
      .catch(err => console.log("error: " + err))

    if (totalAbsences.status === 200) {
      const data = await verifyParams(totalAbsences.data)
      dispatch(setTotalAbsences(data))
    }

    const absences = await axiosAuth(user.loggedIn.token).get(`/employee/absence/${id}`)
      .catch(err => console.log("error: " + err))

    if (absences.status === 200) {
      const data = await verifyParams(absences.data)
      dispatch(setAbsences(data))
    }

  }, [dispatch, user.loggedIn.token, id])

  //HANDLES GETTING EMPLOYEE MONTHLY SALARY
  const getEmployeeMonthlySalary = useCallback(async () => {
    const monthlySal = await axiosAuth(user.loggedIn.token).get(`/employee/monthlysalary/${id}`)
      .catch(err => console.log("error: " + err))

    if (monthlySal.status === 200) {
      const data = await verifyParams(monthlySal.data)
      console.log(data);
      dispatch(setCurrentMonthlySalary(data))
    }

  }, [dispatch, user.loggedIn.token, id])

  //HANDLES EMPLOYEE ABSENCE SUBMITION
  const handleAbsentFormSubmit = async (e) => {
    e.preventDefault()


    const encryptData = await encryptParams({
      dateStart: formatISO(absentDateStart),
      dateEnd: formatISO(absentDateEnd)
    })

    const setAbsence = await axiosAuth(user.loggedIn.token).post(`/employee/absence/${id}`, JSON.stringify(encryptData))
      .catch(err => console.log("error: " + err))

    if (setAbsence.status === 201) {
      getEmployeeAbsences()
      getEmployeeMonthlySalary()
      setAbsentModal(false)
    }

  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>

      <DashboardLayout>
        <Container>

          <Box
            data-testid="employee-info"
            className='flex flex-col justify-between items-center gap-3 text-white'
          >

            <Box className='flex justify-between items-center gap-3 w-full h-[140px]'>

              <Box className='bg-[#fba600] flex justify-center items-center p-4 rounded-md gap-4 h-full'>

                <Avatar sx={{ bgcolor: blue[800], width: 100, height: 100, fontSize: '40px' }} />

                <Box className='flex flex-col py-4 gap-1'>
                  <Typography variant="h5" >Name: {emp.employee.firstname}</Typography>
                  <Typography  >Position: {emp.employee.pos}</Typography>
                  <Typography  >Type: {emp.employee.empType}</Typography>
                  <Button data-testid="add-employer" onClick={() => setAbsentModal(true)} className='bg-[#0055fb] text-white hover:bg-[#001b51]' variant='contained'>Set Absent</Button>
                </Box>

              </Box>

              <Box className='bg-[#16a085] flex flex-col justify-center items-start grow p-4 rounded-md h-full'>

                <Typography variant='h6' >Salary/Hour: ${emp.employee.rate}</Typography>
                <Typography data-testid="daily-wage" variant='h6' >Daily Wage: ${emp.employee.dailyWage}</Typography>
                <Typography data-testid="monthly-salary" variant='h6' >Monthly Salary: ${emp.employee.currMonthSal}</Typography>

              </Box>

              <Box className='bg-[#8e44ad] flex flex-col justify-center items-start grow p-4 rounded-md h-full'>
                <Typography data-testid="remaining-leaves" variant='h6' >Leaves: {comp.company.allocateLeaves - leave.employee.remainingLeaves} days</Typography>
                <Typography variant='h6' >Remaining: {leave.employee.remainingLeaves} days</Typography>

              </Box>

              <Box className='bg-[#d35400] flex flex-col justify-center items-start grow p-4 rounded-md h-full'>
                <Typography data-testid="overtime" variant='h6' >Overtime: {ot.employee.totalOvertime} hrs</Typography>
                <Typography variant='h6' >Absences: {abs.employee.totalAbsences} day/s</Typography>
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
                <LeavesTable leaves={leave.leaves} />
              )}
              {/*----------------------LIST OF ABSENCES TAB--------------------- */}
              {tabIndex === 1 && (
                <AbsencesTable absences={abs.absences} />
              )}
              {/*----------------------LIST OF OVERTIME TAB--------------------- */}
              {tabIndex === 2 && (
                <OvertimeTable overtimes={ot.overtime} />
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

              <Button type='submit' className='bg-[#33b33d]' color='success' variant='contained'>Submit</Button>
            </Box>
          </Modal>
        </Container>

      </DashboardLayout>
    </LocalizationProvider >
  )
}