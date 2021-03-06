import * as PIXI from 'pixi.js'
import sheetImage from './assets/1bitpack_kenney.png'

export enum SPRITES {
	WALL = 'WALL',
}

const textures = <PIXI.Texture[]>[]

function loadSheet() {
	const baseTexture = PIXI.BaseTexture.from(sheetDefinition.filename)
	for (const texture of sheetDefinition.textures) {
		const { key, x, y, w, h } = texture
		textures[key] = new PIXI.Texture(
			baseTexture,
			new PIXI.Rectangle(x, y, w, h)
		)
	}
}

export function createSprite(spriteName: SPRITES) {
	return new PIXI.Sprite(textures[spriteName])
}

const sheetDefinition = {
	filename: sheetImage,
	textures: [
		{
			key: SPRITES.WALL,
			x: 51,
			y: 306,
			w: 16,
			h: 16,
		},
	],
}

loadSheet()
