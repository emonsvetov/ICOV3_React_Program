import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

const Calendar = () => {
    const { t } = useTranslation();
    return (
        <>
            <Row className="mt-12">
                <Col md={12} style={{padding: "0px 200px 50px 200px"}}>
                    <h2 className="mb-12">{t("privacy")}</h2>
                    <div id="terms-conditions-container">
                        <h4>Incentco LLC</h4>

                        <h4>LOYALTY AND REWARDS PROGRAM</h4>
                        <p>
                            <b>What data we collect and why</b>
                        </p>
                        <p>Our vision is to maximize the rewards for all of Incentco members
                            and to provide as many member benefits as possible. The key way in
                            which we provide value is to enable your Sponsor, to offer our
                            rewards Program which in turn provides you with access to valuable
                            merchandise and services from our commerce partners. The information
                            we collect (name, email address, and physical address) is used to
                            track and send the points and benefits members earn.</p>
                        <p>Additionally, we may use information on the commerce partners you
                            visit or the offers you view on this Web Site to select special
                            offers that will be relevant to you. Except at an aggregate level,
                            however, we do not share that information with your Sponsor, our
                            commerce partners or other third parties.</p>
                        <p>Finally, we collect data on the devices that access or attempt to
                            access our websites. This device data is used in conjunction with a
                            third party security partner to identify and prevent fraudulent
                            activity and does not include personally identifiable information.</p>
                        <p>
                            <b>Who sees your personal information</b>
                        </p>
                        <p>Only a very limited number of our employees ever have access to
                            your personal information. This information is used to track and
                            send the points you earn and the merchandise and services you claim
                            in exchange for your points.</p>
                        <p>We may use contractors or vendors to help us provide some of the
                            services on our Web Site. If we need to disclose personal
                            information for them to provide the services, it is with the
                            requirement that the information is kept confidential and is used
                            only for those services.</p>
                        <p>We reserve the right to disclose your personally identifiable
                            information as required by law and when we believe that disclosure
                            is necessary to protect our rights and/or to comply with a judicial
                            proceeding, court order, or legal process served on our Web Site or
                            to protect us and our members from losses.</p>
                        <p>
                            <b>How we keep your information secure</b>
                        </p>
                        <p>The security of your personal information is important to us.
                            Incentco uses a secure, encrypted connection (called an SSL
                            connection) on all pages where you access or transmit personal
                            information.</p>
                        <p>
                            <b>Your privacy</b>
                        </p>
                        <p>We will never ask for your username, password or any other
                            personal information in an unsolicited phone call, email or letter.
                            Further, any contact with our customer service in which personal
                            information is exchanged with a customer service representative will
                            be used only for the purpose of satisfying your request. Any
                            personal information you provide will not be recorded or used for
                            any reason beyond that of the stated request.</p>
                        <p>If we change our privacy policy, we will post a change notice to
                            this privacy statement. We reserve the right to modify this privacy
                            statement at any time, so please review it regularly. If we make
                            changes to this policy, we will notify you, by email, or by means of
                            a notice on our home page.</p>
                        <p>
                            <b>Your privacy with our commerce partners, your apartment community
                                and advertisers</b>
                        </p>
                        <p>We do not record personal information passed from our members to
                            commerce partners, affiliated stores or Sponsors. Order information,
                            including order numbers and amounts, may be available to us, the
                            commerce partner, or third party affiliate program management
                            companies for accurate tracking purposes, but this information will
                            not be released by us to other parties.</p>
                        <p>Our Web Site contains links to various other sites. Each of these
                            sites has a privacy policy that may differ from ours. If you wish to
                            receive special offers directly from a commerce partner or related
                            party, neither this privacy policy nor our opt-out policy applies to
                            those communications. Instead, please refer to the relevant party's
                            privacy and opt-out policy.</p>
                        <p>
                            <b>Our policies on email</b>
                        </p>
                        <p>We send two types of email to members: customer service emails
                            required to maintain the Program (like points &amp; shipping
                            notifications); and promotional emails featuring especially good
                            offers. You may choose not to receive promotional emails at any time
                            from us on the Web Site or by clicking the "unsubscribe" link in an
                            email.</p>
                        <p>
                            <b>Cookies and how are they used</b>
                        </p>
                        <p>Cookies are small text files that a web site can write to your
                            computer. We may use cookies to identify you and allow you to log in
                            once to our Web Site and use its features and links without having
                            to log in again. Cookies are also used by many of our commerce
                            partners to identify you as an Incentco member. Incentco requires
                            its members to have cookies enabled in order to claim merchandise
                            and services from our commerce partners.</p>
                        <p>
                            <b>Web Beacons</b>
                        </p>
                        <p>The Web Site and any e-mails sent by the Web Site may contain
                            electronic images (generally, single-pixel ".gif" images) called
                            "web beacons." These web beacons allow Company and third parties to
                            monitor and collect certain information about the viewer of the web
                            page, web-based document or e-mail message, such as the type of
                            browser requesting the web beacon, the IP address of the computer
                            that the web beacon is sent to and the time the web beacon was
                            viewed. Company's use of web beacons on its Web Site, include,
                            without limitation, the following:</p>
                        <ul>
                            <li>counting unique users (actually, unique web browsers), visits
                                and page views.
                            </li>
                            <li>monitoring traffic and conversion patterns through our various
                                product and service offerings on the Web Site. For example, web
                                beacons may be integrated with a merchandise product page as well
                                as the subsequent shopping cart, transaction and verification pages
                                maintained on our Web Site and/or commerce partners' web sites.
                            </li>
                            <li>personalizing your experience when you visit the Web Site,
                                including the advertising and content you see.
                            </li>
                            <li>determining whether or not e-mail messages were opened, links
                                were clicked or notifications/offers were acted upon.
                            </li>
                        </ul>
                        <p>
                            <b>Your choices and responsibilities</b>
                        </p>
                        <p>Periodically we may send you emails on new features or special
                            offers. On every one of these emails you will be given the choice to
                            unsubscribe from our promotional mailings. Simply follow the
                            directions in any of our emails.</p>
                        <p>It is the member's responsibility to update and maintain accurate
                            contact information in their account. You can make changes by
                            visiting your account page and entering corrections. Email and
                            street addresses that are entered into a member's personal profile
                            page are the addresses that will be used for all contact. We are not
                            responsible for payments sent to an incorrect addresses provided by
                            you.</p>
                        <br />
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default Calendar;
