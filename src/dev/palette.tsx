import React from "react";
import {Fragment} from "react";
import {
	Category,
	Component,
	Variant,
	Palette,
} from "@react-buddy/ide-toolbox";
import AntdPalette from "@react-buddy/palette-antd";
import MantinePalette from "@react-buddy/palette-mantine-core";

export const PaletteTree = () => (
	<Palette>
		<Category name="App">
			<Component name="Loader">
				<Variant>
					<ExampleLoaderComponent/>
				</Variant>
			</Component>
		</Category>
		<AntdPalette/>
        <MantinePalette/>
    </Palette>
);

export function ExampleLoaderComponent() {
	return (
		<Fragment>Loading...</Fragment>
	);
}