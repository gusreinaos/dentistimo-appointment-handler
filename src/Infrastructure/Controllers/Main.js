"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createAppointmentCommand_1 = require("../../Application/Commands/createAppointmentCommand");
const createDentistriesCommand_1 = require("../../Application/Commands/createDentistriesCommand");
const appointmentRepository_1 = require("../Repositories/appointmentRepository");
const MQTTController_1 = require("./MQTTController");
const mongoose_1 = __importDefault(require("mongoose"));
const dentistryRepository_1 = require("../Repositories/dentistryRepository");
/*
mongoose.connect(
  'mongodb+srv://gusreinaos:4MNbebz6E04hq5IV@cluster0.x1srwma.mongodb.net/test'
);
*/
mongoose_1.default.connect('mongodb+srv://gusreinaos:4MNbebz6E04hq5IV@cluster0.x1srwma.mongodb.net/test');
const repository1 = new dentistryRepository_1.dentistryRepository();
repository1.createDentistries().then(object => {
    new createDentistriesCommand_1.createDentistriesCommand(repository1);
    console.log('dentists created');
    const repository2 = new appointmentRepository_1.appointmentRepository();
    const command = new createAppointmentCommand_1.createAppointmentCommand(repository2);
    new MQTTController_1.MQTTController(command).connect();
});
