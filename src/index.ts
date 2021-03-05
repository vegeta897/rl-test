import { RNG } from 'rot-js'
import { Application } from 'pixi.js'

const { view } = new Application({ width: 800, height: 600 })
view.id = 'viewport'
view.style.display = 'block'
view.style.margin = '0 auto'
document.body.appendChild(view)

console.log(RNG.getUniform())
console.log(RNG.getNormal())
