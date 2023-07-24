import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import {RomanaPanel} from "@/pages/RomanaPanel";
import {FormareSettings} from "@/pages/settings/FormareSettings";
import {AritmeticaPanel} from "@/pages/AritmeticaPanel";
import {Litere} from "@/pages/exercises/comunicare/romana/RecunoastereLitere";

const ComponentPreviews = () => {
	return (
		<Previews palette={<PaletteTree/>}>
			<ComponentPreview path="/RomanaPanel">
				<RomanaPanel/>
			</ComponentPreview>
            <ComponentPreview path="/FormareSettings">
                <FormareSettings/>
            </ComponentPreview>
            <ComponentPreview path="/AritmeticaPanel">
                <AritmeticaPanel/>
            </ComponentPreview>
            <ComponentPreview path="/Litere">
                <Litere/>
            </ComponentPreview>
        </Previews>
	);
};

export default ComponentPreviews;
