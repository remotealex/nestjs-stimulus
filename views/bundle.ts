import { Application } from 'stimulus';
import Turbolinks from 'turbolinks';

import HelloController from './controllers/hello-controller';
import SlideShowController from './controllers/slideshow-controller';

const application = Application.start();
application.register('hello', HelloController);
application.register('slideshow', SlideShowController);

Turbolinks.start();
