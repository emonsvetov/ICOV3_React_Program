import axios from "axios";

export const readListByProgramAndUser = async (
  organizationId,
  programId,
  UserId
) => {
  try {
    const response = await axios.get(
      `/organization/${organizationId}/program/${programId}/user/${UserId}/readListByProgramAndUser`
    );
    const results = response.data;
    return results;
  } catch (e) {
    throw new Error(`API error:${e?.message}`);
  }
};