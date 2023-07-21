import React, { useEffect, useState } from "react";
import { Field } from "react-final-form";
import { labelizeNamedData } from "@/shared/helpers";
import renderSelectField from "@/shared/components/form/Select";
import { getEvents } from "@/services/program/getEvents";

const EventField = ({name, placeholder, goalPlanType, program}) => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState(null);
  const [goalPlanTypeId, setGoalPlanTypeId] = useState(null);
  useEffect(() => {
      let mounted = true;
      if( program?.id && goalPlanType?.value && (!events || goalPlanTypeId !== goalPlanType.value) )
      {
          setLoading(true)
          getEvents(program.organization_id, program.id, {'type':goalPlanType.label == "Recognition Goal" ? 'badge': 'standard','except_type':'Activation'}) //To DO Exclude "Activation" event type in create goal plan 
          .then(items => {
              if(mounted) {
                  setGoalPlanTypeId(goalPlanType.value)
                  setEvents(labelizeNamedData(items))
                  setLoading(false)
              }
          })
      }
      return () => mounted = false;
  }, [program, goalPlanType])

  if( loading ) return 'loading...'
  if( !events ) return 'No events!'

  return (
      <Field
          name={name}
          className="react-select"
          options={events}
          placeholder={placeholder}
          component={renderSelectField}
      />
  )
}
export default EventField;