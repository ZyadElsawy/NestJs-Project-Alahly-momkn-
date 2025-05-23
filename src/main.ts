import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { configuration } from "./config/configuration";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(configuration.app.apiPrefix);

  // Enable validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle(configuration.swagger.title)
    .setDescription(configuration.swagger.description)
    .setVersion(configuration.swagger.version)
    .addTag("SKU", "SKU management operations")
    .addTag("Stock", "Stock management operations")
    .addTag("Stock Transfer", "Stock transfer operations")
    .addTag("Reorder Alert", "Reorder alert management")
    .addTag("Branch Stock", "Branch stock operations")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Remove empty schemas from Swagger document
  if (document.components?.schemas) {
    for (const schemaName in document.components.schemas) {
      const schema = document.components.schemas[schemaName];

      // Check if schema is NOT a ReferenceObject (i.e., no $ref)
      if (!("$ref" in schema)) {
        // Now safe to access .properties
        if (!schema.properties || Object.keys(schema.properties).length === 0) {
          delete document.components.schemas[schemaName];
        }
      }
    }
  }

  SwaggerModule.setup("api/docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(configuration.app.port);
  console.log(
    `Application is running on: http://localhost:${configuration.app.port}`
  );
  console.log(
    `Swagger documentation is available at: http://localhost:${configuration.app.port}/api/docs`
  );
}

bootstrap();
