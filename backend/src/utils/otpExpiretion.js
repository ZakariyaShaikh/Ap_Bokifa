const getOtpExpiration = () => {
    return new Date (Date.now + 10 * 60 * 1000)
}

export default getOtpExpiration