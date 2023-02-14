import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { labelizeNamedData, patch4Select } from "@/shared/helpers";
import { useDispatch, sendFlashMessage } from "@/shared/components/flash";
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage";
import { getLeaderboardTypes } from "@/services/program/getLeaderboardTypes";
import { getLeaderboard } from "@/services/program/getLeaderboard";
import renderSelectField from "@/shared/components/form/Select";
import CheckboxField from "@/shared/components/form/CheckboxField";
import { useTranslation } from "react-i18next";

const EditLeaderboardForm = ({ id, organization, program }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [leaderboardTypes, setLeaderboardTypes] = useState([]);
  let [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const onSubmit = (values) => {
    let formData = {};

    formData["leaderboard_type_id"] = values.leaderboard_type_id.value;
    formData["name"] = values.name;

    console.log(formData);
    // return;

    setLoading(true);
    axios
      .post(
        `/organization/${organization.id}/program/${program.id}/leaderboard`,
        formData
      )
      .then((res) => {
        //   console.log(res)
        if (res.status == 200) {
          // alert(window.location.href);
          window.location.reload();
          dispatch(
            sendFlashMessage(
              "Leaderboard added successfully!",
              "alert-success",
              "top"
            )
          );
          setLoading(false);
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

  useEffect(() => {
    if (organization && program && id) {
      let mounted = true;
      setLoading(true);
      getLeaderboard(organization.id, program.id, id)
        .then((data) => {
          console.log(data);
          setLeaderboard(data);
          getLeaderboardTypes(organization.id, program.id)
            .then((items) => {
              if (mounted) {
                setLeaderboardTypes(labelizeNamedData(items));
                setLoading(false);
              }
            })
            .catch((error) => {
              console.log(error.response.data);
            });
        })
        .catch((error) => {
          console.log(error.response.data);
        });
      return () => (mounted = false);
    }
  }, [organization, program, id]);

  if (!leaderboard) return t("loading");

  leaderboard = patch4Select(
    leaderboard,
    "leaderboard_type_id",
    leaderboardTypes
  );

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      // mutators={{
      //     handleChange
      // }}
      initialValues={leaderboard}
    >
      {({ handleSubmit, form, submitting, pristine, values }) => (
        <form
          className="theme-light ltr-support form d-flex flex-column justify-content-evenly"
          onSubmit={handleSubmit}
        >
          <Row>
            <Col md="4">
              <Label>Leaderboard Name</Label>
            </Col>
            <Col md="8">
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
            <Col md="4">
              <Label>Select leaderboard type</Label>
            </Col>
            <Col md="8">
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
            <Col md="4">
              <Label>Select leaderboard type</Label>
            </Col>
            <Col md="8">
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
            <Col md="6" lg="4" xl="4">
              <div className="form__form-group">
                <CheckboxField
                  name="events_has_limits"
                  label="Set limit in events"
                />
              </div>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
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

export default EditLeaderboardForm;
