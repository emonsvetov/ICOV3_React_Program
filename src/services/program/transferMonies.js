import axios from 'axios'
export const getTransferMonies = async (organizationId, programId) => {
    // console.log(organizationId, programId)
    try {
        const response = await axios.get(
          `/organization/${organizationId}/program/${programId}/transferMonies`
        );
        // console.log(response)
        return response.data;
    } catch (e) {
        throw new Error(`API error:${e?.message}`);
    }
};
export const postTransferMonies = async (organizationId, programId, data) => {
    try {
        const response = await axios.post(
          `/organization/${organizationId}/program/${programId}/transferMonies`,
          data
        );
        return response.data;
    } catch (e) {
        throw new Error(`API error:${e?.message}`);
    }
};

export const downloadTransferTemplate = async(organizationId, programId) => {
    try {
        const response = await axios.get(
            `/organization/${organizationId}/program/${programId}/transferMonies/template`, 
            {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/pdf'
                }
            }
        )
        return response;
    } catch (e) {
      throw new Error(`API error:${e?.message}`);
    }
  }

  export const creditcardDepositRequest = async (organizationId, programId, data) => {
    try {
        // return {
        //     "result": null,
        //     "error": null,
        //     "status": "ok",
        //     "token": "js4LAaV1oJvHhIg6CFCDhGIsd9DL97zwEdWx54h9Ktc1zW7OQaYV5G2KTnmFVng/egMfTNecFsqGwQQjjGtefUqbYYfnprn81BlhwFnj4MrJyQVFv6s/Bon9znwKELTDK6HVmfarY727cRQVpHgX/lN4qVGYewgK5PIR+pgK6Axw/Z985kF/B7qY4OJAzuKr2wXWJ0A1c98E9aKqu9DsiZ1FT1Kv9BfU0puGfoFzhjCHHonOLgxeAqbiTbH0kY/zQWclah1nzHQDRtuQue1YBp+cbyeXQF4OcP2BEpFLWEY3xwvcYIfIj0VcwmcJ9Tl4feADI0p88pEp0FbWmQKCrFidNhlduPU1mteBlJ+g9/49x3vOkFwhrZ9iteBJxkNubpwd023xWT0RK1n9uDFD3nzzcAIoad7HIVShLO5/guybz0NrrvGkBM5Pvx/6Ezq+J15s3Qmn07AJ7rpaa4joJxaNTX2M5PnSgxyzlcJDq2e7FrwJHBZUp4F9ex5ebOL4IjI0Y6XyakBzObEYlgofR6XrGBbGWjV5m9+z166DpNGBughiXFB4y9j+nS1sot8+XtVtsDaSnvnIE5tXg+gwc1SwksJiTptpjYxEdei4ZhARwThNWj5ZMxFKzVRiY+nOzKpKaL0Co6laCVV82SfFe2pUe3ukDaUpQddJYslmr+653xsM0QdoMPvPD/6nltETtWVYl3lOWWDlAtE02Q3dI6ldHH3qUzkdxArb/ok0qn3ph3QE8AV+1/q87Rg6xWNAZ68Va1yvTtBH7zF372/TjvU+Dxo1FsKNBSFrobnajIxiV0rHGNxAql6kCfjIFZCuiWMybE6mf5fTpFSkw2CcH5CtTHAH+zAli5IIy55+A8WZ274y6IrfkYpqtTmEyANxkyr0LYlegI/zbjtGQCRL4Srb7R447LD2RDN7OfGbJABjEqM+8MQmeNP6Nh+OSy0L5pUUi2NuELHE7j2+dEfqA1jXUNx74QAZNGlwld24OoHVeDlIi6K2MiUmyOZ682SJW5FfRvmx6e5T1anqNt6Rf+zELNn4MzAdTcfTuQfTluUjgDzyvjrsFxAdnf0yG2quz+QiHHgRJfeNbWVhGNlX2XFRhA127a1KqDfUktHBW/MU34XaExs68D1xYda4eiJN2TsIRmrie1nb0M+DZ8V0wb9LnP2uqDBG007/6AiKWHHXYBjKpQe8Po/fzVnZhfcxXQIYDtO9XQZYlyUcbEHApfzDOHDLjwWngHUlor6pJwlIccipgKA9qwbedyRuYk3hcZXFF/jYuv3D3iPe3Kkjkb3vBgew3xR6oPQUcKhZ9UaSrdsund84vH4dVrVHwJNvTyDB3Ca6k0YOrweXsjoqOR/HfCr0OrYh2K9+yVuycyyJnL7Mr8256xaqy4SxwQYUmfzuQY4uehK+FQcx6xjsnXafV/wBXK3Ddf1N+IEeSkyQXEG8M9P8k5BFFjae7tb9FDD5C+YcQfms4lh8UolLZNsaoSrk2Y/OPheGtl5DJnrIoJoDyyu5DAjEdl7CmRX9lceEHUqec8WYn3M+XsPek8banwU97GYiiMCp+1iFpS5bqkm22N5Ef/EKgZZfvvi9XiwIBawS2RKGnx2CWcHJMDRRiLbW8wS3Im/iOX9z/Q1JS9PiYhARAIJZAKawSJeMKp67T6l2ZHLhOiUbQ9eZQfZrE+AbnOPmo5bGWGUWFFLrpAmL443dUqC5l21OUh9bjl0UDAXWSrRICnQR3DDeyLy9wGpwFa0J8N16YosSJfFuuO15n5kF38qMOM7j+JOiuLB5epO9CzzVsMj6ncX2VNTLHRyk9lnTA8twt5eKPkPkeYfxR1lpGN6v0oF0RpgqeogJ4wZmig9XjjQKyi2lzS+ylCQXdHrYyADDzRJGmg66w5JTUYaqwDBl0N+dZQ/R.5KP3u95bQpv"
        // }
        const response = await axios.post(
          `/organization/${organizationId}/program/${programId}/creditcardDeposit`,
          data
        );
        return response.data;
    } catch (e) {
        throw new Error(`API error:${e?.message}`);
    }
};