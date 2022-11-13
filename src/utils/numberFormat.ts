export const numberFormat = (val: string | number | bigint)=>{
    const newNum = new Intl.NumberFormat('id-ID');
    // @ts-ignore
    return newNum.format(val || '0')
}
export const numberFormatWithRp = (val: string | number | bigint)=>{
    const newNum = new Intl.NumberFormat('id-ID');
    // @ts-ignore
    return 'Rp '+newNum.format(val || '0')
}