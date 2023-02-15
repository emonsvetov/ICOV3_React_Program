import axios from "axios";

export const getActiveGoalPlansByProgram = async (
  organizationId,
  programId
) => {
  try {
    const response = await axios.get(
      `/organization/${organizationId}/program/${programId}/read-active-goalplans-by-program`
    );
    const results = response.data;
    return results;
  } catch (e) {
    throw new Error(`API error:${e?.message}`);
  }
};
