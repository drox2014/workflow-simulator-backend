import axios from "axios";
import { Dispatch } from "react-redux";
import * as actions from "../actions/user";
import { showMessage } from "../actions/alert";
import Auth from "./auth";

export const signIn = (email: string, password: string) => {
    return (dispatch: Dispatch<{}>) => {
        return new Promise((resolve, reject) => {
            axios.post(`/api/signin`, {email, password}).then((res: any) => {
                dispatch(actions.currentUser(res.data.userId));
                Auth.authenticateUser(res.data.token);
                return resolve();
            }).catch(e => {
                dispatch(showMessage(true, "Email and password don't have match :("));
                return reject();
            });
        });
    };
};

export const signUp = (email: string, password: string) => {
    return (dispatch: Dispatch<{}>) => {
        axios.post("/api/signup", {email, password}).then((res: any) => {
            dispatch(actions.clearUser());
            dispatch(showMessage(false, "You've successfully signed up! Please login :)"));
        }).catch(e => dispatch(showMessage(true, "Unable to create an account")));
    };
};

export const signOut = () => {
    return (dispatch: Dispatch<{}>) => {
        return new Promise((resolve, reject) => {
            Auth.deauthenticateUser();
            dispatch(actions.clearUser());
            resolve();
        });
    };
};

export const updatePassword = (password: string, newPassword: string) => {
    return (dispatch: Dispatch<{}>) => {
        axios.post("/api/update", {password, newPassword}).then((res: any) => {
            dispatch(showMessage(false, "You've successfully changed the password"));
        }).catch(e => dispatch(showMessage(true, "Unable to change the password")));
    };
};


export const currentUser = () => {
    return (dispatch: Dispatch<{}>) => {
        return new Promise((resolve, reject) => {
            if (Auth.isUserAuthenticated()) {
                Auth.initializeHeader();
                return axios.get("/api/current_user").then((res: any) => {
                    dispatch(actions.currentUser(res.data));
                    return resolve();
                }).catch((e) => {
                    dispatch(actions.clearUser());
                    return reject(e);
                });
            }
            dispatch(actions.clearUser());
            return reject();
        });
    };
};