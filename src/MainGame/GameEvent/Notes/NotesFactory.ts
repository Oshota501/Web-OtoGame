import Notes from "./Notes";

export default abstract class NoteFactory {
    abstract create(): Notes;
}
