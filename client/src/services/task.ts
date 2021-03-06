import axios from "axios";
import { Dispatch } from "react-redux";
import * as actions from "../actions/task";
import { showMessage } from "../actions/alert";
import { findTaskGroup } from "./task-group";

export const createTask = (task) => {
    return (dispatch: Dispatch<{}>) => {
        axios.post("/api/task", task).then((res) => {
            dispatch(actions.createTask(res.data));
            dispatch(findTaskGroup(task.groupId));
        }).catch((e) => dispatch(showMessage(true, "Unable to create a Task")));
    };
};

export const findTasks = (groupId: string) => {
    return (dispatch: Dispatch<{}>) => {
        axios.get(`/api/task/${groupId}`).then((res) => {
            dispatch(actions.findTasks(res.data));
        }).catch((e) => dispatch(showMessage(true, "Unable to connect to server")));
    };
};

export const deleteTask = (groupId: string, taskId: string) => {
    return (dispatch: Dispatch<{}>) => {
        axios.delete(`/api/task/${groupId}/${taskId}`).then((res) => {
            dispatch(findTasks(groupId));
            dispatch(findTaskGroup(groupId));
            dispatch(showMessage(false, "Task Deleted Successfully"));
        }).catch((e) => {
            dispatch(showMessage(true, "Unable to delete the task"));
        });
    };
};
