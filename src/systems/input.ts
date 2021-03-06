import { System } from 'ape-ecs'

// Based on https://github.com/fritzy/7drl2020
export default class InputSystem extends System {
	keys = new Set()
	buffer = <string[]>[]
	init() {
		window.addEventListener('keydown', this.keyDown.bind(this))
		window.addEventListener('keyup', this.keyUp.bind(this))
	}
	update() {
		if (this.buffer.length === 0) return
		const key = this.buffer.pop()
		switch (key) {
			case 'KeyW':
			case 'KeyK':
			case 'ArrowUp':
			case 'Numpad8':
				// Up
				break
			case 'KeyS':
			case 'KeyJ':
			case 'ArrowDown':
			case 'Numpad2':
				// Down
				break
			case 'KeyA':
			case 'KeyH':
			case 'ArrowLeft':
			case 'Numpad4':
				// Left
				break
			case 'KeyD':
			case 'KeyL':
			case 'ArrowRight':
			case 'Numpad6':
				// Right
				break
		}
	}
	keyDown(e) {
		if (!e.repeat) {
			this.keys.add(e.code)
			this.buffer.push(e.code)
		}
	}

	keyUp(e) {
		this.keys.delete(e.code)
	}
}
