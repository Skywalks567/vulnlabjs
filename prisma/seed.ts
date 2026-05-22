import 'dotenv/config';

import prisma from '../src/lib/prisma';

async function main() {
  await prisma.labNote.deleteMany();
  await prisma.labProduct.deleteMany();
  await prisma.labUser.deleteMany();

  const admin = await prisma.labUser.create({
    data: {
      id: 1,
      email: 'admin@vulnlab.local',
      username: 'admin',
      password: 'password123',
      role: 'admin',
    },
  });

  const alice = await prisma.labUser.create({
    data: {
      id: 2,
      email: 'alice@vulnlab.local',
      username: 'alice',
      password: 'password123',
      role: 'user',
    },
  });

  const bob = await prisma.labUser.create({
    data: {
      id: 3,
      email: 'bob@vulnlab.local',
      username: 'bob',
      password: 'password123',
      role: 'user',
    },
  });

  await prisma.labNote.create({
    data: {
      id: 1,
      title: 'Admin Private Note',
      content: 'CTF{admin_private_note}',
      ownerId: admin.id,
    },
  });

  await prisma.labNote.create({
    data: {
      id: 2,
      title: 'Alice Private Note',
      content: 'CTF{alice_private_note}',
      ownerId: alice.id,
    },
  });

  await prisma.labNote.create({
    data: {
      id: 3,
      title: 'Bob Private Note',
      content: 'CTF{bob_private_note}',
      ownerId: bob.id,
    },
  });

  await prisma.labProduct.createMany({
    data: [
      {
        name: 'Laptop',
        description: 'Developer laptop',
        price: 15000000,
      },
      {
        name: 'Keyboard',
        description: 'Mechanical keyboard',
        price: 800000,
      },
      {
        name: 'Mouse',
        description: 'Wireless mouse',
        price: 250000,
      },
    ],
  });

  // Reset auto-increment sequences in PostgreSQL to avoid primary key conflicts on future inserts
  try {
    await prisma.$executeRawUnsafe(
      `SELECT setval(pg_get_serial_sequence('"LabUser"', 'id'), 3, true);`,
    );
    await prisma.$executeRawUnsafe(
      `SELECT setval(pg_get_serial_sequence('"LabNote"', 'id'), 3, true);`,
    );
    console.log('Postgres sequences successfully reset.');
  } catch (err) {
    // Silently continue if database provider isn't Postgres
    console.log(
      'Sequence reset skipped (not Postgres or permission limitation).',
    );
  }

  console.log('Seed completed.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
