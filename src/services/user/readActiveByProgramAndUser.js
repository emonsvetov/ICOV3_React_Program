import axios from "axios";

export const readActiveByProgramAndUser = async (
  organizationId,
  programId,
  UserId
) => {
  try {
    const response = await axios.get(
      `/organization/${organizationId}/program/${programId}/user/${UserId}/readActiveByProgramAndUser`
    );
    const results = response.data;
    return results;
  } catch (e) {
    throw new Error(`API error:${e?.message}`);
  }
};