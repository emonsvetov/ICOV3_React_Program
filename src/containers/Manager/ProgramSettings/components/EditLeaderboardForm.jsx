import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Input,
  Col,
  Row,
  FormGroup,
  Label,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import { Form, Field } from "react-final-form";
import { labelizeNamedData, patch4Select } from "@/shared/helpers";
import { useDispatch, sendFlashMessage } from "@/shared/components/flash";
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage";
import { getLeaderboardTypes } from "@/services/program/getLeaderboardTypes";
import { getLeaderboard } from "@/services/program/getLeaderboard";
import renderToggleButtonField from "@/shared/components/form/ToggleButton";
import renderSelectField from "@/shared/components/form/Select";
import LeaderboardEventsTable from "./LeaderboardEventsTable";
import { useTranslation } from "react-i18next";
import LeaderboardGoalPlansTable from "@/containers/Manager/ProgramSettings/components/LeaderboardGoalPlansTable";


const LeaderboardForm = ({ organization, program, data, rtl, theme, toggle }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [leaderboardTypes, setLeaderboardTypes] = useState([]);
  let [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [oneLeaderBoard, setOneLeaderBoard] = useState(false);

  const onChangeOneLeaderboard = () => {
    setOneLeaderBoard( !oneLeaderBoard )
  }

  const setLeaderboardTypeNames = (items) => {
    let newData = [];
    let str = '';

    items.forEach((element) => {
      switch (element.name) {
        case 'Event Volume':
          str = `# of Awards Received`;
          break;

        case 'Event Summary':
          str = `Total Points Awarded`;
          break;

        default:
          str = 'Goal Progress';
          break;
      }
      newData.push({label: String(str), value: String(element.id)})
    });

    return newData;
  }

  const onSubmit = (values) => {
    let formData = {};

    formData["leaderboard_type_id"] = values.leaderboard_type_id.value;
    formData["name"] = values.name;
    formData["one_leaderboard"] = oneLeaderBoard;
    formData["visible"] = values?.visible ? true : false;
    formData["enable"] = values?.enable ? true : false;

    // console.log(formData)
    // return;
    let nLeaderboard = {
      ...leaderboard,
      ...values,
    };
    setLeaderboard(nLeaderboard);

    setLoading(true);
    axios
      .put(
        `/organization/${organization.id}/program/${program.id}/leaderboard/${leaderboard.id}`,
        formData
      )
      .then((res) => {
        //   console.log(res)
        if (res.status == 200) {
          // alert(window.location.href);
          // window.location.reload()
          dispatch(
            sendFlashMessage(
              "Leaderboard updated successfully!",
              "alert-success",
              "top"
            )
          );
          setLoading(false);
          toggle(null, true)
        }
      })
      .catch((err) => {
        //console.log(error.response.data);
        dispatch(
          sendFlashMessage(
            <ApiErrorMessage errors={err.response.data} />,
            "alert-danger",
            "top"
          )
        );
        setLoading(false);
      });
  };
  
  useEffect( () => {
    if( data?.id )
    {
      setLeaderboard(data)
    }
    if( program?.id ) {
      getLeaderboardTypes(organization.id, program.id)
      .then( types => {
        setLeaderboardTypes(labelizeNamedData(types))
        setLoading(false)
      })
    }
  }, [data, program])


  if (!leaderboard) return t("loading");

  leaderboard = patch4Select(
    leaderboard,
    "leaderboard_type_id",
    leaderboardTypes
  );
  leaderboard.enable = leaderboard.status.status == "Active" ? true : false;
  // console.log(leaderboard)

  return (
    <Form onSubmit={onSubmit} validate={validate} initialValues={leaderboard}>
      {({ handleSubmit, form, submitting, pristine, values }) => (
        <form
          className="form d-flex flex-column justify-content-evenly"
          onSubmit={handleSubmit}
        >
          <Card className="w-100">
            <CardHeader tag="h5" className="text-center">
              Leaderboard Information
            </CardHeader>
            <CardBody>
              <Row>
                <Col md="6">
                  <Label>Leaderboard Name</Label>
                </Col>
                <Col md="6">
                  <Field name="name">
                    {({ input, meta }) => (
                      <FormGroup>
                        <Input
                          placeholder="Leaderboard Name"
                          type="text"
                          {...input}
                        />
                        {meta.touched && meta.error && (
                          <span className="text-danger">{meta.error}</span>
                        )}
                      </FormGroup>
                    )}
                  </Field>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Label>Leaderboard Type</Label>
                </Col>
                <Col md="6">
                  <Field
                    name="leaderboard_type_id"
                    className="react-select"
                    options={leaderboardTypes}
                    placeholder={"Select Event Type"}
                    component={renderSelectField}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Label>Enable This Leaderboard</Label>
                </Col>
                <Col md="6">
                  <FormGroup className="d-flex justify-content-between">
                    <Field name="enable" component={renderToggleButtonField} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Label>Visible</Label>
                </Col>
                <Col md="6">
                  <FormGroup className="d-flex justify-content-between">
                    <Field name="visible" component={renderToggleButtonField} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Label>One Leaderboard</Label>
                </Col>
                <Col md="6">
                  <FormGroup className="d-flex justify-content-between">
                    <Field
                      name="one_leaderboard"
                      type="checkbox"
                      value={oneLeaderBoard}
                      component={renderToggleButtonField}
                      parse={ value => {
                        onChangeOneLeaderboard();
                        return value
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>

          {oneLeaderBoard == true && (
            <div>Note: If the leaderboard is mentioned as one leaderboard, It will get details of all the awards. None of the associated event will be considered.</div>
          )}

          {/*goal progress*/}
          {leaderboard?.leaderboard_type_id?.value !== '3' && (
            <div className={!oneLeaderBoard ? "" : "none"}>
              <Card className="w-100">
                <CardHeader tag="h5" className="text-center">
                  Assigned Events
                </CardHeader>
                <CardBody>
                  <LeaderboardEventsTable
                    leaderboard={leaderboard}
                    organization={organization}
                    program={program}
                    assigned={true}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                </CardBody>
              </Card>
              <Card className="w-100">
                <CardHeader tag="h5" className="text-center">
                  Unassigned Events
                </CardHeader>
                <CardBody>
                  <LeaderboardEventsTable
                    leaderboard={leaderboard}
                    organization={organization}
                    program={program}
                    assigned={false}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                </CardBody>
              </Card>
            </div>
          )}

          {leaderboard?.leaderboard_type_id?.value === '3' && (
            <div className={!oneLeaderBoard ? "" : "none"}>
              <Card className="w-100">
                <CardHeader tag="h5" className="text-center">
                  Assigned Goal Plans
                </CardHeader>
                <CardBody>
                  <LeaderboardGoalPlansTable
                    leaderboard={leaderboard}
                    organization={organization}
                    program={program}
                    assigned={true}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                </CardBody>
              </Card>
              <Card className="w-100">
                <CardHeader tag="h5" className="text-center">
                  Unassigned Goal Plans
                </CardHeader>
                <CardBody>
                  <LeaderboardGoalPlansTable
                    leaderboard={leaderboard}
                    organization={organization}
                    program={program}
                    assigned={false}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                </CardBody>
              </Card>
            </div>
          )}

          <div className="d-flex justify-content-end mt-4">
            <Button disabled={loading} color="danger" type="submit">
              {"Save"}
            </Button>
          </div>
        </form>
      )}
    </Form>
  );
};

const validate = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Please enter leaderboard name";
  }
  if (!values.leaderboard_type_id) {
    errors.leaderboard_type_id = "Please select leaderboard type";
  }
  return errors;
};

export default LeaderboardForm;
