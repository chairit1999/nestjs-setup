import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
export const writeFileHelper = (
  path: string,
  file: Buffer,
  fileName: string,
) => {
  try {
    writeFileSync(join(path, fileName), file);
  } catch (error) {
    if (existsSync(path) === false) {
      mkdirSync(path, { recursive: true });
      writeFileSync(join(path, fileName), file);
    } else {
      writeFileSync(join(path, fileName), file);
    }
  }
};
