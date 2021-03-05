import { RNG } from 'rot-js'
import { Application } from 'pixi.js'
import './style.css'

const { view } = new Application({ width: 800, height: 600 })
view.id = 'viewport'
document.body.appendChild(view)

console.log(RNG.getUniform())
console.log(RNG.getNormal())
