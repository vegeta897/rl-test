import { RNG } from 'rot-js'
import * as PIXI from 'pixi.js'
import { World } from 'ape-ecs'
import { SystemGroup } from './types'
import InputSystem from './systems/input'
import RenderSystem from './systems/render'
import TWEEN from '@tweenjs/tween.js'
import './style.css'
import { createSprite, SPRITES } from './sprites'
import { Level } from './level'

const { view, stage } = new PIXI.Application({
	width: 800,
	height: 600,
})
view.id = 'viewport'
view.addEventListener('contextmenu', (e) => e.preventDefault())
document.body.appendChild(view)

PIXI.Ticker.shared.add(() => {
	world.runSystems(SystemGroup.Render)
	TWEEN.update()
})

const level = new Level()

const player = createSprite(SPRITES.PLAYER)
const room = level.map.getRooms()[0]
const roomWidth = room.getRight() - room.getLeft()
const roomHeight = room.getBottom() - room.getTop()
player.x = room.getLeft() * 16
player.y = room.getTop() * 16
player.tint = 0x22aa99
stage.addChild(level.container)
stage.addChild(player)
stage.scale = { x: 2, y: 2 } as PIXI.ObservablePoint
const tweenRight = new TWEEN.Tween(player).to(
	{ x: room.getRight() * 16 },
	150 * roomWidth
)
const tweenDown = new TWEEN.Tween(player).to(
	{ y: room.getBottom() * 16 },
	150 * roomHeight
)
const tweenLeft = new TWEEN.Tween(player).to(
	{ x: room.getLeft() * 16 },
	150 * roomWidth
)
const tweenUp = new TWEEN.Tween(player).to(
	{ y: room.getTop() * 16 },
	150 * roomHeight
)
tweenRight.chain(tweenDown)
tweenDown.chain(tweenLeft)
tweenLeft.chain(tweenUp)
tweenUp.chain(tweenRight)
tweenRight.start()

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
