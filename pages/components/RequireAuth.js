import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function RequireAuth(props) {

    const router = useRouter()

    const user = useSelector(state => state.logged);

    console.log(user.loggedIn.role);

    if (user.loggedIn.email === '') return router.push('/')

    if (props.role.includes(user.loggedIn.role)) return props.children

    if (user.loggedIn.role === 'employee') return router.push(`/dashboard?role=${user.loggedIn.role}`)

    if (user.loggedIn.role === 'admin') return router.push(`/dashboard?role=${user.loggedIn.role}`)

    return router.push('/dashboard')

}