import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import {isProgramManager, isProgramParticipant} from "@/shared/helpers";
import {login} from "@/containers/App/auth";

export const SsoLogIn = () => {
    const [searchParams] = useSearchParams();
    const [ssoToken, setSsoToken] = useState(searchParams.get('sso-token') || null);
    const [user, setUser] = useState(null);
    const [organization, setOrganization] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    const ssoLogin = async ssoToken => {
        axios.post('/sso-login', {
            sso_token: ssoToken
        }).then((res) => {
            if (res.status === 200) {
                if (!isProgramManager(res.data.user) && !isProgramParticipant(res.data.user)) {
                    alert("You are logging into Wrong Login Area")
                    return
                } else {
                    setUser(res.data.user)
                    setOrganization(res.data.user.organization)
                    setAccessToken(res.data.access_token)
                    console.log('ddddd',res.data.user.organization);

                }
            }
        })
            .catch(err => {
                console.log(err)
            })
    };

    useEffect(() => {
        ssoLogin(ssoToken)
    }, [ssoToken])

    return (
        <></>
    )
}
