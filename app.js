const handlePeriod=(period,dateString,month)=>{
    if(month==0){
        const currentDate=new Date(dateString)
        period.push(`${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDay()}`)
    }else{
        const pre=new Date(dateString)
        let month=pre.getMonth()+2,
            year=pre.getFullYear(),
            date=pre.getDate()
            if(month>12){
                month=1
                year+=1
            }
            const currentDate=new Date(`${year}-${month}-${date}`)
            period.push(
                `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDay()}`
            )
    }
    return period[month]
}
document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault()
  
    document.querySelector('table tbody').innerHTML= ''
    const loan=Number(document.getElementById('loan').value)
    const months=Number(document.getElementById('months').value)
    const rate=Number(document.getElementById('rate').value)

    const disbursementDate=document.getElementById('disbursementDate').value
    const interest=Math.round((loan*months*rate)/1200)
    const originalAndInterest=loan+interest
    document.getElementById('interest').value=interest.toLocaleString()
    document.getElementById('originalAndInterest').value=originalAndInterest.toLocaleString()
    const period=[]
    for(let i=0;i<= months;i++){
        let html
        if(i==0){
            html=`
                <td>${i}</td>
                <td>${handlePeriod(period,disbursementDate,i)}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>

            `
        }else if(i==months){
            const orginalPerMonth=loan-Math.round(loan/months)*(months-1)
            const interestPerMonth=interest-Math.round((loan*rate)/1200)*(months-1)
            const orginalAndInterestPermonth=orginalPerMonth+interestPerMonth
            html=`
            <td>${i}</td>
            <td>${handlePeriod(period,period[i-1],i)}</td>
            <td>${orginalPerMonth.toLocaleString()}</td>
            <td>${interestPerMonth.toLocaleString()}</td>
            <td>${orginalAndInterestPermonth.toLocaleString()}</td>
            <td>0</td>

        `
        }else{
            const orginalPerMonth=Math.round(loan/months)
            const interestPerMonth=Math.round((loan*rate)/1200)
            const orginalAndInterestPermonth=orginalPerMonth+interestPerMonth
            const remainingOriginal=loan-orginalPerMonth*i
            html=`
            <td>${i}</td>
            <td>${handlePeriod(period,period[i-1],i)}</td>
            <td>${orginalPerMonth.toLocaleString()}</td>
            <td>${interestPerMonth.toLocaleString()}</td>
            <td>${orginalAndInterestPermonth.toLocaleString()}</td>
            <td>${remainingOriginal.toLocaleString()}</td>

        `
        }
        const tr=document.createElement('tr')
        tr.innerHTML=html
        document.querySelector('table tbody').appendChild(tr)
    }
})