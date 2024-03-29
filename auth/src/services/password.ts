import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buffer.toString('hex')}.${salt}`;
  }

  static async compare(password: string, incomingPassword: string) {
    const [hashedPassword, salt] = password.split('.');

    const buffer = (await scryptAsync(incomingPassword, salt, 64)) as Buffer;
    // console.log(buffer.toString('hex'), 'hashed', hashedPassword);
    return buffer.toString('hex') === hashedPassword;
  }
}
