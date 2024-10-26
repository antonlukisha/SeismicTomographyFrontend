import { Box } from "@mui/joy";
import { TasksInput } from "./TasksInput";
import { TasksTable } from './TasksTable';

const Tasks = () => {
    return (
        <Box mt={1} display='grid' gridTemplateColumns={'3fr 1fr'} gap={10}>
            <TasksTable />
            <TasksInput />
        </Box>
    );
}

export default Tasks;