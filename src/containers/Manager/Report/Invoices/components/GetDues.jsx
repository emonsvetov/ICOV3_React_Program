export const getDues = (invoice) => {
    // console.log(invoice);

    if(invoice.invoice_type.name==='On-Demand' || invoice.invoice_type.name==='Credit Card Deposit')
    {
       return {
            label: 'Total Due',
            amount: `$${(invoice.total_end_balance * -1).toFixed(2)}`
       }
    }
    else
    {
        if( invoice?.journal_summary )  {
            return {
                label: 'Invoice Total',
                amount: `$${(invoice.journal_summary.grand_total * -1).toFixed(2)}`
            }
        }   else {
            return {
                label: 'Balance Due',
                amount: `$${(invoice.total_end_balance * -1).toFixed(2)}`
            }
        }
    }
}
