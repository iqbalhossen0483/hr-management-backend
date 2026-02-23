// import { NestFactory } from '@nestjs/core';
// import { DataSource } from 'typeorm';
// import { AppModule } from './app.module';
// import { Designation, Employee } from './entities/employee.entity';
// import { HrUser } from './entities/hrUser.entity';

// const seedData = async () => {
//   try {
//     // Create NestJS application context
//     const app = await NestFactory.createApplicationContext(AppModule);

//     // Get DataSource from the app
//     const dataSource = app.get(DataSource);

//     const hrUserRepo = dataSource.getRepository(HrUser);
//     const employeeRepo = dataSource.getRepository(Employee);

//     // Sample HR users
//     const hrUsers = await hrUserRepo.save([
//       {
//         name: 'John Doe',
//         email: 'john.doe@hr.com',
//         password_hash:
//           '$2a$12$LE5KH4pCOMwIAr9WEMaFXeaMFx0Vc2Uakcu8HQ51GRKmYrD45fDOu', //1234567
//       },
//       {
//         name: 'Jane Smith',
//         email: 'jane.smith@hr.com',
//         password_hash:
//           '$2a$12$LE5KH4pCOMwIAr9WEMaFXeaMFx0Vc2Uakcu8HQ51GRKmYrD45fDOu', //1234567
//       },
//     ]);
//     console.log('HR Users seeded:', hrUsers.length);
//     console.log(
//       'Now you can login with email: "john.doe@hr.com" and password: "1234567"',
//     );

//     // Sample employees
//     const employees = await employeeRepo.save([
//       {
//         name: 'John Doe',
//         age: 25,
//         designation: Designation.FULL_STACK_DEVELOPER,
//         hiring_date: '2022-01-01',
//         date_of_birth: '1990-01-01',
//         salary: 50000,
//         photo_path: null,
//       },
//       {
//         name: 'Jane Smith',
//         age: 30,
//         designation: Designation.BACKEND_DEVELOPER,
//         hiring_date: '2022-02-01',
//         date_of_birth: '1985-01-01',
//         salary: 60000,
//         photo_path: null,
//       },
//     ]);
//     console.log('Employees seeded:', employees.length);

//     console.log('Database seeded successfully!');

//     // Close the app
//     await app.close();
//   } catch (error) {
//     console.error('Error seeding database:', error);
//     process.exit(1);
//   }
// };

// seedData().catch((error) => console.error(error));
