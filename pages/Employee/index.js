import { useEffect, useState } from 'react';
import { Avatar, TextField, Typography, Tabs, Tab } from '@mui/material';
import { blue } from '@mui/material/colors';
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
import { addLeaveRequest, computeRemainingLeaves, setLeaves } from '../../store/reducers/leaves';
import { addDays, parseISO, formatISO, format, isSameMonth } from 'date-fns';
import { computeTotalAbsences, setAbsences } from '../../store/reducers/absences';
import { addOTRequest, computeTotalOvertime, setOvertime } from '../../store/reducers/overtime';
import { computeDailyWage, computeMonthlySalary, setCurrentEmployee, setMonthlySalares } from '../../store/reducers/employee';
import { setCompanies, setCompany } from '../../store/reducers/company';
import _ from 'lodash';
import LeavesTable from '../components/LeavesTable';
import AbsencesTable from '../components/AbsencesTable';
import OvertimeTable from '../components/OvertimeTable';
import leaves from '../../_sampleData/leaves'
import absences from '../../_sampleData/absences'
import overtime from '../../_sampleData/overtime'
import monthlySalaries from '../../_sampleData/monthlySalaries'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
    const leave = useSelector(state => state.leaves)
    const absence = useSelector(state => state.absences)
    const overTime = useSelector(state => state.overtime)
    const comp = useSelector(state => state.company)
    const log = useSelector(state => state.logged)

    const [leaveDateStart, setLeaveDateStart] = useState(new Date())
    const [leaveDateEnd, setLeaveDateEnd] = useState(new Date())

    const [otDateStart, setOTDateStart] = useState(new Date())
    const [otDateEnd, setOTDateEnd] = useState(new Date())

    const [reason, setReason] = useState('')

    const employeeInfoIndex = _.findIndex(emp.employees, { accountID: log.loggedIn.id })

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    const handleLeaveFormSubmit = (e) => {
        e.preventDefault()

        dispatch(addLeaveRequest({
            employeeId: log.loggedIn.id,
            dateStarted: formatISO(leaveDateStart),
            dateEnded: formatISO(leaveDateEnd),
            reason: reason
        }))
        setLeaveRequestModal(false)
        setReason('')
    }

    const handleOTFormSubmit = (e) => {
        e.preventDefault()

        dispatch(addOTRequest({
            employeeId: log.loggedIn.id,
            dateStarted: formatISO(otDateStart),
            dateEnded: formatISO(otDateEnd),
            reason: reason
        }))
        setOTRequestModal(false)
        setReason('')
    }



    useEffect(() => {
        const initiateReducers = async () => {

            const employee = _.find(emp.employees, { accountID: log.loggedIn.id })

            const company = _.find(comp.companies, { accountID: employee.associatedCompany })

            await dispatch(setCurrentEmployee(employee))

            await dispatch(setCompany(employee.associatedCompany))

            // await dispatch(setLeaves(leaves))

            // await dispatch(setAbsences(absences))

            // await dispatch(setOvertime(overtime))

            await dispatch(setMonthlySalares(monthlySalaries))

            await dispatch(computeRemainingLeaves({
                companyLeaves: company.leaves,
                id: log.loggedIn.id
            }))

            await dispatch(computeTotalAbsences({
                id: log.loggedIn.id,
                leaves: (company.leaves - leave.employee.remainingLeaves),
                companyLeaves: company.leaves
            }))

            await dispatch(computeTotalOvertime({
                id: log.loggedIn.id,
                companyOvertimeLimit: company.overtimeLimit
            }))

            await dispatch(computeDailyWage({ id: log.loggedIn.id }))

            await dispatch(computeMonthlySalary({
                id: log.loggedIn.id,
                overtime: overTime.employee.totalOvertime,
                leavesRemaining: leave.employee.remainingLeaves,
                totalAbsences: absence.employee.totalAbsences
            }))

        }

        console.log(overTime.requestOvertime);


        initiateReducers()
    }, [dispatch, log, absence.employee.totalAbsences, comp.companies, emp.employees, leave.employee.remainingLeaves, overTime.employee.totalOvertime])

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                                <Box className='flex gap-3'>
                                    <Button data-testid="request-leave" className='bg-[#0055fb] text-white hover:bg-[#001b51]' variant='contained' onClick={() => setLeaveRequestModal(true)}>Request leave</Button>

                                    <Button data-testid="request-leave" className='bg-[#0055fb] text-white hover:bg-[#001b51]' variant='contained' onClick={() => setOTRequestModal(true)}>Request overtime</Button>

                                </Box>

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
                            <AbsencesTable absences={_.filter(absence.absences, { employeeId: emp.employee.accountID })} />
                        )}
                        {/*----------------------LIST OF OVERTIME TAB--------------------- */}
                        {tabIndex === 2 && (
                            <OvertimeTable overtimes={_.filter(overTime.overtime, { employeeId: emp.employee.accountID })} />
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
                            Request leave form
                        </Typography>

                        <MobileDateTimePicker
                            className='w-full'
                            value={otDateStart}
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
                            value={otDateEnd}
                            onChange={(newValue) => {
                                setOTDateEnd(newValue);
                            }}
                            label="Start Date Time"
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
