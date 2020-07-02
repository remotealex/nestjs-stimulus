import { Controller } from 'stimulus';

export default class extends Controller {
  nameTarget: { value: string };

  static targets = ['name'];

  greet() {
    console.log(`Hello, ${this.name}!`);
  }

  get name() {
    return this.nameTarget.value;
  }
}
