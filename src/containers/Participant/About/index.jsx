import React from "react";
import {Col, Row} from "reactstrap";
import {useTranslation} from "react-i18next";

const Calendar = () => {
    const {t} = useTranslation();
    return (
        <>
            <Row className="mt-12">
                <Col md={12} style={{padding: "0px 200px 50px 200px"}}>
                        <table align={"center"} style={{width: "80%"}} id="about-us-table" cellSpacing="0">
                            <thead>
                            <tr>
                                <th><h2 className="mb-5">{t("about")}</h2></th>
                            </tr>
                            <tr>
                                <th style={{width: "50%", backgroundColor: "#0066cc", color: "white"}}> Quick Facts</th>
                                <th  style={{width: "50%", backgroundColor: "#0066cc", color: "white"}}>Who are the Principles?</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td valign="top">
                                    <b>Formed</b> <br /> November 2009 <br /><br /> <b>Headquarters</b>
                                    <br /> 3801 PGA Blvd, Suite 600<br /> Palm Beach Gardens, FL.
                                        33410 <br /> <br /> <b>Status</b> <br /> Privately Held <br /> <br />
                                            <b>Business Verticals</b> <br /> Multifamily Real Estate;
                                            Commercial Real Estate; Auto/Motorcycle; Furniture Rental; Health
                                            Care; Technology Services; Customer Service; Employee Incentive
                                            Programs <br /> <br /> <b>Products</b> <br /> Loyalty and Rewards
                                                Platforms <br /> <br /> <b>Product Availability</b> <br /> April
                                                    2010
                                </td>
                                <td valign="top">
                                    <p>
                                    INCENTCO was founded by technology experts, marketing
                                    professionals and experts from multiple industries who
                                    incorporated ‘best practices’ into every aspect of platform
                                    development. Since its initial launch, INCENTCO nSpire incentive
                                    platforms have captured the attention of many different
                                    industries that have unique requirements for a customized loyalty
                                    and rewards solution. Employee incentive programs, customer
                                    loyalty programs, retention programs, traffic generating
                                    programs, business referral programs and sales incentive programs
                                    are just a sampling of how INCENTCO technology is being used.<br />
                                    <br />INCENTCO LLC was incorporated in Delaware in 2009.
                                        Appropriate trademarks and copyrights have been secured and a
                                        patent application has been accepted and is now being processed
                                        for proprietary and intellectual property
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <th colSpan="2">Overview</th>
                            </tr>
                            <tr>
                                <td colSpan="2" valign="top">
                                    <p>
                                        <b>INCENTCO LLC</b> offers fully automated, customizable loyalty,
                                        rewards and incentive platforms that enables participants to earn
                                        points or dollars with redeemable cash value to purchase consumer
                                        goods from national retailers in real time.
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    <div style={{marginBottom: "50px"}}></div>
                </Col>
            </Row>
        </>
    );
}

export default Calendar;
