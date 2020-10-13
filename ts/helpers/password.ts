import { hashSync, compareSync } from "bcrypt";
const salt = 10;

export class PasswordHelper {
    /**
     * Used to encrypt password
     * @param text - text password
     */
    public static encrypt(text: string): string {
        return hashSync(text, salt);
    }

    /**
     * compare hash and text password
     * @param text - text passowrd
     * @param hash - hash
     */
    public static compare(text: string, hash: string): boolean {
        return compareSync(text, hash);
    }
}
