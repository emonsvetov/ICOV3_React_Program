import React from 'react'
import { Link } from 'react-router-dom'
import '../../../scss/component/pageNotFound.scss'
import { useTranslation } from "react-i18next";

const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <>
    <div className="not-found-container">
      <h1 className="not-found-heading">404</h1>
      <p className="not-found-message">{t('oops_unknown_path')}</p>
      <p className="not-found-message">{t('get_back_on_track')}</p>
      <Link to="/" className="home-link">{t('go_homepage')}</Link>
    </div>

    </>
  )
}

export default PageNotFound;
