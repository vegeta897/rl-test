import { Application, Ticker, ObservablePoint } from 'pixi.js'
import { World } from 'ape-ecs'
import { SystemGroup, Tags } from './types'
import InputSystem from './systems/input'
import TileSystem from './systems/tile'
import TWEEN from '@tweenjs/tween.js'
import './style.css'
import { Level } from './level'
import { createPlayer } from './archetypes/player'
import { Tile } from './components/tile'
import { Controller } from './components/controller'
import ActionSystem from './systems/action'
import MoveSystem from './systems/move'
import { Move } from './components/move'

const { view, stage } = new Application({
	width: 800,
	height: 600,
})
view.id = 'viewport'
view.addEventListener('contextmenu', (e) => e.preventDefault())
document.body.appendChild(view)

Ticker.shared.add(() => {
	TWEEN.update()
})

const level = new Level()

const room = level.map.getRooms()[0]
stage.addChild(level.container)
stage.scale = { x: 2, y: 2 } as ObservablePoint

const world = new World()
world.registerComponent(Controller, 1)
world.registerComponent(Move, 1)
world.registerComponent(Tile, 1000)
world.registerTags(...Object.values(Tags))
world.registerSystem(SystemGroup.Input, InputSystem)
world.registerSystem(SystemGroup.Update, ActionSystem)
world.registerSystem(SystemGroup.Update, MoveSystem)
world.registerSystem(SystemGroup.Update, TileSystem)

const [playerX, playerY] = room.getCenter()
createPlayer(world, stage, playerX, playerY)

world.runSystems(SystemGroup.Update)
