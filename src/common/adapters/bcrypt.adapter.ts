import {hashSync, compareSync} from 'bcrypt';
import { Encrypt } from '../interfaces';

export  class EncryptAdapter implements Encrypt {

    compare(password: string | Buffer, encrypted: string): boolean {
        return compareSync(password,encrypted );
    }
    
    public hash(password: string | Buffer):string {
        const saltOrRounds = 10;
        return hashSync(password, saltOrRounds);
        
    }


}