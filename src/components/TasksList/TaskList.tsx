import { Box } from "@mui/material";
import { colors } from "../../core/theme/colors";
import { TaskListItem } from "../TaskListItem/TaskListItem";
import { ITask } from "../../core/types";
import { Spinner } from "../ui/Spinner/Spinner";

export const TaskList = ({
  tasks,
  isLoading,
  error,
  setDisplayBalance,
}: {
  tasks?: ITask[];
  isLoading: boolean;
  error: Error;
  setDisplayBalance: React.Dispatch<React.SetStateAction<number>>;
}) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (error || !tasks) {
    return null;
  }
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.brown,
        boxShadow: " 0px 4px 20px 0px #00000040",
        borderRadius: "12px",
        overflow: "hidden",
      }}>
      {tasks.map((task) => (
        <TaskListItem
          setDisplayBalance={setDisplayBalance}
          key={task.id}
          task={task}
        />
      ))}
    </Box>
  );
};
