import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CloseIcon from 'mdi-react/CloseIcon';
import {getEventTypes} from '@/services/getEventTypes'
import {labelizeNamedData} from '@/shared/helper'
import {useDispatch, sendFlashMessage} from "@/shared/components/flash"
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage"
import AddLeaderboardForm from './AddLeaderboardForm'
import { Modal, Card, CardBody, CardHeader } from 'reactstrap';


const AddLeaderboardPopup = ({program, organization, isOpen, setOpen, toggle, data}) => {
  const dispatch = useDispatch()
  const [eventTypes, setEventTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const onChangeAwardValue = ([field], state, { setIn, changeValue }) => {
    const v = field.target.value
    if( isNaN( v ) ) return;
    if(field.target.name === 'max_awardable_amount')  
    {
      const field = state.fields["awarding_points"];
      field.change( program.factor_valuation *  v);
    }
    else if(field.target.name === 'awarding_points')  
    {
      const field = state.fields["max_awardable_amount"];
      field.change(  v / program.factor_valuation );
    }
  }
  // console.log(program)
  const onSubmit = (values) => {
    let eventData = {};
    eventData["organization_id"] = organization.id;
    eventData["program_id"] = program.id;

    console.log(values)

    let {
      name,
      enable,
      max_awardable_amount,
      post_to_social_wall,
      message,
      award_message_editable,
      type_id
    } = values;

    eventData.name = name;
    eventData.max_awardable_amount = max_awardable_amount;
    eventData.post_to_social_wall = post_to_social_wall ? true: false;
    eventData.award_message_editable = award_message_editable ? true: false;
    eventData.enable = enable ? true: false;
    
    eventData.message = message;
    eventData.type_id = type_id.value;

    // console.log(eventData)

    // console.log(eventData)
    // return
    setLoading(true)
    axios
      .post(`/organization/${organization.id}/program/${program.id}/event`, eventData)
      .then((res) => {
        //   console.log(res)
        if (res.status == 200) {
          window.location.reload()
          dispatch(sendFlashMessage('Event added successfully!', 'alert-success', 'top'))
          setLoading(false)
        }
      })
      .catch((err) => {
        //console.log(error.response.data);
        dispatch(sendFlashMessage(<ApiErrorMessage errors={err.response.data} />, 'alert-danger', 'top'))
        setLoading(false)
      });
  };
  useEffect( () => {
    getEventTypes()
    .then( evtypes => {
      // console.log(evtypes)
      setEventTypes(labelizeNamedData(evtypes))
    })
  }, [])


  let props = {
    btnLabel: 'Save Leaderboard',
    eventTypes,
    loading,
    onSubmit,
    onChangeAwardValue
  }

  return (
    <Modal className={`program-settings modal-2col modal-xl`} isOpen={isOpen} toggle={() => setOpen(true)}>
      <div className='close cursor-pointer'>
        <CloseIcon onClick={toggle} size={30}/>
      </div>
      <Card className='w-100'>
        <CardHeader tag="h3">Add New Leaderboard</CardHeader>
        <CardBody>
          <AddLeaderboardForm {...props} />
        </CardBody>
      </Card>
    </Modal>
)}

export default AddLeaderboardPopup;
