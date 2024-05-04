'use server';

import { fileTypeFromBuffer, FileTypeResult } from 'file-type';

export async function getMimeType(source: string): Promise<FileTypeResult['mime']> {
  const buffer = Buffer.from(JSON.parse(source));
  const type = await fileTypeFromBuffer(buffer);
  return type?.mime || 'image/jpeg';
}

export async function buildBase64WithType(source: string): Promise<string> {
  const type = await getMimeType(source);
  const data = Buffer.from(JSON.parse(source)).toString('base64');
  return buildBase64(data, type);
}

export async function buildBase64(data: string, type: FileTypeResult['mime']): Promise<string> {
  return `data:${type};base64,${data}`;
}
