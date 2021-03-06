"use strict";
/**
 * A module that contained all the http route handlers for authentication
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
const auth_service_1 = require("../services/auth-service");
const router = express_1.default.Router();
router.post("/signin", (req, res, next) => {
    passport_1.default.authenticate("local", {
        session: false
    }, (err, token) => {
        if (err) {
            return next(err);
        }
        if (!token) {
            return res.status(401).send();
        }
        return res.status(200).send(token);
    })(req, res, next);
});
router.get("/current_user", auth_service_1.authenticate, (req, res) => {
    res.send(req.user);
});
router.post("/signup", (req, res) => {
    user_controller_1.default.createUser(req.body.email, req.body.password).then((user) => {
        res.status(200).send(user.id);
    }).catch((e) => {
        res.status(400).send(e.message);
    });
});
router.post("/update", auth_service_1.authenticate, (req, res) => {
    user_controller_1.default.updatePassword(req.user.toString(), req.body.password, req.body.newPassword).then((user) => {
        res.status(200).send(user);
    }).catch((e) => {
        res.status(400).send(e.message);
    });
});
exports.default = router;
//# sourceMappingURL=auth-routes.js.map