import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import {RomanaPanel} from "@/pages/RomanaPanel";

const ComponentPreviews = () => {
	return (
		<Previews palette={<PaletteTree/>}>
			<ComponentPreview path="/RomanaPanel">
				<RomanaPanel/>
			</ComponentPreview>
		</Previews>
	);
};

export default ComponentPreviews;