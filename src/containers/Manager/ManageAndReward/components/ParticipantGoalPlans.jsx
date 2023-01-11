import { Table } from "reactstrap";

const ParticipantGoalPlans = ({ program, organization }) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td colspan="8" class="title">
              Goal Plans
            </td>
          </tr>

          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>State</th>
            <th>Date Begin</th>
            <th>Date End</th>
            <th>Target</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Goal 1</td>
            <td>Sales</td>
            <td>Active</td>
            <td>05/01/2022</td>
            <td>05/01/2023</td>
            <td>200</td>
            <td></td>
          </tr>
          <tr>
            <td>Goal 1</td>
            <td>Sales</td>
            <td>Active</td>
            <td>05/01/2022</td>
            <td>05/01/2023</td>
            <td>200</td>
            <td></td>
          </tr>
          <tr>
            <td>Goal 1</td>
            <td>Sales</td>
            <td>Active</td>
            <td>05/01/2022</td>
            <td>05/01/2023</td>
            <td>200</td>
            <td></td>
          </tr>
        </tbody>
      </Table>

    </>
  );
};

export default ParticipantGoalPlans;
