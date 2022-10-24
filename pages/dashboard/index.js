import Employer from '../employer'
import { useRouter } from 'next/router'
import Employee from '../employee'
import Admin from '../Admin'
import RequireAuth from '../components/RequireAuth'
import { useEffect } from 'react'


function Dashboard() {

    const router = useRouter()


    if (router.isReady) {

        if (router.query.role === "admin") return <Admin />

        if (router.query.role === "employee") return <Employee />

        return <Employer />

    }




}

export default Dashboard
