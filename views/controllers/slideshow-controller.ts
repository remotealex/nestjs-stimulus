import { Controller } from 'stimulus';

export default class extends Controller {
  numSlideTargets = 0;
  slideTargets: any[];

  static targets = ['slide'];

  initialize() {
    this.numSlideTargets = this.slideTargets.length;
    this.showCurrentSlide();
  }

  next() {
    const nextIdx = parseInt(this.index, 10) + 1;
    this.index = nextIdx > this.numSlideTargets - 1 ? '0' : nextIdx.toString();
  }

  previous() {
    const previousIdx = parseInt(this.index, 10) - 1;
    this.index = (previousIdx < 0
      ? this.numSlideTargets - 1
      : previousIdx
    ).toString();
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
