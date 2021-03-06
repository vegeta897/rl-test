import { RNG } from 'rot-js'
import * as PIXI from 'pixi.js'
import { World } from 'ape-ecs'
import { SystemGroup } from './types'
import InputSystem from './systems/input'
import RenderSystem from './systems/render'
import TWEEN from '@tweenjs/tween.js'
import './style.css'
import { createSprite, SPRITES } from './sprites'

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

const { view, stage } = new PIXI.Application({
	width: 800,
	height: 600,
})
view.id = 'viewport'
view.addEventListener('contextmenu', (e) => e.preventDefault())
document.body.appendChild(view)

PIXI.Ticker.shared.add((time) => {
	world.runSystems(SystemGroup.Render)
	TWEEN.update()
	// console.log(time)
})

const sprite = createSprite(SPRITES.WALL)
stage.addChild(sprite)
const tween = new TWEEN.Tween(sprite)
console.log(sprite)
tween
	.to({ x: 100, y: 100 }, 200)
	.delay(200)
	.easing(TWEEN.Easing.Quadratic.InOut)
	.repeat(Infinity)
	.yoyo(true)
tween.start()

const UPDATES_PER_SECOND = 60
setInterval(() => update(), 1000 / UPDATES_PER_SECOND)
function update() {
	world.runSystems(SystemGroup.Update)
}

const world = new World()
world.registerSystem(SystemGroup.Update, InputSystem)
world.registerSystem(SystemGroup.Render, RenderSystem)

console.log(RNG.getUniform())
console.log(RNG.getNormal())
