import { DataSource } from 'typeorm';
import UserSeeder from 'src/database/seeders/user.seeder';
import { AppModule } from 'src/modules/app.module';
import { NestFactory } from '@nestjs/core';

async function seed() {
    const app = await NestFactory.create(AppModule);
    const dataSource = app.get(DataSource);

    try {
        const userSeeder = new UserSeeder();
        await userSeeder.run(dataSource, null);
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await app.close();
    }
}

seed();
