import { TAB_EDIT_COMMANDS } from './tab.edit.command';
import * as TabEditController from './tab.edit.controller'

export default function tabEditDispatcher(message) {
    switch (message.command) {
        case TAB_EDIT_COMMANDS.COMPOSITION.UPDATE:
            TabEditController.UpdateCompositionCommand(message);
        case TAB_EDIT_COMMANDS.COMPOSITION.LOAD:
            TabEditController.LoadCompositionCommand(message);
        case TAB_EDIT_COMMANDS.TRACK.ADD:
            TabEditController.AddTrackCommand(message);
        case TAB_EDIT_COMMANDS.TRACK.UPDATE:
            TabEditController.UpdateTrackCommand(message);
        case TAB_EDIT_COMMANDS.TRACK.DELETE:
            TabEditController.DeleteTrackCommand(message);
        case TAB_EDIT_COMMANDS.TACT.ADD:
            TabEditController.AddTactCommand(message);
        case TAB_EDIT_COMMANDS.TACT.UPDATE:
            TabEditController.UpdateTactCommand(message);
        case TAB_EDIT_COMMANDS.TACT.DELETE:
            TabEditController.DeleteTactCommand(message);
        case TAB_EDIT_COMMANDS.NOTE.UPDATE:
            TabEditController.UpdateNoteCommand(message);

    }
}
