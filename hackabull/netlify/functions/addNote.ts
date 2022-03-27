import { Handler } from '@netlify/functions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

interface noteEntry {
    notedesc: string
}

const handler: Handler = async (event, context) => {
  if(event.body) {
    const newNote = JSON.parse(event.body) as noteEntry;
    const time = new Date().toISOString();
    await prisma.note.create({
      data: {
        createdat: time,
        notedesc: newNote.notedesc
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(newNote)
    };
  }

  return {
    statusCode: 500
  };
}

export { handler }