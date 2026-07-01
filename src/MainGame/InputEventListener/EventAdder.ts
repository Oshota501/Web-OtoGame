import MainGame from "../MainGame";
import Notes from "../Notes/Notes";
import NotesFactory from "../Notes/NotesFactory";

export default class EventAdder {
    constructor(game: MainGame) {
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "d":
                    game.screen.bars[0].effect.start(0.5);
                    game.judge(0);
                    break;
                case "f":
                    game.screen.bars[1].effect.start(0.5);
                    game.judge(1);
                    break;
                case "j":
                    game.screen.bars[2].effect.start(0.5);
                    game.judge(2);
                    break;
                case "k":
                    game.screen.bars[3].effect.start(0.5);
                    game.judge(3);
                    break;
                case "g":
                    game.spownNote(new (class _NotesFactory extends NotesFactory {
                        create(): Notes {
                            const n = new Notes();
                            return n;
                        }
                    }), Math.floor(Math.random() * 4));
                    break;
            }
        });

    }
}