import axios from "axios";

export const getProgramEmailTemplates = async (organization, program, type) => {
  try {
    const response = await axios.get(
      `/organization/${organization}/program/${program}/programemailtemplate?type=${type}`
    );
    // console.log(response)
    const results = response.data;
    return results;
  } catch (e) {
    throw new Error(`API error:${e?.message}`);
  }
};
