import Employer from '../employer'
import { useRouter } from 'next/router'
import Employee from '../employee'
import Admin from '../Admin'
import { Box } from '@mui/material'

function Dashboard() {

    const router = useRouter()

    if (router?.query?.role === "employee") return <Employee />

    if (router?.query?.role === "admin") return <Admin />

    return (
        <Box>
            <Employer />
        </Box>
    )
}

export default Dashboard
