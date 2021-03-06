import { World } from 'ape-ecs'
import { Controller } from './components/com_controller'
import { Move } from './components/com_move'
import { Tile } from './components/com_tile'
import { SystemGroup, Tags } from './types'
import InputSystem from './systems/sys_input'
import ActionSystem from './systems/sys_action'
import MoveSystem from './systems/sys_move'
import TileSystem from './systems/sys_tile'

export const world = new World()
world.registerComponent(Controller, 1)
world.registerComponent(Move, 1)
world.registerComponent(Tile, 1000)
world.registerTags(...Object.values(Tags))
world.registerSystem(SystemGroup.Input, InputSystem)
world.registerSystem(SystemGroup.Update, ActionSystem)
world.registerSystem(SystemGroup.Update, MoveSystem)
world.registerSystem(SystemGroup.Update, TileSystem)

export function updateWorld() {
	world.runSystems(SystemGroup.Update)
}
