import { uploadthing } from 'uploadthing/next';
import { ourFileRouter } from './core';

const handler = uploadthing(ourFileRouter);

export const { GET, POST } = handler;
