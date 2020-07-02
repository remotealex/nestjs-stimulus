import { Controller } from 'stimulus';

export default class extends Controller {
  slideTargets: any[];

  static targets = ['slide'];

  initialize() {
    this.showCurrentSlide();
  }

  next() {
    this.index = (parseInt(this.index, 10) + 1).toString();
  }

  previous() {
    this.index = (parseInt(this.index, 10) - 1).toString();
  }

  showCurrentSlide() {
    this.slideTargets.forEach((el, i) => {
      el.classList.toggle('slide--current', this.index === i.toString());
    });
  }

  get index() {
    return this.data.get('index');
  }

  set index(value: string) {
    this.data.set('index', value);
    this.showCurrentSlide();
  }
}
