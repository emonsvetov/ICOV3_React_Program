import React from "react";
import { Col, Row } from "reactstrap";
import Sidebar from "../../Layout/sidebar";
import { MyCalendar } from "./components/calendar";
import { useTranslation } from "react-i18next";

const Calendar = () => {
  const { t } = useTranslation();
  return (
    <>
      <Row className="mt-4">
        <Col md={4}>
          <Sidebar />
        </Col>

        <Col md={7}>
          <h2 className="mb-5">{t("calendar_of_events")}</h2>
          <MyCalendar />
        </Col>
      </Row>
    </>
  );
};

export default Calendar;
