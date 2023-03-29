import cool_head_blue from '../assets/HEAD-LLAMA-cool-blue.png';
import nerd_head_blue from '../assets/HEAD-LLAMA-nerd-blue.png';
import cool_head_pink from '../assets/HEAD-LLAMA-cool-pink.png';
import nerd_head_pink from '../assets/HEAD-LLAMA-nerd-pink.png';
import cool_head_purple from '../assets/HEAD-LLAMA-cool-mov.png';
import nerd_head_purple from '../assets/HEAD-LLAMA-nerd-purple.png';
import cool_head_green from '../assets/HEAD-LLAMA-cool-green.png';
import nerd_head_green from '../assets/HEAD-LLAMA-nerd-green.png';
import cool_head_yellow from '../assets/HEAD-LLLAMA.png';
import nerd_head_yellow from '../assets/HEAD-LLAMA-nerd.png';
import React from 'react';

const images: Map<string, Map<string, string>> = new Map([
	['nerd', new Map([
		['yellow', nerd_head_yellow],
		['blue', nerd_head_blue],
		['green', nerd_head_green],
		['pink', nerd_head_pink],
		['purple', nerd_head_purple]
	])],
	['cool', new Map([
		['yellow', cool_head_yellow],
		['blue', cool_head_blue],
		['green', cool_head_green],
		['pink', cool_head_pink],
		['purple', cool_head_purple]
	])]]);

export type DifficultyLevel = {
	level: number,
	color: "purple" | "pink" | "blue" | "green" | "yellow",
	type: "cool" | "nerd"
};

export function DifficultyLevel({level, color, type}: DifficultyLevel) {
	let chosenImg = images.get(type)?.get(color) ?? '';
	let array: string[] = [chosenImg, chosenImg, chosenImg];
	

	return (
		<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
			{
				array.map((val, index, _) => {
					return <img src={val} style={{opacity: index >= level ? '30%' : '100%',
					height: '45px'
				}}/>
				})
			}
		</div>
	);
}