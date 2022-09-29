import { Avatar, Box, Tab, Tabs } from '@mui/material'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import { green } from '@mui/material/colors'
import { useRouter } from 'next/router';
import Link from 'next/link';
import DashboardLayout from '../components/DashboardLayout'
import { useDispatch, useSelector } from 'react-redux';
import _, { filter } from 'lodash';
import { deleteAccount, setAccounts } from '../../store/reducers/account';
import { deleteEmployer, setEmployers } from '../../store/reducers/employer';
import { deleteCompany, setCompanies } from '../../store/reducers/company';
import { useEffect, useState } from 'react';
import EmployerTable from '../components/EmpoloyerTable';
import CompanyTable from '../components/CompanyTable';
import AccountsTable from '../components/AccountsTable';
import accounts from '../../_sampleData/account';
import companies from '../../_sampleData/company';

function Admin() {

    const router = useRouter()

    const comp = useSelector(state => state.company)
    const emplyr = useSelector(state => state.employer)
    const user = useSelector(state => state.logged)
    const acc = useSelector(state => state.account)
    const dispatch = useDispatch()

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    const handleDeleteEmployer = (id) => {
        dispatch(deleteAccount(id))
        dispatch(deleteEmployer(id))
    }

    // useEffect(() => {
    //     const initializeReducers = async () => {
    //         await dispatch(setCompanies(companies))
    //         await dispatch(setAccounts(accounts))

    //         // dispatch(setEmployers(employers))
    //     }

    //     initializeReducers()

    //     console.log('useeffect checker');
    // }, [dispatch])


    const getEmployerCompany = (emplyrs) => {

        const getAssocCompany = _.map(emplyrs, (emplyr) => {
            const company = _.find(comp.companies, { accountID: emplyr.company })
            return { ...emplyr, companyName: company.name }
        })

        return getAssocCompany;
    }

    return (
        <DashboardLayout >
            <Box
                className='bg-white p-3 rounded-md flex items-center gap-4 text-gray-700 shadow-md mb-6'

                data-testid="admin-basic-info"
            >
                <Link href='../profile'>
                    <Avatar sx={{ bgcolor: green[800], width: 100, height: 100, fontSize: '40px' }}>A</Avatar>
                </Link>

                <Box>
                    <Link href='../profile'>
                        <Typography style={{ cursor: 'pointer' }} mt={2} variant='h4' margin={0} padding={0}>{user.loggedIn.firstName}</Typography>
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
                        <Tab label="Accounts" />
                    </Tabs>
                </Box>
                <Box>
                    {tabIndex === 0 && (
                        // ---------------EMPLOYERS TABLE------------------
                        <EmployerTable employers={getEmployerCompany(emplyr.employers)} deleteEmployer={handleDeleteEmployer} />
                    )}
                    {tabIndex === 1 && (
                        // ---------------COMPANIES TABLE------------------
                        <CompanyTable companies={comp.companies} />
                    )}
                    {tabIndex === 2 && (
                        // ---------------ACCOUNTS TABLE------------------
                        <AccountsTable accounts={acc.accounts} />
                    )}
                </Box>
            </Box>


        </DashboardLayout>
    )
}

export default Admin