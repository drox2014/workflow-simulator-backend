"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const notification_1 = require("../models/notification");
const user_1 = require("../models/user");
const permission_controller_1 = __importDefault(require("./permission-controller"));
const types_1 = require("../types");
const sendNotification = (notification, userId) => {
    notification.userId = userId;
    return new notification_1.Notification(notification).save();
};
const getNotifications = (userId) => {
    return notification_1.Notification.find({ to: userId }).where("state").equals(0);
};
const getUsers = (userId) => {
    return user_1.User.find({ _id: { $in: userId } });
};
const acceptPermission = (id) => {
    return new Promise((resolve, reject) => {
        notification_1.Notification.findById(id).then((notification) => {
            if (!notification) {
                return reject(new Error("Not found"));
            }
            return notification_1.Notification.findByIdAndUpdate(id, {
                $set: {
                    state: 1
                }
            }, {
                new: true
            });
        }).then((notification) => {
            return permission_controller_1.default.generatePermission(notification.userId, notification.groupId, types_1.FULL_ACCESS);
        }).then((permission) => {
            return resolve();
        }).catch((e) => reject(e));
    });
};
const ignorePermission = (id) => {
    return new Promise((resolve, reject) => {
        notification_1.Notification.findById(id).then((notification) => {
            if (!notification) {
                return reject(new Error("Not found"));
            }
            return notification_1.Notification.findByIdAndUpdate(id, {
                $set: {
                    state: 2
                }
            }, {
                new: true
            });
        }).then((notification) => {
            return resolve();
        }).catch((e) => reject(e));
    });
};
const replyNotification = (id, accepted) => {
    if (accepted) {
        return acceptPermission(id);
    }
    return ignorePermission(id);
};
exports.default = { sendNotification, getNotifications, getUsers, replyNotification };
//# sourceMappingURL=notification-controller.js.map