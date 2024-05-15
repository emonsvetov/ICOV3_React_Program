import axios from "axios";

export const getBudgetType = async (organizationId, programId) => {
  const response = await axios.get(
    `/organization/${organizationId}/program/${programId}/budgettypes`
  );
  return response.data;
};

export async function getBudgetProgram(organization, program, id) {
  const response = await axios.get(
    `/organization/${organization.id}/program/${program.id}/budgetprogram/${id}`
  );
  return response.data;
}

export function getDateFormat(value) {
  let date = new Date(value).toISOString().slice(0, 10);
  return date;
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
