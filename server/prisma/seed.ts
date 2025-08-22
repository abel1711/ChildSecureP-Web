import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(
    async (prisma) => {

      await prisma.user.createMany({
        data: [
          {
            role: 'ADMIN',
            email: 'abelamieva@gmail.com',
            name: 'Amieva Abel',
            passwordHash: 'Abc123456'
          },
          {
            role: 'USER',
            email: 'abel.amieva.dev@gmail.com',
            name: 'Amieva Abel',
            passwordHash: 'Abc123456'
          }
        ]
      })
      await prisma.modules.createMany({
        data: [
          { name: 'Location live', description: 'Localización del dispositivo en tiempo real' },
          { name: 'Alarm', description: 'Emitir sonido en el dispositivo' },
          { name: 'Sound', description: 'Escuchar el dispositivo' },
          { name: 'Video', description: 'Capturar video del dispositivo' },
          { name: 'Image', description: 'Capturar imagen de camara' },
          { name: 'Screen', description: 'Capturar pantalla del dispositivo' },
        ]
      })
    }
  )
  console.log('Semilla plantada...')
};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })