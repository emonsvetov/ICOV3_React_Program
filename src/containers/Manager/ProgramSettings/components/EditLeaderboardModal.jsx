import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CloseIcon from 'mdi-react/CloseIcon';
import {getEventTypes} from '@/services/getEventTypes'
import {labelizeNamedData, patch4Select} from '@/shared/helper'
import {useDispatch, sendFlashMessage} from "@/shared/components/flash"
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage"
import LeaderboardForm from './LeaderboardForm';

import { Modal, Card, CardBody, CardHeader } from 'reactstrap';

const EditLeaderboardModal = ({program, organization, isOpen, setOpen, toggle, data, leaderboard, setLeaderboard}) => {
  const dispatch = useDispatch()
  const [eventTypes, setEventTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  
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
    // return
    let nLeaderboard = {
      ...leaderboard,
      ...values
    }
    setLeaderboard( nLeaderboard )
    setLoading(true)
    axios
      .put(`/organization/${organization.id}/program/${program.id}/event/${leaderboard.id}`, eventData)
      .then((res) => {
        //   console.log(res)
        if (res.status == 200) {
          dispatch(sendFlashMessage('Event updated successfully!', 'alert-success', 'top'))
          setLoading(false)
          window.location.reload()
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
    organization,
    program,
    loading,
    onSubmit,
  }

  return (
    <Modal className={`program-settings modal-2col modal-xl`} isOpen={isOpen} toggle={() => setOpen(true)}>
      <div className='close cursor-pointer'>
        <CloseIcon onClick={toggle} size={30}/>
      </div>
      <Card className='w-100'>
        <CardHeader tag="h3">Edit Leaderboard</CardHeader>
        <CardBody>
          <LeaderboardForm {...props} />
        </CardBody>
      </Card>
    </Modal>
)}

export default EditLeaderboardModal;
