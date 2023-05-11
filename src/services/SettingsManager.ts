import {homedir} from "os";
import {join} from "path";
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "fs";
import {backgrounds} from "@/services/context";
import {llama} from "@/services/StorageManager";

export type AvatarColor = "yellow" | "purple" | "pink" | "blue" | "green";
export type AvatarType = "cool" | "nerd";

export class Avatar {
    type: AvatarType;
    color: AvatarColor;

    constructor(type: AvatarType,
                color: AvatarColor) {
        this.type = type;
        this.color = color;
    }

    getWarning() {
        return llama.nerd.wrong_llama.red;
    }

    getAlgebra(graduated: boolean) {
        if (graduated) {
            switch (this.color) {
                case "purple":
                    return llama.cute.graduated.algebra.purple;
                case "yellow":
                    return llama.cute.graduated.algebra.yellow;
                case "pink":
                    return llama.cute.graduated.algebra.pink;
                case "blue":
                    return llama.cute.graduated.algebra.blue;
                case "green":
                    return llama.cute.graduated.algebra.green;
            }
        } else {
            switch (this.color) {
                case "purple":
                    return llama.cute.ungraduated.algebra.purple;
                case "yellow":
                    return llama.cute.ungraduated.algebra.yellow;
                case "pink":
                    return llama.cute.ungraduated.algebra.pink;
                case "blue":
                    return llama.cute.ungraduated.algebra.blue;
                case "green":
                    return llama.cute.ungraduated.algebra.green;
            }
        }
    }

    getGeometrie(graduated: boolean) {
        if (graduated) {
            switch (this.color) {
                case "purple":
                    return llama.cute.graduated.geometrie.purple;
                case "yellow":
                    return llama.cute.graduated.geometrie.yellow;
                case "pink":
                    return llama.cute.graduated.geometrie.pink;
                case "blue":
                    return llama.cute.graduated.geometrie.blue;
                case "green":
                    return llama.cute.graduated.geometrie.green;
            }
        } else {
            switch (this.color) {
                case "purple":
                    return llama.cute.ungraduated.geometrie.purple;
                case "yellow":
                    return llama.cute.ungraduated.geometrie.yellow;
                case "pink":
                    return llama.cute.ungraduated.geometrie.pink;
                case "blue":
                    return llama.cute.ungraduated.geometrie.blue;
                case "green":
                    return llama.cute.ungraduated.geometrie.green;
            }
        }
    }

    getRomana(graduated: boolean) {
        if (graduated) {
            switch (this.color) {
                case "purple":
                    return llama.cute.graduated.romana.purple;
                case "yellow":
                    return llama.cute.graduated.romana.yellow;
                case "pink":
                    return llama.cute.graduated.romana.pink;
                case "blue":
                    return llama.cute.graduated.romana.blue;
                case "green":
                    return llama.cute.graduated.romana.green;
            }
        } else {
            switch (this.color) {
                case "purple":
                    return llama.cute.ungraduated.romana.purple;
                case "yellow":
                    return llama.cute.ungraduated.romana.yellow;
                case "pink":
                    return llama.cute.ungraduated.romana.pink;
                case "blue":
                    return llama.cute.ungraduated.romana.blue;
                case "green":
                    return llama.cute.ungraduated.romana.green;
            }
        }
    }

    getStick() {
        if (this.type === "cool") {
            switch (this.color) {
                case "purple":
                    return llama.cool.stick_llama.purple;
                case "yellow":
                    return llama.cool.stick_llama.yellow;
                case "blue":
                    return llama.cool.stick_llama.blue;
                case "pink":
                    return llama.cool.stick_llama.pink;
                case "green":
                    return llama.cool.stick_llama.green;
            }
        } else {
            switch (this.color) {
                case "purple":
                    return llama.nerd.stick_llama.purple;
                case "yellow":
                    return llama.nerd.stick_llama.yellow;
                case "blue":
                    return llama.nerd.stick_llama.blue;
                case "pink":
                    return llama.nerd.stick_llama.pink;
                case "green":
                    return llama.nerd.stick_llama.green;
            }
        }

    }

    getHead() {
        if (this.type === "cool") {
            switch (this.color) {
                case "purple":
                    return llama.cool.head.purple;
                case "yellow":
                    return llama.cool.head.yellow;
                case "blue":
                    return llama.cool.head.blue;
                case "pink":
                    return llama.cool.head.pink;
                case "green":
                    return llama.cool.head.green;
            }
        } else {
            switch (this.color) {
                case "purple":
                    return llama.nerd.head.purple;
                case "yellow":
                    return llama.nerd.head.yellow;
                case "blue":
                    return llama.nerd.head.blue;
                case "pink":
                    return llama.nerd.head.pink;
                case "green":
                    return llama.nerd.head.green;
            }
        }
    }

    getBody() {
        if (this.type === "cool") {
            switch (this.color) {
                case "purple":
                    return llama.cool.body.purple;
                case "yellow":
                    return llama.cool.body.yellow;
                case "blue":
                    return llama.cool.body.blue;
                case "pink":
                    return llama.cool.body.pink;
                case "green":
                    return llama.cool.body.green;
            }
        } else {
            switch (this.color) {
                case "purple":
                    return llama.nerd.body.purple;
                case "yellow":
                    return llama.nerd.body.yellow;
                case "blue":
                    return llama.nerd.body.blue;
                case "pink":
                    return llama.nerd.body.pink;
                case "green":
                    return llama.nerd.body.green;
            }
        }
    }
}

class Settings {
    background: string = "";
    avatar = new Avatar("cool", "blue");
}

export class SettingsManager {
    settings = new Settings();

    create() {
        this.settings = {
            background: backgrounds[0],
            avatar: new Avatar("cool", "blue")
        }

        this.write();
    }

    write() {
        writeFileSync(join(homedir(), 'lima', 'settings.json'), JSON.stringify(this.settings), {
            encoding: 'utf-8', flag: 'w'
        })
    }

    initialize() {
        let directoryPath = join(homedir(), 'lima');
        let filePath = join(homedir(), 'lima', 'progress.json');

        if (!existsSync(join(homedir(), 'lima'))) {
            mkdirSync(join(homedir(), 'lima'));
            writeFileSync(join(homedir(), 'lima', 'settings.json'), '', {flag: 'w'});
            return;
        }

        if (!existsSync(join(homedir(), 'lima', 'settings.json'))) {
            writeFileSync(join(homedir(), 'lima', 'settings.json'), '', {flag: 'w'});
            return
        }

        if (readFileSync(join(homedir(), 'lima', 'settings.json'), {
            encoding: 'utf-8', flag: 'r'
        }).length === 0) {
            this.create();
            return;
        }

        console.log('Loading previous settings');

        let settingsFile = readFileSync(join(homedir(), 'lima', 'settings.json'), {
            encoding: 'utf-8', flag: 'r'
        });

        let settingsJson = JSON.parse(settingsFile);

        let avatar = new Avatar(settingsJson.avatar.type,
            settingsJson.avatar.color
        );

        this.settings.background = settingsJson.background;
        this.settings.avatar = avatar;
    }

    stergere() {
        writeFileSync(join(homedir(), 'lima', 'settings.json'), JSON.stringify(new Settings()), {
            encoding: 'utf-8', flag: 'w'
        });
    }

    constructor() {
        this.initialize();
    }
}