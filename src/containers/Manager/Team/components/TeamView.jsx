import React, { useState, useEffect } from "react";
import {
  Input,
  Col,
  Container,
  Row,
  FormGroup,
  Label,
  Button,
  ButtonGroup,
} from "reactstrap";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent } from "@/services/program/getEvent";
import { TEAM_DATA } from "./Mockdata";
import ModalWrapper from "./ModalWrapper";
import { useTranslation } from "react-i18next";

const TeamView = ({ auth, program, organization }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const [modalName, setModalName] = useState(null);
  const [mate, setMate] = useState(null);
  const { mateId } = useParams();
  const toggle = (name = null) => {
    if (name) setModalName(name);
    setOpen((prevState) => !prevState);
  };
  const navigate = useNavigate();
  useEffect(() => {
    // alert(id)
    // getEvent(organization.id, program.id, eventId)
    // .then(item => {
    //     // console.log(item)
    //     setEvent(item)
    //     toggle('EditEvent');
    //     setLoading(false)
    // })
    setMate(TEAM_DATA[0]);
  }, [mateId]);

  const onDeleteMate = (e, mate_id) => {};

  if (!auth || !program || !organization) return t("loading");

  return (
    <div className="team">
      <Container>
        <Row className="mt-4">
          <Col md={10}>
            <div className="my-3 d-flex justify-content-between">
              <h3>{mate?.name}</h3>
              <ButtonGroup>
                <Button color="success" onClick={() => navigate(-1)}>
                  Back
                </Button>
                <Button color="primary" onClick={() => toggle("EditTeam")}>
                  Edit
                </Button>
                <Button
                  color="danger"
                  onClick={(e) => {
                    if (window.confirm("Are you sure to delete this Mate?")) {
                      onDeleteMate(e, mateId);
                    }
                  }}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </div>
          </Col>
        </Row>

        <div className="team-view">
          <Row>
            <Col md="6">
              <FormGroup className="d-flex justify-content-between">
                <Label>Photo:(300 * 300px)</Label>
                <img src={mate?.photo} style={{}} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormGroup className="d-flex justify-content-between">
                <Label>Name</Label>
                <Label>{mate?.name}</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormGroup className="d-flex justify-content-between">
                <Label>Title</Label>
                <Label>{mate?.title}</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormGroup className="d-flex justify-content-between">
                <Label>Description</Label>
                <Label>{mate?.description}</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormGroup className="d-flex justify-content-between">
                <Label>Contact Phone</Label>
                <Label>{mate?.phone}</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormGroup className="d-flex justify-content-between">
                <Label>Contact Email</Label>
                <Label>{mate?.email}</Label>
              </FormGroup>
            </Col>
          </Row>
        </div>
      </Container>

      <ModalWrapper
        name={modalName}
        isOpen={isOpen}
        setOpen={setOpen}
        toggle={toggle}
        mate={mate}
        setMate={setMate}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};

export default connect(mapStateToProps)(TeamView);
