import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { number: '9999999999' },
    update: {},
    create: {
      number: '9999999999',
      password: '$2b$10$5zmFuQOHbPbXVN3XwG1mrO2SdAKvpJflNas9TNxtYPSmLcCJfXGka',
      name: 'prince',
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "122",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const prince = await prisma.user.upsert({
    where: { number: '8888888888' },
    update: {},
    create: {
      number: '8888888888',
      password: '$2b$10$5zmFuQOHbPbXVN3XwG1mrO2SdAKvpJflNas9TNxtYPSmLcCJfXGka',
      name: 'prince',
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "122",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { number: '9999999988' },
    update: {},
    create: {
      number: '9999999988',
      password: '$2b$10$5zmFuQOHbPbXVN3XwG1mrO2SdAKvpJflNas9TNxtYPSmLcCJfXGka',
      name: 'anshuman',
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "123",
          provider: "HDFC Bank",
        },
      },
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })