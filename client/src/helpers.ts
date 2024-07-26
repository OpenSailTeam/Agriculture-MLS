export const formatNumberCurrency = (q: any) => {
    return q.toLocaleString('en-CA', {
        style: 'currency',
        currency: 'CAD',
        maximumFractionDigits: 0
    })
} 

export const formatNumber = (q: any) => {
    return q.toLocaleString('en-CA', { maximumFractionDigits: 2 })
} 