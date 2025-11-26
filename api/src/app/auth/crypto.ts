import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { hashSync, compare, compareSync } from 'bcrypt';

@Injectable()
export class CryptoService {
  constructor(private config: ConfigService) {}

  hash(value: string): string {
    return hashSync(value, 10);
  }

  hashCompare(value: string, encrypted: string): boolean {    
    return compareSync(value, encrypted);
  }
}
