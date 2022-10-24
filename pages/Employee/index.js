import { useCallback, useEffect, useState } from 'react';
import { Avatar, TextField, Typography, Tabs, Tab } from '@mui/material';
import { blue } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Link from 'next/link';
import DashboardLayout from '../components/DashboardLayout';
// import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
// import LocalAtmIcon from '@mui/icons-material/LocalAtm';
// import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import MoreTimeIcon from '@mui/icons-material/MoreTime';
// import PaidIcon from '@mui/icons-material/Paid';
import { useDispatch, useSelector } from 'react-redux';
import { setLeaves, setRemainingLeaves } from '../../store/reducers/leaves';
import { setAbsences, setTotalAbsences } from '../../store/reducers/absences';
import { setOvertime, setTotalOvertime } from '../../store/reducers/overtime';
import { setCurrentEmployee, setCurrentMonthlySalary, setDailyWage } from '../../store/reducers/employee';
import { upperCase } from 'lodash';
import LeavesTable from '../components/LeavesTable';
import AbsencesTable from '../components/AbsencesTable';
import OvertimeTable from '../components/OvertimeTable';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { axiosAuth, encryptParams, verifyParams } from '../../auth/authParams';
import { setCompany } from '../../store/reducers/company';
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


function Employee() {

    const [leaveRequestModal, setLeaveRequestModal] = useState(false)
    const [otRequestModal, setOTRequestModal] = useState(false)

    const dispatch = useDispatch();
    const emp = useSelector(state => state.employee)
    const comp = useSelector(state => state.company)
    const leave = useSelector(state => state.leaves)
    const absence = useSelector(state => state.absences)
    const overTime = useSelector(state => state.overtime)
    const user = useSelector(state => state.logged)

    const [leaveDateStart, setLeaveDateStart] = useState(new Date())
    const [leaveDateEnd, setLeaveDateEnd] = useState(new Date())

    const [otDateTimeStart, setOTDateStart] = useState(new Date())
    const [otDateTimeEnd, setOTDateEnd] = useState(new Date())

    const [reason, setReason] = useState('')

    const [tabIndex, setTabIndex] = useState(0);

    //HANDLES TAB CHANGES
    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    useEffect(() => {
        const initiateApi = async () => {

            const employer = await axiosAuth(user.loggedIn.token).get(`/employee/${user.loggedIn.id}`)
                .catch(err => console.log("error: " + err))

            if (employer.status === 200) {
                const data = await verifyParams(employer.data)
                const { employeeID } = data
                const id = employeeID
                dispatch(setCurrentEmployee(data))
                dispatch(setCompany(data))

                await getEmployeeDailyWage(id)
                await getEmployeeRemainingLeaves(id)
                await getEmployeeOvertimes(id)
                await getEmployeeAbsences(id)
                await getEmployeeMonthlySalary(id)

            }


        }


        console.log(user.loggedIn);
        initiateApi()
        console.log("employee page mounted");
    }, [dispatch, user.loggedIn, getEmployeeDailyWage, getEmployeeRemainingLeaves, getEmployeeOvertimes, getEmployeeAbsences, getEmployeeMonthlySalary])

    //HANDLES GETTING EMPLOYEE DAILY WAGE
    const getEmployeeDailyWage = useCallback(async (id) => {
        const dailyWage = await axiosAuth(user.loggedIn.token).get(`/employee/dailywage/${id}`)
            .catch(err => console.log("error: " + err))

        if (dailyWage.status === 200) {
            const data = await verifyParams(dailyWage.data)
            dispatch(setDailyWage(data))
        }

    }, [dispatch, user.loggedIn.token])

    //HANDLES GETTING EMPLOYEE REMAINING LEAVES
    const getEmployeeRemainingLeaves = useCallback(async (id) => {
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

    }, [dispatch, user.loggedIn.token])

    //HANDLES GETTING EMPLOYEE TOTAL OVERTIME HOURS
    const getEmployeeOvertimes = useCallback(async (id) => {
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

    }, [dispatch, user.loggedIn.token])

    //HANDLES GETTING EMPLOYEE TOTAL ABSENCES
    const getEmployeeAbsences = useCallback(async (id) => {
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

    }, [dispatch, user.loggedIn.token])

    //HANDLES GETTING EMPLOYEE MONTHLY SALARY
    const getEmployeeMonthlySalary = useCallback(async (id) => {
        const monthlySal = await axiosAuth(user.loggedIn.token).get(`/employee/monthlysalary/${id}`)
            .catch(err => console.log("error: " + err))

        if (monthlySal.status === 200) {
            const data = await verifyParams(monthlySal.data)
            dispatch(setCurrentMonthlySalary(data))
        }

    }, [dispatch, user.loggedIn.token])

    //HANDLES LEAVE REQUEST SUBMITION
    const handleLeaveFormSubmit = async (e) => {
        e.preventDefault()

        const encryptData = await encryptParams({
            datestart: formatISO(leaveDateStart),
            dateend: formatISO(leaveDateEnd),
            reason: reason
        })

        const leaveRequest = await axiosAuth(user.loggedIn.token).post(`/employee/leave/${emp.employee.employeeID}`, JSON.stringify(encryptData))
            .catch(err => console.log("error: " + err))

        if (leaveRequest.status === 201) {
            await getEmployeeRemainingLeaves(emp.employee.employeeID)
            setLeaveRequestModal(false)
            setReason('')
        }
    }

    //HANDLES OVERTIME REQUEST SUBMITION
    const handleOTFormSubmit = async (e) => {
        e.preventDefault()

        const encryptData = await encryptParams({
            dateHappen: formatISO(otDateTimeStart),
            timeStart: formatISO(otDateTimeStart),
            timeEnd: formatISO(otDateTimeEnd),
            reason: reason
        })

        const overtimeRequest = await axiosAuth(user.loggedIn.token).post(`/employee/overtime/${emp.employee.employeeID}`, JSON.stringify(encryptData))
            .catch(err => console.log("error: " + err))

        if (overtimeRequest.status === 201) {
            await getEmployeeOvertimes(emp.employee.employeeID)
            setOTRequestModal(false)
            setReason('')
        }
    }

    const deleteLeave = async (id) => {

        const leave = await axiosAuth(user.loggedIn.token).delete(`/employee/leave/${id}`)
            .catch(err => console.log("error: " + err))

        if (leave?.status === 200) {
            getEmployeeRemainingLeaves(emp.employee.employeeID)
        }

    }

    const deleteOT = async (id) => {
        const ot = await axiosAuth(user.loggedIn.token).delete(`/employee/overtime/${id}`)
            .catch(err => console.log("error: " + err))

        if (ot?.status === 200) {
            getEmployeeOvertimes(emp.employee.employeeID)
        }
    }


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DashboardLayout>
                <Box
                    data-testid="employee-basic-info"
                    className='flex flex-col justify-between items-center gap-3 text-white'
                >
                    {/*----------------------FIRST ROW EMP INFO--------------------------- */}
                    <Box className='flex justify-between items-center gap-3 w-full h-[140px]'>
                        <Box className='bg-[#fba600] justify-center items-center flex p-4 rounded-md gap-3 h-full'>
                            <Link href='../profile'>
                                <Avatar sx={{ bgcolor: blue[800], width: 80, height: 80, fontSize: '40px' }}>
                                    {upperCase(user.loggedIn.firstname[0])}
                                </Avatar>
                            </Link>

                            <Box className='flex flex-col gap-2'>
                                <Link href='../profile'>
                                    <Typography data-testid="name" style={{ cursor: 'pointer' }} variant='h5' margin={0} padding={0}>{user.loggedIn.firstname} {user.loggedIn.lastname}</Typography>
                                </Link>
                                <Typography  >{emp.employee.pos}</Typography>
                                <Typography  >{upperCase(emp.employee.empType)}</Typography>

                            </Box>

                            <Box className='flex flex-col gap-2'>
                                <Button data-testid="request-leave" className='bg-[#0055fb] text-white hover:bg-[#001b51]' disabled={leave.employee.remainingLeaves <= 0} variant='contained' onClick={() => setLeaveRequestModal(true)}>Request leave</Button>

                                <Button data-testid="request-leave" className='bg-[#0055fb] text-white hover:bg-[#001b51]' variant='contained' onClick={() => setOTRequestModal(true)}>Request overtime</Button>

                            </Box>

                        </Box>

                        <Box className='bg-[#16a085] flex flex-col gap-2 justify-center items-start grow p-4 rounded-md h-full'>
                            <Typography data-testid="salary-per-hour" variant='h6' >Salary/Hour: ${emp.employee.rate}</Typography>
                            <Typography data-testid="daily-wage" variant='h6' >Daily Wage: ${emp.employee.dailyWage}</Typography>
                            <Typography data-testid="monthly-salary" variant='h6' >Monthly Salary: ${emp.employee.currMonthSal}</Typography>
                        </Box>

                        <Box className='bg-[#8e44ad] flex flex-col gap-2 justify-center items-start grow p-4 rounded-md h-full'>
                            <Typography data-testid="leaves" variant='h6' >Leaves: {comp.company.allocateLeaves - leave.employee.remainingLeaves} day/s</Typography>
                            <Typography data-testid="remaining-leaves" variant='h6' >Remaining: {leave.employee.remainingLeaves} day/s</Typography>
                        </Box>

                        <Box className='bg-[#d35400] flex flex-col gap-2 justify-center items-start grow p-4 rounded-md h-full'>
                            <Typography data-testid="absences" variant='h6' >Absences: {absence.employee.totalAbsences} day/s</Typography>
                            <Typography data-testid="overtime" variant='h6' >Overtime: {overTime.employee.totalOvertime} hrs</Typography>
                        </Box>
                    </Box>


                </Box>

                {/*------------------TABBLE TABS------------------------------*/}
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
                            <LeavesTable leaves={leave.leaves} deleteLeave={deleteLeave} />
                        )}
                        {/*----------------------LIST OF ABSENCES TAB--------------------- */}
                        {tabIndex === 1 && (
                            <AbsencesTable absences={absence.absences} />
                        )}
                        {/*----------------------LIST OF OVERTIME TAB--------------------- */}
                        {tabIndex === 2 && (
                            <OvertimeTable overtimes={overTime.overtime} deleteOT={deleteOT} />
                        )}
                    </Box>
                </Box>

                {/*-----------------LEAVE REQUEST MODAL-------------- */}
                <Modal
                    open={leaveRequestModal}
                    onClose={() => setLeaveRequestModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className="flex flex-col items-center gap-3" component="form" onSubmit={handleLeaveFormSubmit}>
                        <Typography id="modal-modal-title" className='my-4' variant="h6" component="h2">
                            Request leave form
                        </Typography>

                        <DatePicker
                            label="Start Date"
                            className='w-full'
                            value={leaveDateStart}
                            onChange={setLeaveDateStart}
                            renderInput={(params) => <TextField {...params} />}
                        />

                        <DatePicker
                            label="End Date"
                            className='w-full'
                            value={leaveDateEnd}
                            onChange={setLeaveDateEnd}
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


                {/*-----------------OVERTIME REQUEST MODAL-------------- */}
                <Modal
                    open={otRequestModal}
                    onClose={() => setOTRequestModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >


                    <Box sx={style} component="form" className="flex flex-col items-center gap-3" onSubmit={handleOTFormSubmit}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Request overtime form
                        </Typography>

                        <MobileDateTimePicker
                            className='w-full'
                            value={otDateTimeStart}
                            onChange={(newValue) => {
                                setOTDateStart(newValue);
                            }}
                            label="Start Date Time"
                            inputFormat="yyy/mm/dd hh:mm a"
                            mask="____/__/__ __:__ _M"
                            renderInput={(params) => <TextField {...params} />}
                        />

                        <MobileDateTimePicker
                            className='w-full'
                            value={otDateTimeEnd}
                            onChange={(newValue) => {
                                setOTDateEnd(newValue);
                            }}
                            label="End Date Time"
                            inputFormat="yyy/mm/dd hh:mm a"
                            mask="____/__/__ __:__ _M"
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

            </DashboardLayout>
        </LocalizationProvider>
    )
}

export default Employee