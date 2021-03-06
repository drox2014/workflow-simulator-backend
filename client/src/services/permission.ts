import axios from "axios";
import * as actions from "../actions/permission";
import { Dispatch } from "react-redux";
import { showMessage } from "../actions/alert";

export const getPermission = (groupId: string) => {
    return (dispatch: Dispatch<{}>) => {
        axios.get(`/api/taskgroup/secret/${groupId}`).then((res) => {
            dispatch(actions.getPermission(res.data.secretKey));
        }).catch(e => dispatch(showMessage(true, "Unable to fetch data")));
    };
};

export const shareTaskGroup = (email: string, groupId: string) => {
    return (dispatch: Dispatch<{}>) => {
        axios.post(`/api/taskgroup/share/${email}/${groupId}`).then((res) => {
            dispatch(showMessage(false, `Task-Group shared with ${email} successfully!`));
        }).catch(e => dispatch(showMessage(true, "Unable to share the Task-Group")));
    };
};

export const getSharedTaskGroups = () => {
    return (dispatch: Dispatch<{}>) => {
        axios.get(`/api/taskgroup/share`).then((res) => {
            dispatch(actions.getSharedTaskGroups(res.data));
        }).catch(e => dispatch(showMessage(true, "Unable to fetch data")));
    };
};





