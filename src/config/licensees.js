export const licensee = {
    BASIC : 'basic',
    PRO   : 'pro',
    ADV   : 'adv',
}

export const licensees = Object.keys(licensee)

export const licenseePriority = {
    [licensee.BASIC] : 0,
    [licensee.PRO]   : 1,
    [licensee.ADV]   : 2,
}
