import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {
  Modal,
  Button,
  Card,
  CardHeader,
  CardBody,
  Table
} from 'reactstrap';

import { getCachedProgramTree } from "@/shared/helpers";


const PaymentCreditCardStep_1 = ({amount, action, isOpen, toggle, pId}) => {

  const [program, setProgram] = useState(null)

  const depositPercentage = 0.02;
  const conveniencePercentage = 0.03;

  const btnAction = async() => {
    const paymentData = {
      "getHostedPaymentPageRequest": {
        "merchantAuthentication": {
          "name": "5KP3u95bQpv",
          "transactionKey": "346HZ32z3fP4hTG2"
        },
        "transactionRequest": {
          "transactionType": "authCaptureTransaction",
          "amount": "20.00",
          "profile": {
            "customerProfileId": "123456789"
          },
          "customer": {
            "email": "ellen@mail.com"
          },
          "billTo": {
            "firstName": "Ellen",
            "lastName": "Johnson",
            "company": "Souveniropolis",
            "address": "14 Main Street",
            "city": "Pecan Springs",
            "state": "TX",
            "zip": "44628",
            "country": "US"
          }
        },
        "hostedPaymentSettings": {
          "setting": [{
            "settingName": "hostedPaymentReturnOptions",
            "settingValue": "{\"showReceipt\": true, \"url\": \"https://mysite.com/receipt\", \"urlText\": \"Continue\", \"cancelUrl\": \"https://mysite.com/cancel\", \"cancelUrlText\": \"Cancel\"}"
          }, {
            "settingName": "hostedPaymentButtonOptions",
            "settingValue": "{\"text\": \"Pay\"}"
          }, {
            "settingName": "hostedPaymentStyleOptions",
            "settingValue": "{\"bgColor\": \"blue\"}"
          }, {
            "settingName": "hostedPaymentPaymentOptions",
            "settingValue": "{\"cardCodeRequired\": false, \"showCreditCard\": true, \"showBankAccount\": true}"
          }, {
            "settingName": "hostedPaymentSecurityOptions",
            "settingValue": "{\"captcha\": false}"
          }, {
            "settingName": "hostedPaymentShippingAddressOptions",
            "settingValue": "{\"show\": false, \"required\": false}"
          }, {
            "settingName": "hostedPaymentBillingAddressOptions",
            "settingValue": "{\"show\": true, \"required\": false}"
          }, {
            "settingName": "hostedPaymentCustomerOptions",
            "settingValue": "{\"showEmail\": false, \"requiredEmail\": false, \"addPaymentProfile\": true}"
          }, {
            "settingName": "hostedPaymentOrderOptions",
            "settingValue": "{\"show\": true, \"merchantName\": \"G and S Questions Inc.\"}"
          }, {
            "settingName": "hostedPaymentIFrameCommunicatorUrl",
            "settingValue": "{\"url\": \"https://mysite.com/special\"}"
          }]
        }
      }
    }

    try {
      const response = await axios.post(
        `https://test.authorize.net/payment/payment`,
        paymentData, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
      console.log(response)
      // return response.data;
    } catch (e) {
        throw new Error(`API error:${e?.message}`);
    }
  }

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
          <Button color='primary' type='submit' onClick={btnAction}>Continue to Make Payment using Authorize.Net</Button>&nbsp;
          <Button color='danger' type='submit' onClick={toggle}>No</Button>
        </div>
        </CardBody>
      </Card>
    </Modal>
  )
}

export default PaymentCreditCardStep_1;