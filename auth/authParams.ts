import axios from 'axios';
import * as jose from 'jose'

export const verifyParams = async (data: string) => {

    const { payload, protectedHeader }: any = await jose.jwtVerify(new TextEncoder().encode(data), new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY), {
        issuer: 'ssts',
        audience: 'ssts',
    })

    // console.log(protectedHeader)
    // console.log(payload.sub)

    // const claims = jose.decodeJwt(data)
    // console.log(claims)

    // const protectedHeader = jose.decodeProtectedHeader(data)
    // console.log(protectedHeader)

    return JSON.parse(payload.sub)
}

export const encryptParams = async (data: object | any) => {

    const jwt = await new jose.SignJWT({
        'urn:example:claim': true,
        'sub': JSON.stringify(data)
    })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt()
        .setIssuer('ssts')
        .setAudience('ssts')
        .setExpirationTime('2h')
        .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY))

    return jwt
}

export const axiosAuth = (token: string) => {
    return axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}