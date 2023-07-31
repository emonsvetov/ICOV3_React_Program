import React,{useState} from 'react';
import {
  Modal,
  Button,
  Card,
  CardHeader,
  CardBody,
  Table
} from 'reactstrap';

const PaymentCreditCardStep_1 = ({programs, amounts, action, isOpen, setOpen, toggle}) => {

  // const getProgramName = (key) => {
  //   // const programId = key.replace("amounts_", "")
  //   // return programs.map( program => {
  //   //   if(program.id == programId) {
  //   //     return program.name
  //   //   }
  //   // })
  // }
  
 
  const depositPercentage = 0.02;
  const conveniencePercentage = 0.03;

 

 
  const RenderProgramAmounts = () => {
    let html = []
    for (const [key, amount] of Object.entries(amounts)) {
      const depositFeeAmount = amount * depositPercentage;
      const convenienceFeeAmount = amount * conveniencePercentage;
      const totalAmount = parseFloat(amount) + depositFeeAmount + convenienceFeeAmount;
      if( amount !== "" ) {
        if( !isNaN(amount) ) {
          html.push(
            <Table
>
  <tbody>
    <tr>
      <th scope="row">
      Deposit Amount
      </th>
      <td>
     ${parseFloat(amount).toFixed(2)}
      </td>
      
    </tr>
    <tr>
      <th scope="row">
      Deposit Fee	
      </th>
      <td>
      $ {depositFeeAmount.toFixed(2)}
      </td>
      
    </tr>
    <tr>
      <th scope="row">
      Convenience Fee	
      </th>
      <td>
      $ {convenienceFeeAmount.toFixed(2)}
      </td>
      
    </tr>
    <tr>
      <th scope="row">
      Total that will be charged to your card
      </th>
      <td>
        
      <strong>${totalAmount.toFixed(2)}</strong>
      </td>
      
    </tr>
  </tbody>
</Table>
          )
        }
      }
    }
    return html
  }

  // if( !programs || !amounts) return ''

  return (
    <Modal className={`modal-2col modal-md p-0`} isOpen={isOpen} toggle={toggle}>
      <Card className='w-100'>
        <CardHeader tag="h3">
        Credit Card Deposit
          <Button className='btn btn-lg float-end' close onClick={toggle}/>
        </CardHeader>
        <CardBody className='text-left'>
          <p>Fund your account with a Credit Card using secure payment through Authorize.net</p>
          <RenderProgramAmounts key={'key-renderprogram-amounts'} />
          <div className='d-flex justify-content-end mt-3'>
            <Button color='primary' type='submit' onClick={action}>Ok</Button>&nbsp;
            <Button color='danger' type='submit' onClick={toggle}>No</Button>
          </div>
        </CardBody>
      </Card>
    </Modal>
  )
}

export default PaymentCreditCardStep_1;