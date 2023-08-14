import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Button,
  Card,
  CardHeader,
  CardBody,
  Table
} from 'reactstrap';

import { getCachedProgramTree } from "@/shared/helpers";
import { initCcdeposit } from "@/services/program/transferMonies";
import{flashError, useDispatch} from '@/shared/components/flash'


const PaymentCreditCardStep_1 = ({amount, isOpen, toggle, pId, orgId}) => {
  const dispatch = useDispatch()
  const formEl = useRef();
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(null)
  const [program, setProgram] = useState(null)

  const getProgramFromTree = (pId, pTree) => {
    if( pTree && pTree.length > 0 ) {
      for (const [key, p] of Object.entries(pTree)) {
        if(p?.id && p.id === pId) {
          return p
        } else if(p?.children) {
          return getProgramFromTree(pId, p.children)
        }
      }
    }
  }

  const computeFee = (deposit_amount, key) => {
    if( !deposit_amount || !key || !program) return;
    const p = program
    // console.log(key)
    // console.log(isNaN(parseFloat(p[key])))
    const v_fee = typeof p[key] !== 'undefined' ? ( !isNaN(parseFloat(p[key])) ? (p[key] / 100.0) : 0) : 0;
    // console.log(v_fee)
    // console.log(deposit_amount)
		const v_fee_amount = v_fee * deposit_amount;
    // console.log(v_fee_amount)
    return v_fee_amount;
  }

  useEffect( () => {
    if( pId ) {
      const pTree = getCachedProgramTree();
      const p = getProgramFromTree(pId, pTree);
      setProgram(p);
      // console.log(p)
    }
  }, [pId])

  const onClickMakePayment = () => {
    const formData = {
        amount
    }
    initCcdeposit(orgId, pId, formData)
    .then( response => {
        // console.log(response)
        if( response.status === 'ok') {
          setToken(response.token)
          const depositObj = {
            orgId, pId, hash: response.hash, amount
          }
          localStorage.setItem('ccdepositHash', JSON.stringify(depositObj))
          setTimeout(()=>formEl.current.submit(), 1000)
          setLoading(false)
        } else {
          flashError(dispatch, response.error)
          setLoading(false)
        }
    })
    .catch( error => {
        console.log(error)
        flashError(dispatch, error)
        setLoading(false)
        
    })
  }

  if( !program || !amount ) return null

  const depositFeeAmount = computeFee(amount, 'deposit_fee')
  const convenienceFeeAmount = computeFee(amount, 'convenience_fee')

  // console.log(program)
  // console.log(depositFeeAmount)
  // console.log(convenienceFeeAmount)

  const totalAmount = parseFloat(amount) + depositFeeAmount + convenienceFeeAmount;

  return (
    <Modal className={`modal-2col modal-md p-0`} isOpen={isOpen} toggle={toggle}>
      <Card className='w-100'>
        <CardHeader tag="h3">
        Credit Card Deposit
          <Button className='btn btn-lg float-end' close onClick={toggle}/>
        </CardHeader>
        <CardBody className='text-left'>
          <p>Fund your account with a Credit Card using secure payment through Authorize.net</p>
          <Table>
          <tbody>
            <tr>
              <th scope="row">Deposit Amount</th>
              <td>${parseFloat(amount).toFixed(2)}</td>
            </tr>
            <tr>
              <th scope="row">Deposit Fee	</th>
              <td>$ {depositFeeAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <th scope="row">Convenience Fee</th>
              <td>$ {convenienceFeeAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <th scope="row">Total that will be charged to your card</th>
              <td><strong>${totalAmount.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </Table>
        <div className='d-flex justify-content-end mt-3'>
          <Button color='primary' disabled={loading} type='submit' onClick={onClickMakePayment}>Continue to Make Payment using Authorize.Net</Button>&nbsp;
          <Button color='danger' disabled={loading} type='submit' onClick={toggle}>No</Button>
        </div>
        <form ref={formEl} method="POST" action="https://test.authorize.net/payment/payment" target="_top">
          <input type="hidden" value={token} name="token" />
        </form>
        </CardBody>
      </Card>
    </Modal>
  )
}

export default PaymentCreditCardStep_1;