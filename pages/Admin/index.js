import { Avatar, Box, Tab, Tabs, List, Modal, ListItem, ListItemText, ListItemIcon } from '@mui/material'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import { green } from '@mui/material/colors'
import { useRouter } from 'next/router';
import Link from 'next/link';
import DashboardLayout from '../components/DashboardLayout'
import { useDispatch, useSelector } from 'react-redux';
import _, { filter, upperCase } from 'lodash';
import { deleteAccount, deleteAccounts, setAccounts } from '../../store/reducers/account';
import { deleteEmployer, deleteEmployers, setEmployers } from '../../store/reducers/employer';
import { deleteCompany, setCompanies } from '../../store/reducers/company';
import { useCallback, useEffect, useState } from 'react';
import EmployerTable from '../components/EmpoloyerTable';
import CompanyTable from '../components/CompanyTable';
import AccountsTable from '../components/AccountsTable';
import accounts from '../../_sampleData/account';
import companies from '../../_sampleData/company';
import { deleteEmployees } from '../../store/reducers/employee';
import axios from 'axios';
import { axiosAuth, verifyParams } from '../../auth/authParams';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
};


function Admin() {

    const router = useRouter()

    const comp = useSelector(state => state.company)
    const emplyr = useSelector(state => state.employer)
    const user = useSelector(state => state.logged)
    // const acc = useSelector(state => state.account)
    const emp = useSelector(state => state.employee)
    const dispatch = useDispatch()

    const [deleteCompModal, setDeleteCompModal] = useState(false)

    const [employerList, setEmployerList] = useState([])
    const [employeeList, setEmployeeList] = useState([])
    const [company, setCompany] = useState(0)

    const [tabIndex, setTabIndex] = useState(0);

    //HANDESL TAB CHANGE
    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    useEffect(() => {
        const initializeApi = async () => {
            getEmployerCompany()
        }

        initializeApi()

        console.log('useeffect checker');
    }, [getEmployerCompany])

    //USE TO GET EMPLOYERS AND COMPANIES DATA
    const getEmployerCompany = useCallback(async () => {

        const companies = await axiosAuth(user.loggedIn.token).get('/company')
            .catch(err => console.log("error: " + err))

        if (companies.status === 200) {
            const data = await verifyParams(companies.data)
            dispatch(setCompanies(data))
        }

        const employers = await axiosAuth(user.loggedIn.token).get('/employer')
            .catch(err => console.log("error: " + err))

        if (employers.status === 200) {
            const data = await verifyParams(employers.data)
            dispatch(setEmployers(data))
        }
    }, [dispatch, user.loggedIn.token])

    //HANDLES EMPLOYER DELETION
    const handleDeleteEmployer = async (id) => {

        const deleteEmployer = await axiosAuth(user.loggedIn.token).delete(`/employer/${id}`)
            .catch(err => {
                setError(true)
                setMessage(err.response.data)
            })

        if (deleteEmployer?.status === 200) getEmployerCompany()


    }

    //HANDLES GETTING EMPLOYERS ASSOCIATED COMPANY
    const getAssocEmployers = (companyID) => {
        const employers = _.filter(emplyr.employers, { company: companyID })

        return employers
    }

    //HANDLES GETTING EMPLOYEES ASSOCIATED COMPANY
    const getAssocEmployees = (companyID) => {
        const employees = _.filter(emp.employees, { associatedCompany: companyID })

        return employees
    }

    //OPENS DELETE COMPANY MODAL
    const openDeleteCompanyModal = (companyID) => {
        setDeleteCompModal(true)

        const getEmployers = getAssocEmployers(companyID)
        const getEmployees = getAssocEmployees(companyID)

        setEmployerList(getEmployers)
        setEmployeeList(getEmployees)
        setCompany(Number(companyID))

    }

    //HANDLES COMPANY DELETION
    const handleDeleteCompanySubmit = (e) => {
        e.preventDefault()

        const employerMap = _.map(employerList, function (emplyr) {
            return Number(emplyr.accountID)
        })

        const employeeMap = _.map(employeeList, function (emplye) {
            return Number(emplye.accountID)
        })

        console.log(company);


        dispatch(deleteCompany(company))
        dispatch(deleteEmployers(employerMap))
        dispatch(deleteEmployees(employeeMap))
        dispatch(deleteAccounts([...employerMap, ...employeeMap]))

        setDeleteCompModal(false)
    }

    return (
        <DashboardLayout >
            <Box
                className='bg-white p-3 rounded-md flex items-center gap-4 text-gray-700 shadow-md mb-6'

                data-testid="admin-basic-info"
            >
                <Link href='../profile'>
                    <Avatar sx={{ bgcolor: green[800], width: 100, height: 100, fontSize: '40px' }}>{upperCase(user.loggedIn.firstName[0])}</Avatar>
                </Link>

                <Box>
                    <Link href='../profile'>
                        <Typography style={{ cursor: 'pointer' }} mt={2} variant='h4' margin={0} padding={0}>{user.loggedIn.firstName} {user.loggedIn.lastName}</Typography>
                    </Link>
                    <Typography mb={2}>Admin</Typography>
                    <Box>
                        <Button className='bg-[#0055fb] text-white hover:bg-[#001b51] mr-4' onClick={() => router.push('/employer/form')} variant='contained'>+ Add Employer</Button>

                        <Button className='bg-[#0055fb] text-white hover:bg-[#001b51]' onClick={() => router.push('/company/form')} variant='contained'>+ Add Company</Button>

                    </Box>

                </Box>


            </Box>

            <Box className='bg-white w-full'>
                <Box>
                    <Tabs value={tabIndex} onChange={handleTabChange}>
                        <Tab label="Employers" />
                        <Tab label="Companies" />
                        {/* <Tab label="Accounts" /> */}
                    </Tabs>
                </Box>
                <Box>
                    {tabIndex === 0 && (
                        // ---------------EMPLOYERS TABLE------------------
                        <EmployerTable employers={emplyr.employers} deleteEmployer={handleDeleteEmployer} />
                    )}
                    {tabIndex === 1 && (
                        // ---------------COMPANIES TABLE------------------
                        <CompanyTable companies={comp.companies} handleDeleteModal={openDeleteCompanyModal} />
                    )}
                    {/* {tabIndex === 2 && (
                        // ---------------ACCOUNTS TABLE------------------
                        <AccountsTable accounts={acc.accounts} />
                    )} */}
                </Box>
            </Box>

            {/*-----------------LEAVE REQUEST MODAL-------------- */}
            <Modal
                open={deleteCompModal}
                onClose={() => setDeleteCompModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="flex flex-col items-center gap-3" component="form" onSubmit={handleDeleteCompanySubmit}>
                    <Typography id="modal-modal-title" className='my-4' variant="h6" component="h2">
                        Associated Employers and Employees will be deleted:
                    </Typography>
                    <Box className='flex gap-4'>
                        <Box>
                            <Typography mt={2} margin={0} padding={0}>Employer/s:</Typography>
                            <List>
                                {_.map(employerList, (list, index) => (
                                    <ListItem key={index} disablePadding>
                                        <ListItemIcon>
                                            <Avatar sx={{ bgcolor: green[800], width: 25, height: 25, fontSize: '20px' }}>{upperCase(list.firstName[0])}</Avatar>
                                        </ListItemIcon>
                                        <ListItemText primary={`${list.firstName} ${list.lastName}`} />
                                    </ListItem>
                                ))}

                            </List>

                        </Box>

                        <Box>
                            <Typography mt={2} margin={0} padding={0}>Employee/s:</Typography>
                            <List>
                                {_.map(employeeList, (list, index) => (
                                    <ListItem key={index} disablePadding>
                                        <ListItemIcon>
                                            <Avatar sx={{ bgcolor: green[800], width: 25, height: 25, fontSize: '20px' }}>{upperCase(list.firstName[0])}</Avatar>
                                        </ListItemIcon>
                                        <ListItemText primary={`${list.firstName} ${list.lastName}`} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                    </Box>

                    <Button type='submit' className='bg-[#c23616]' color='error' variant='contained'>Delete</Button>
                </Box>
            </Modal>


        </DashboardLayout>
    )
}

export default Admin