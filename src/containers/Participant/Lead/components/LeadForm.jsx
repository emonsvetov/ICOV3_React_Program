import React from "react";

import { Card, CardHeader, CardBody } from "reactstrap";
import formValidation from "@/validation/lead";
import { Input, Col, Row, FormGroup, Label } from "reactstrap";
import { Form, Field } from "react-final-form";
import TemplateButton from "@/shared/components/TemplateButton";
import { useTranslation } from "react-i18next";

const LeadForm = () => {
  
  const { t } = useTranslation();
  const onSubmit = (values) => {};
  return (
    <div className="lead">
      <Card>
        <CardHeader tag="h3" className="text-center">
          {" "}
          {t("lead")}{" "}
        </CardHeader>
        <CardBody>
          <Form
            onSubmit={onSubmit}
            validate={(values) => formValidation.validateForm(values)}
            initialValues={{}}
          >
            {({ handleSubmit, form, submitting, pristine, values }) => (
              <form
                className="form d-flex flex-column justify-content-evenly"
                onSubmit={handleSubmit}
              >
                <Row>
                  <Label className="w-50">{t("name")} *</Label>
                </Row>
                <Row>
                  <Col md="6">
                    <Field name="first_name">
                      {({ input, meta }) => (
                        <FormGroup>
                          <Input
                            placeholder={t("first_name")}
                            type="text"
                            {...input}
                          />
                          {meta.touched && meta.error && (
                            <span className="text-danger d-flex justify-content-end">
                              {meta.error}
                            </span>
                          )}
                        </FormGroup>
                      )}
                    </Field>
                  </Col>

                  <Col md="6">
                    <Field name="last_name">
                      {({ input, meta }) => (
                        <FormGroup>
                          <Input
                            placeholder={t("last_name")}
                            type="text"
                            {...input}
                          />
                          {meta.touched && meta.error && (
                            <span className="text-danger d-flex justify-content-end">
                              {meta.error}
                            </span>
                          )}
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                </Row>
                <Row>
                  <Label className="w-50">{t("email")} *</Label>
                </Row>
                <Row>
                  <Col md="12">
                    <Field name="email">
                      {({ input, meta }) => (
                        <FormGroup>
                          <Input placeholder="" type="email" {...input} />
                          {meta.touched && meta.error && (
                            <span className="text-danger d-flex justify-content-end">
                              {meta.error}
                            </span>
                          )}
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                </Row>
                <Row>
                  <Label className="w-50">{t("phone_number")} *</Label>
                </Row>
                <Row>
                  <Col md="6">
                    <Field name="area_code">
                      {({ input, meta }) => (
                        <FormGroup>
                          <Input
                            placeholder= {t("area_code")}
                            type="text"
                            {...input}
                          />
                          {meta.touched && meta.error && (
                            <span className="text-danger d-flex justify-content-end">
                              {meta.error}
                            </span>
                          )}
                        </FormGroup>
                      )}
                    </Field>
                  </Col>

                  <Col md="6">
                    <Field name="number">
                      {({ input, meta }) => (
                        <FormGroup>
                          <Input
                            placeholder={t("phone_number")}
                            type="text"
                            {...input}
                          />
                          {meta.touched && meta.error && (
                            <span className="text-danger d-flex justify-content-end">
                              {meta.error}
                            </span>
                          )}
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                </Row>
                <Row>
                  <Label className="w-50">{t("company_name")}</Label>
                </Row>
                <Row>
                  <Col md="12">
                    <Field name="company_name">
                      {({ input, meta }) => (
                        <FormGroup>
                          <Input placeholder="" type="text" {...input} />
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                </Row>

                <Row>
                  <Label className="w-50">{t("what_can_we_help")} *</Label>
                </Row>
                <Row>
                  <Col md="12">
                    <Field name="content">
                      {({ input, meta }) => (
                        <FormGroup>
                          <Input placeholder="" type="text" {...input} />
                          {meta.touched && meta.error && (
                            <span className="text-danger d-flex justify-content-end">
                              {meta.error}
                            </span>
                          )}
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end mt-3">
                  <TemplateButton
                    className="w-100"
                    type="submit"
                    text={t("submit")}
                  />
                </div>
              </form>
            )}
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default LeadForm;
