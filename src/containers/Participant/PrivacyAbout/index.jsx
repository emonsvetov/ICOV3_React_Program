import React from "react";
import { Col, Container, Row } from "reactstrap";
import { SidebarOrigin } from "../../Layout/sidebar";
import { useTranslation } from "react-i18next";

const Calendar = () => {
    const { t } = useTranslation();
    return (
        <>
            <Row className="mt-4">
                <Col md={4}>
                    <SidebarOrigin />
                </Col>

                <Col md={7}>
                    <h2 className="mb-5">{t("calendar_of_events")}</h2>
                </Col>
            </Row>
        </>
    );
};

export default Calendar;
