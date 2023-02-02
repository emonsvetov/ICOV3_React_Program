import React, { useEffect, useState } from "react";
import { Field } from "react-final-form";
import { labelizeNamedData, patch4Select } from "@/shared/helper";
import renderSelectField from "@/shared/components/form/Select";
import { getEvents } from "@/services/getEvents";

const EventField = ({name, placeholder, goalPlanType, program}) => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState(null);
  const [goalPlanTypeId, setGoalPlanTypeId] = useState(null);
  console.log(program)
  useEffect(() => {
      let mounted = true;
      if( program?.id && goalPlanType?.value && (!events || goalPlanTypeId !== goalPlanType.value) )
      {
          setLoading(true)
          getEvents(program.organization.id, program.id, goalPlanType.label == "Recognition Goal" ? 'badge': 'standard')
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