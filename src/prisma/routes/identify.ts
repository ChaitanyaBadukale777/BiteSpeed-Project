// src/routes/identify.ts

import express from 'express';
import { PrismaClient } from '@prisma/client';
import { getLinkedContacts } from '../utils/contactHelper';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, phoneNumber } = req.body;

  if (!email && !phoneNumber) {
    return res.status(400).json({ error: 'At least one of email or phoneNumber is required' });
  }

  const { primaryContact, allLinked } = await getLinkedContacts(email, phoneNumber);

  if (!primaryContact) {
    const newContact = await PrismaClient.contact.create({
      data: {
        email,
        phoneNumber,
        linkPrecedence: 'primary'
      }
    });

    return res.status(200).json({
      contact: {
        primaryContatctId: newContact.id,
        emails: [newContact.email],
        phoneNumbers: [newContact.phoneNumber],
        secondaryContactIds: []
      }
    });
  }

  const emailExists = allLinked.some(c => c.email === email);
  const phoneExists = allLinked.some(c => c.phoneNumber === phoneNumber);

  if (!(emailExists && phoneExists)) {
    await PrismaClient.contact.create({
      data: {
        email,
        phoneNumber,
        linkedId: primaryContact.id,
        linkPrecedence: 'secondary'
      }
    });
  }

  const finalContacts = await PrismaClient.contact.findMany({
    where: {
      OR: [
        { id: primaryContact.id },
        { linkedId: primaryContact.id }
      ]
    },
    orderBy: { createdAt: 'asc' }
  });

  const emails = [...new Set(finalContacts.map(c => c.email).filter(Boolean))];
  const phoneNumbers = [...new Set(finalContacts.map(c => c.phoneNumber).filter(Boolean))];
  const secondaryContactIds = finalContacts
    .filter(c => c.linkPrecedence === 'secondary')
    .map(c => c.id);

  return res.status(200).json({
    contact: {
      primaryContatctId: primaryContact.id,
      emails,
      phoneNumbers,
      secondaryContactIds
    }
  });
});

export default router;
