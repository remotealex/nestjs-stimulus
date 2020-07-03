import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // Register the Handlebars partials and helpers
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));
  hbs.registerHelper('if_eq', (a, b, opts) =>
    a === b ? opts.fn(this) : opts.inverse(this),
  );

  await app.listen(4001);
}
bootstrap();
