import { Handler } from '@netlify/functions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

interface noteEntry {
    notedesc: string
}

const handler: Handler = async (event, context) => {
  if(event.body) {
    const newNote = JSON.parse(event.body) as noteEntry;
    await prisma.note.create({
      data: {
        notedesc: newNote
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