import axios from "axios";

export const readUserGoalProgressDetail = async (
  organizationId,
  programId,
  userGoalId
) => {
  try {
    const response = await axios.get(
      `/organization/${organizationId}/program/${programId}/readUserGoalProgressDetail/${userGoalId}`
    );
    return response.data
  } catch (e) {
    throw new Error(`API error:${e?.message}`);
  }
};