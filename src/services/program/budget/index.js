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
export function getDateFormat(value, budgetTypes) {
  const dateObject = new Date(value);
  const month = String(dateObject.getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const year = dateObject.getFullYear();
  const day = String(value.getDate()).padStart(2, "0");
  if (
    budgetTypes.label == "Monthly" ||
    budgetTypes.label === "Monthly Rollover"
  ) {
    return `${year}-${month}-01`;
  } else {
    return `${year}-${month}-${day}`;
  }
}

export const getEndOfMonth = (inputDate, budgetTypes) => {
  if (
    budgetTypes.label === "Monthly" ||
    budgetTypes.label === "Monthly Rollover"
  ) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const endOfMonthDate = new Date(year, month, 1);
    return endOfMonthDate.toISOString().split("T")[0];
  } else {
    return inputDate.toISOString().slice(0, 10);
  }
};
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

const getMonthName = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString("default", { month: "long" });
};

function formattedData(data, budgetType) {
  if (budgetType === "monthly" || budgetType === "monthly_rollover") {
    const formattedData = Object.entries(data)?.map(([key, value]) => {
      const [programId, month, budgetId] = key.split("-");
      return {
        program_id: programId,
        month: month,
        budget_cascading_id: budgetId == undefined ? null : budgetId,
        amount: value == "" ? "0" : value,
      };
    });
    return formattedData;
  } else {
    const formattedData = Object.entries(data)?.map(([key, value]) => {
      const [programId, budgetId] = key.split("-");
      return {
        program_id: programId,
        budget_cascading_id: budgetId == undefined ? null : budgetId,
        amount: value == "" ? "0" : value,
      };
    });
    return formattedData;
  }
}

export function patchBudgetCascadingData(
  programs,
  budgetCascadingPrograms,
  budgetTypes
) {
  if (budgetCascadingPrograms) {
    if (budgetTypes == "monthly" || budgetTypes == "monthly_rollover") {
      let result = programs?.map((prog) => {
        const budgetData = budgetCascadingPrograms
          .filter((budget) => budget.program_id === prog.id)
          .reduce((acc, budget) => {
            const month = getMonthName(budget.budget_start_date);
            acc[month] = {
              id: budget.id,
              amount: budget.budget_amount,
            };
            return acc;
          }, {});
        if (Object.keys(budgetData).length > 0) {
          return {
            ...prog,
            budget_data: budgetData,
          };
        }
        return prog;
      });
      return result;
    } else {
      let result = programs?.map((program) => {
        let data = budgetCascadingPrograms?.find(
          (budgetCascadingProgram) =>
            budgetCascadingProgram.program_id == program.id
        );
        if (data) {
          return {
            ...program,
            budget_data: {
              id: data?.id,
              amount: data?.budget_amount,
            },
          };
        }
        return program;
      });
      return result;
    }
  }
}

export function unpatchBudgetCascadingData(data, budgetTypes) {
  if (budgetTypes == "monthly" || budgetTypes == "monthly_rollover") {
    let budget_data = formattedData(data, budgetTypes);
    const groupedData = budget_data?.reduce((acc, current) => {
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
    console.log(data);
    let budget_data = formattedData(data, budgetTypes);
    return [budget_data];
  }
}
