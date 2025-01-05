import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { Roles } from 'src/enum/roles.enum';

export default class UserSeeder implements Seeder {
    public async run (
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<void> {
        await dataSource.query('TRUNCATE "user" RESTART IDENTITY;');
        const userRepository = dataSource.getRepository(User);

            const users = [
                {
                    first_name: 'ADMIN',
                    last_name: 'ADMIN',
                    phone_number: '+48098765432',
                    email: 'admin@example.com',
                    password: 'password',
                    role: Roles.ADMIN,
                },
                {
                    first_name: 'JO',
                    last_name: 'Client',
                    phone_number: '+48111111111',
                    email: 'jo@example.com',
                    password: 'password',
                    role: Roles.CLIENT,
                },
                {
                    first_name: 'Mapei',
                    last_name: 'Client',
                    phone_number: '+48222222222',
                    email: 'mapei@example.com',
                    password: 'password',
                    role: Roles.CLIENT,
                },
                {
                    first_name: 'Sonepar',
                    last_name: 'Client',
                    phone_number: '+48333333333',
                    email: 'sonepar@example.com',
                    password: 'password',
                    role: Roles.CLIENT,
                },
                {
                    first_name: 'Bausch',
                    last_name: 'Client',
                    phone_number: '+48444444444',
                    email: 'bausch@example.com',
                    password: 'password',
                    role: Roles.CLIENT,
                },
                {
                    first_name: 'Chantelle',
                    last_name: 'Client',
                    phone_number: '+48555555555',
                    email: 'chantelle@example.com',
                    password: 'password',
                    role: Roles.CLIENT,
                },
                {
                    first_name: 'Iglotech',
                    last_name: 'Client',
                    phone_number: '+48666666666',
                    email: 'iglotech@example.com',
                    password: 'password',
                    role: Roles.CLIENT,
                },
                {
                    first_name: 'Orange',
                    last_name: 'Client',
                    phone_number: '+48777777777',
                    email: 'orange@example.com',
                    password: 'password',
                    role: Roles.CLIENT,
                },
                {
                    first_name: 'T-Mobile',
                    last_name: 'Client',
                    phone_number: '+48888888888',
                    email: 'tmobile@example.com',
                    password: 'password',
                    role: Roles.CLIENT,
                },
                {
                    first_name: 'AudytySC',
                    last_name: 'Client',
                    phone_number: '+48999999999',
                    email: 'audytysc@example.com',
                    password: 'password',
                    role: Roles.CLIENT,
                },
                {
                    first_name: 'CAWI',
                    last_name: 'Client',
                    phone_number: '+48123456789',
                    email: 'cawi@example.com',
                    password: 'password',
                    role: Roles.CLIENT,
                },
                {
                    first_name: 'SC',
                    last_name: 'Client',
                    phone_number: '+48123456729',
                    email: 'sc@example.com',
                    password: 'password',
                    role: Roles.CLIENT,
                }
            ]

            for (const user of users) {
                user.password = await bcrypt.hash(user.password, 10);
            }

        await userRepository.insert(users);
    }
}