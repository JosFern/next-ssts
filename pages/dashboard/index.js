import Employer from '../employer'
import { useRouter } from 'next/router'
import Employee from '../employee'
import Admin from '../Admin'
import RequireAuth from '../components/RequireAuth'


function Dashboard() {

    const router = useRouter()

    if (router.query.role === "employee") return <Employee />

    if (router.query.role === "admin") return <Admin />

    if (router.query.role === "employer") return <Employer />

}

export default Dashboard
