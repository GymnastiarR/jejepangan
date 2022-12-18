import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import { hash } from 'bcrypt';

// const enkripsi = async() => {
    
// }

async function main() {
    const pass = await hash('Gymnas.2911', 10);
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
        username : 'gymnasss',
      email: 'alice@prisma.io',
      name: 'Alice',
      password : pass
    },
  })

  const bob = await prisma.user.create({
    data : {
        name : "Khalimahtul Sadiyah",
        username : "Khalimahh",
        email : "khalimahtul@gmail.com",
        password : pass,
        verified : true
    }
  })
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