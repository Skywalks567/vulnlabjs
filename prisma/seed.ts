import 'dotenv/config';
import prisma from '../src/lib/prisma';

async function main() {
  await prisma.labNote.deleteMany();
  await prisma.labProduct.deleteMany();
  await prisma.labUser.deleteMany();

  const admin = await prisma.labUser.create({
    data: {
      email: 'admin@vulnlab.local',
      username: 'admin',
      password: 'password123',
      role: 'admin',
    },
  });

  const alice = await prisma.labUser.create({
    data: {
      email: 'alice@vulnlab.local',
      username: 'alice',
      password: 'password123',
      role: 'user',
    },
  });

  const bob = await prisma.labUser.create({
    data: {
      email: 'bob@vulnlab.local',
      username: 'bob',
      password: 'password123',
      role: 'user',
    },
  });

  await prisma.labNote.createMany({
    data: [
      {
        title: 'Alice Private Note',
        content: 'CTF{alice_private_note}',
        ownerId: alice.id,
      },
      {
        title: 'Bob Private Note',
        content: 'CTF{bob_private_note}',
        ownerId: bob.id,
      },
      {
        title: 'Admin Private Note',
        content: 'CTF{admin_private_note}',
        ownerId: admin.id,
      },
    ],
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