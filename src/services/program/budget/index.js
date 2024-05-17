import axios from "axios";

export const getBudgetType = async (organizationId, programId) => {
  const response = await axios.get(
    `/organization/${organizationId}/program/${programId}/budgettypes`
  );
  return response.data;
};

export async function getBudgetProgram(organization, program, id) {
  try {
    const response = await axios.get(
      `/organization/${organization.id}/program/${program.id}/budgetprogram/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`API error:${error?.message}`);
  }
}
export async function getBudgetProgramLists(oId, pId) {
  try {
    const response = await axios.get(
      `/organization/${oId}/program/${pId}/budgetprogram`
    );
    return response.data;
  } catch (error) {
    throw new Error(`API error:${error?.message}`);
  }
}

export async function readAssignedPositionPermissions(oId, pId, positionId) {
  try {
    const response = await axios.get(
      `/organization/${oId}/program/${pId}/positionlevel/${positionId}/permissions`
    );
    return response.data?.map((permission) => permission.name);
  } catch (error) {
    throw new Error(`API error:${error?.message}`);
  }
}
export function hasUserPermissions(userPermissions, requiredPermissions) {
  if (Array.isArray(userPermissions)) {
    return requiredPermissions.every((permission) =>
      userPermissions.includes(permission)
    );
  }
}
export function getDateFormat(value) {
  const dateObject = new Date(value);
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObject.getFullYear();
  // let date = new Date(value).toISOString().slice(0,10)
  return `${year}-${month}-${day}`;
}

export function showFormatDate({ row, value }) {
  if (
    row.original.budget_types.name == "monthly" ||
    row.original.budget_types.name == "monthly_rollover"
  ) {
    const dateObj = new Date(value);
    const options = { year: "numeric", month: "long" };
    return dateObj.toLocaleDateString("en-US", options);
  } else {
    return value;
  }
  // return value
}
