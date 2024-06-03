import axios from "axios";

export const getBudgetTypes = async (organizationId, programId) => {
  const response = await axios.get(
    `/organization/${organizationId}/program/${programId}/budgettypes`
  );
  return response.data;
};

export async function getBudgetProgram(organizationId, programId, budgetId) {
  try {
    const response = await axios.get(
      `/organization/${organizationId}/program/${programId}/budgetprogram/${budgetId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`API error:${error?.message}`);
  }
}
export async function getBudgetProgramLists(organizationId, programId) {
  try {
    const response = await axios.get(
      `/organization/${organizationId}/program/${programId}/budgetprogram`
    );
    return response.data;
  } catch (error) {
    throw new Error(`API error:${error?.message}`);
  }
}

export async function readAssignedPositionPermissions(
  organizationId,
  programId,
  positionId
) {
  const response = await axios.get(
    `/organization/${organizationId}/program/${programId}/positionlevel/${positionId}/permissions`
  );
  return response?.data?.map((permission) => permission.name);
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

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export function findAssignedMonth(start, end) {
  let actualMonth = months.slice(
    new Date(start).getMonth(),
    new Date(end).getMonth() + 1
  );
  return actualMonth;
}

export const downloadAssignBudgetTemplate = async (
  organizationId,
  programId,
  budegtProgramId
) => {
  const response = await axios.get(
    `/organization/${organizationId}/program/${programId}/budgetprogram/${budegtProgramId}/template`,
    {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf",
      },
    }
  );
  return response;
};

export const getBudgetCascadings = async (oId, pId, bId) => {
  const response = await axios.get(
    `/organization/${oId}/program/${pId}/budgetprogram/${bId}/budgetcascading`
  );
  return response;
};

export function patchBudgetCascadingData(
  programs,
  budgetCascadingProgram,
  isBudgetMonthly
) {
  if (programs && budgetCascadingProgram) {
    return programs?.map((program) => {
      let budgetCascadingData = budgetCascadingProgram?.find(
        (budgetCascading) => budgetCascading.program_id == program.id
      );
      if (isBudgetMonthly) {
        if (budgetCascadingData) {
          let month = findAssignedMonth(
            budgetCascadingData?.budget_start_date,
            budgetCascadingData?.budget_end_date
          );
          return {
            ...program,
            budget_cascading_id: budgetCascadingData.id,
            amount: budgetCascadingData.budget_amount,
            month: month,
          };
        }
        return program;
      } else {
        if (budgetCascadingData) {
          return {
            ...program,
            budget_cascading_id: budgetCascadingData.id,
            amount: budgetCascadingData.budget_amount,
            budget_start_date: budgetCascadingData?.budget_start_date,
            budget_end_date: budgetCascadingData?.budget_end_date,
          };
        }
        return program;
      }
    });
  }
}

export function unpatchBudgetCascadingData(data, isBudgetMonthly = false) {
  if (isBudgetMonthly) {
    const groupedData = data.reduce((acc, current) => {
      const { program_id, month, amount, budget_cascading_id } = current;
      const programIndex = acc.findIndex(
        (item) => item.program_id === program_id
      );
      let year = new Date().getFullYear();
      let m = new Date(`${month}-${year}`).getMonth() + 1;
      const budgetEntry = {
        budgets_cascading_id: budget_cascading_id || null,
        year: year,
        month: m,
        amount,
      };
      if (programIndex === -1) {
        acc.push({
          program_id: program_id,
          budgets: [budgetEntry],
        });
      } else {
        acc[programIndex].budgets.push(budgetEntry);
      }
      return acc;
    }, []);
    return groupedData;
  } else {
    return data;
  }
}
