import { Application } from 'stimulus';
import Turbolinks from 'turbolinks';

import SlideShowController from './controllers/slideshow-controller';

const application = Application.start();
application.register('slideshow', SlideShowController);

Turbolinks.start();
