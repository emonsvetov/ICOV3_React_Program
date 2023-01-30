import React, { useEffect } from "react";
import { Table, Col, Container, Row } from "reactstrap";
import { connect } from "react-redux";

const ParticipantRewardHistory = ({ participant, auth, program }) => {
    console.log(program);
    console.log(participant);
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td colSpan="8" className="title">
                            Reward History
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className="title-col"></th>
                        <th className="title-col"> Event </th>
                        <th className="title-col">Notes</th>
                        <th className="title-col"> Referrer </th>
                        <th className="title-col value">Date</th>
                        <th className="title-col value">Reference Document</th>
                        <th className="value">Points</th>
                    </tr>
                    <tr className="odd">
                        <td className="title-col"></td>
                        <td className="title-col"> Reclaim points </td>
                        <td className="title-col"> audit cleanup test awards </td>
                        <td className="title-col"></td>
                        <td className="title-col value"> 12/31/2022 </td>
                        <td className="title-col" id="pdf-"></td>
                        <td className="title-col value"> -400 </td>
                        <td></td>
                    </tr>
                    <tr className="even">
                        <td className="title-col"></td>
                        <td className="title-col"> Reclaim points </td>
                        <td className="title-col"> audit cleanup test awards </td>
                        <td className="title-col"></td>
                        <td className="title-col value"> 12/31/2022 </td>
                        <td className="title-col" id="pdf-"></td>
                        <td className="title-col value"> -200 </td>
                        <td></td>
                    </tr>
                    <tr className="odd">
                        <td className="title-col">
                            <div className="event-icon g"></div>
                        </td>
                        <td className="title-col"> Happy Birthday! </td>
                        <td className="title-col"></td>
                        <td className="title-col"></td>
                        <td className="title-col value"> 08/12/2022 </td>
                        <td className="title-col" id="pdf-465656"></td>
                        <td className="title-col value"> 0 </td>
                        <td>
                            <a href="/manager/participant/print-award-email/404628/465656" target="_blank" title="Print">
                                <img src="/assets/img/printer.png" />
                            </a>
                            <a href="" title="Resend">
                                <img src="/assets/img/mail.png" />
                            </a>
                        </td>
                    </tr>
                    <tr className="even">
                        <td className="title-col">
                            <div className="event-icon g"></div>
                        </td>
                        <td className="title-col"> Award </td>
                        <td className="title-col"></td>
                        <td className="title-col"></td>
                        <td className="title-col value"> 04/14/2022 </td>
                        <td className="title-col" id="pdf-449264"></td>
                        <td className="title-col value"> 400 </td>
                        <td>
                            <a href="/manager/participant/print-award-email/404628/449264" target="_blank" title="Print">
                                <img src="/assets/img/printer.png" />
                            </a>
                            <a href="" title="Resend">
                                <img src="/assets/img/mail.png" />
                            </a>
                        </td>
                    </tr>
                    <tr className="odd">
                        <td className="title-col">
                            <div className="event-icon i"></div>
                        </td>
                        <td className="title-col"> Helping Hand </td>
                        <td className="title-col"> Peer 2 Peer Award </td>
                        <td className="title-col"></td>
                        <td className="title-col value"> 04/06/2022 </td>
                        <td className="title-col" id="pdf-448261"></td>
                        <td className="title-col value"> 0 </td>
                        <td>
                            <a href="/manager/participant/print-award-email/404628/448261" target="_blank" title="Print">
                                <img src="/assets/img/printer.png" />
                            </a>
                            <a href="" title="Resend">
                                <img src="/assets/img/mail.png" />
                            </a>
                        </td>
                    </tr>
                    <tr className="even">
                        <td className="title-col">
                            <div className="event-icon i" />
                        </td>
                        <td className="title-col"> Helping Hand </td>
                        <td className="title-col"> Peer 2 Peer Award </td>
                        <td className="title-col"></td>
                        <td className="title-col value"> 03/03/2022 </td>
                        <td className="title-col" id="pdf-444680"></td>
                        <td className="title-col value"> 0 </td>
                        <td>
                            <a href="/manager/participant/print-award-email/404628/444680" target="_blank" title="Print">
                                <img src="/assets/img/printer.png" />
                            </a>
                            <a href="" title="Resend">
                                <img src="/assets/img/mail.png" />
                            </a>
                        </td>
                    </tr>
                    <tr className="odd">
                        <td className="title-col">
                            <div className="event-icon g"></div>
                        </td>
                        <td className="title-col"> Peer Award Limited </td>
                        <td className="title-col"> Peer 2 Peer Award </td>
                        <td className="title-col"></td>
                        <td className="title-col value"> 03/03/2022 </td>
                        <td className="title-col" id="pdf-444679"></td>
                        <td className="title-col value"> 200 </td>
                        <td>
                            <a href="/manager/participant/print-award-email/404628/444679" target="_blank" title="Print">
                                <img src="/assets/img/printer.png" />
                            </a>
                            <a href="" title="Resend">
                                <img src="/assets/img/mail.png" />
                            </a>
                        </td>
                    </tr>
                    <tr className="even">
                        <td className="title-col"></td>
                        <td className="title-col"> Expire points </td>
                        <td className="title-col"></td>
                        <td className="title-col"></td>
                        <td className="title-col value"> 01/06/2022 </td>
                        <td className="title-col" id="pdf-"></td>
                        <td className="title-col value"> -40 </td>
                        <td></td>
                    </tr>
                    <tr className="odd">
                        <td className="title-col"></td>
                        <td className="title-col"> Expire points </td>
                        <td className="title-col"></td>
                        <td className="title-col"></td>
                        <td className="title-col value"> 12/31/2021 </td>
                        <td className="title-col" id="pdf-"></td>
                        <td className="title-col value"> -3,960 </td>
                        <td></td>
                    </tr>
                    <tr className="even">
                        <td className="title-col">
                            <div className="event-icon g"></div>
                        </td>
                        <td className="title-col"> Happy Birthday! </td>
                        <td className="title-col"></td>
                        <td className="title-col"></td>
                        <td className="title-col value"> 08/12/2021 </td>
                        <td className="title-col" id="pdf-407214"></td>
                        <td className="title-col value"> 0 </td>
                        <td>
                            <a href="/manager/participant/print-award-email/404628/407214" target="_blank" title="Print">
                                <img src="/assets/img/printer.png" />
                            </a>
                            <a href="" title="Resend">
                                <img src="/assets/img/mail.png" />
                            </a>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        program: state.program,
    };
};

export default connect(mapStateToProps)(ParticipantRewardHistory);
