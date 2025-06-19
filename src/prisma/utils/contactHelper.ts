// src/utils/contactHelper.ts

import { PrismaClient } from '@prisma/client';

export const getLinkedContacts = async (email?: string, phoneNumber?: string) => {
  const contacts = await PrismaClient.contact.findMany({
    where: {
      OR: [
        { email: email ?? undefined },
        { phoneNumber: phoneNumber ?? undefined }
      ]
    }
  });

  if (contacts.length === 0) return { primaryContact: null, allLinked: [] };

  const primaryContacts = contacts.filter(c => c.linkPrecedence === 'primary');
  const primaryContact = primaryContacts.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())[0];

  const allLinked = await PrismaClient.contact.findMany({
    where: {
      OR: [
        { id: primaryContact.id },
        { linkedId: primaryContact.id }
      ]
    },
    orderBy: { createdAt: 'asc' }
  });

  return { primaryContact, allLinked };
};
