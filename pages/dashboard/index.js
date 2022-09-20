import Employer from '../employer'
import {useRouter} from 'next/router'
import { useEffect } from 'react'
import Employee from '../employee'
import Admin from '../Admin'

function Dashboard() {

    const router = useRouter()

    useEffect(() => {
        console.log(router.query);
    }, [])

    if (router.query?.role === "employee") return <Employee/>
    
    if(router.query?.role === "admin") return <Admin/>

    return (
        <div style={{
            background: '#f0f2f5',
            minHeight: '100vh'
        }}>
            <Employer/>
        </div>
    )
}

export default Dashboard
