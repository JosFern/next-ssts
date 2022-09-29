import Employer from '../employer'
import { useRouter } from 'next/router'
import Employee from '../employee'
import Admin from '../Admin'
import RequireAuth from '../components/RequireAuth'


function Dashboard() {

    const router = useRouter()

    if (router?.query?.role === "employee") return (
        <RequireAuth role={['employee']}>
            <Employee />
        </RequireAuth>
    )

    if (router?.query?.role === "admin") return <Admin role={['admin']} />

    return (
        <Employer />
    )
}

export default Dashboard
