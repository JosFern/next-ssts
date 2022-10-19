import axios from 'axios';
import * as jose from 'jose'

const key = new TextEncoder().encode("login-secret-key");

export const decryptParams = (data: string) => {
    const claims = jose.decodeJwt(data)
    console.log(claims)

    const protectedHeader = jose.decodeProtectedHeader(data)
    console.log(protectedHeader)

    return claims
}

export const encryptLoginParams = async (data: object | any) => {
    const jwt = await new jose.SignJWT({
        'email': data.email,
        'password': data.password
    })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .sign(key)

    return jwt
}

export const axiosAuth = (token: string) => {
    return axios.create({
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}