import { Skeleton } from "@material-ui/lab";

export const ButtonSkeleton = ({variant="rounded",width=100,height=40}) => {
  return <Skeleton variant={variant} width={width} height={height} />;
};

export const TableSkeleton = ({
  rows = 3,
  columns = 4,
  width = "100%",
  height,
  className="w-100"
}) => {
  const rows_array = Array.from(new Array(rows));
  const columns_array = Array.from(new Array(columns));

  return (
    <table className={className}>
      <thead>
        <tr>
          {columns_array.map((_, index) => (
            <th key={index} className="p-2">
              <Skeleton
                animation="wave"
                variant="rect"
                width={width}
                height={height}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows_array.map((_, rowIndex) => (
          <tr key={rowIndex}>
            {columns_array.map((_, colIndex) => (
              <td key={colIndex} className="p-2">
                <Skeleton
                  animation="wave"
                  variant="rect"
                  width={width}
                  height={height}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
