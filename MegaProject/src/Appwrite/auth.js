import conf from "../conf/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            }
            return userAccount;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log(user);
            return user;
        } catch (error) {
            if (error.code === 401) {
                console.error("Unauthorized: Please log in again.");
                // You may want to handle the redirection to login page here
            } else {
                console.error("Appwrite Service :: getCurrentUser :: error", error);
            }
            throw new Error(error.message);
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrite Service :: logout :: error", error);
            throw new Error(error.message);
        }
    }
}

const authService = new AuthService();

export default authService;
