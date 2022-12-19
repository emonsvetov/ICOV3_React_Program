import React from "react";
import { Col, Container, Row } from "reactstrap";
import { SidebarOrigin } from "../../Layout/sidebar";
import { MyCalendar } from "./components/calendar";

const Calendar = () => {
  return (
    <>
      <Row className="mt-4">
        <Col md={4}>
          <SidebarOrigin props={{ title: "My Rewards", icon: "MyRewards" }} />
        </Col>

        <Col md={7}>
          <h2 className="mb-5">Calendar of Events</h2>
          <MyCalendar />
        </Col>
      </Row>
    </>
  );
};

export default Calendar;
