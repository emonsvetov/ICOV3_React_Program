import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Form, Field } from 'react-final-form';
import { Input, Table } from 'reactstrap';
import TemplateButton from "@/shared/components/TemplateButton";
import { PEER_RECLAIM_COLUMNS } from "./columns";
import { flashDispatch, flashMessage } from '@/shared/helpers'
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage"
import { getReclaimablePeerPoints } from "@/services/user/getReclaimablePeerPoints";

import axios from 'axios'


const Textfield = ({index}) => {
  return (
    <Field name={`notes[${index}]`}>
        {({ input, meta }) => (
            <Input
                placeholder=""
                type="text"
                {...input}
            />
        )}
    </Field>
  )
}

const Checkbox = ({index}) => {
  return (
    <Field name={`reclaim[${index}]`} type="checkbox">
        {({ input, meta }) => (
            <Input
                type="checkbox"
                {...input}
            />
        )}
    </Field>
  )
}

const ReclaimForm = ({ toggle, participant, program, organization }) => {
  const dispatch = flashDispatch()
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  let [data, setData] = useState([]);
  const [saving, setSaving] = useState(false);
  const onSubmit = (values) => {
    
    if(!values?.reclaim || values.reclaim.length <= 0)
    {
      alert(t("Select something to reclaim"))
      return
    }
    console.log(values)
    const formData ={reclaim: []}

    Object.keys(values.reclaim).map( rIndex => {
      const isReclaim = values.reclaim[rIndex] ? true : false
      if( isReclaim )
      {
        formData.reclaim.push({
          id: data[rIndex]['id'],
          note: values?.notes ? values.notes[rIndex] : "",
          journal_event_id: data[rIndex]['journal_event_id'],
          amount: parseFloat(data[rIndex]['amount']).toFixed(0),
        })
      }
    })
    console.log(formData)
    // return;
    // setSaving(true)
    // return
    axios
        .post(`/organization/${organization.id}/program/${program.id}/user/${participant.id}/reclaim-peer-points`, formData)
        .then((res) => {
            console.log(res)
            if (res.status == 200) {
                dispatch(flashMessage('reclaimed successfully!', 'alert-success', 'top'))
                setSaving(false)
                toggle()
                // window.location.reload()
            }
        })
        .catch((err) => {
            //console.log(error.response.data);
            dispatch(flashMessage(<ApiErrorMessage errors={err.response.data} />, 'alert-danger', 'top'))
            setSaving(false)
        });
  };

  const onClickAction = (e) => {
  }

  const columns = React.useMemo(() => PEER_RECLAIM_COLUMNS, []);

  // console.log(data)

  useEffect(() => {
      let mounted = true;
      if ( participant ) {
        setLoading(true);
        getReclaimablePeerPoints(organization.id, program.id, participant.id).then((items) => {
            console.log(items)
            setData(items);
            setLoading(false);
        });
      }
      return () => (mounted = false);
  }, [participant]);

  if (loading || !participant) return t("loading")
  if( !data ) return 'nothing to reclaim!'

  return (
      <div className="points-summary-table">
          <Form
              onSubmit={onSubmit}
          >
              {({ handleSubmit, form, submitting, pristine, values }) => {
                  // console.log(values)
                  return (
                      <form className="form d-flex flex-column justify-content-evenly p-2" onSubmit={handleSubmit}>
                          <Table className="table table-borderless table-striped">
                              <thead>
                                      <tr>
                                          {columns.map((column, i) => (
                                              <th key={`header-${i}`}>
                                                  {column.Header}
                                              </th>
                                          ))}
                                      </tr>
                              </thead>
                              <tbody>
                                  {data.map((row, i) => {
                                      return (
                                        <tr key={`row-${i}`}>
                                          {columns.map((column, j) => {
                                            let value = row[column.accessor]
                                            if(column.accessor === 'awarded')
                                            {
                                              value = new Date(value).toLocaleDateString("en-US", {})
                                            }
                                            if(column.accessor === 'amount')
                                            {
                                              value = parseFloat(value).toFixed(0)
                                            }
                                            if(column.accessor === 'reclaim')
                                            {
                                              value = <Checkbox index={i} />
                                            }
                                            if(column.accessor === 'reason')
                                            {
                                              value = <Textfield index={i} />
                                            }
                                            return (
                                              <td key={`column-${j}`}>
                                                {value}
                                              </td>
                                            )
                                          })}
                                        </tr>
                                      )
                                  })}
                              </tbody>
                          </Table>
                          <div className='d-flex justify-content-end'>
                              <TemplateButton type='submit' text='Reclaim Peer Allocations' />
                          </div>
                      </form>
                  )
              }}
          </Form>
      </div>
  );
};

export default ReclaimForm