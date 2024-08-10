import conf from "../conf/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title, content, featuredImage, status, userId
            });
        } catch (error) {
            console.log("Appwrite service :: createPost() :: ", error);
            return false;
        }
    }
    

    async updatePost(slug,{title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.error("Appwrite Service :: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            );
            return true;
        } catch (error) {
            console.error("Appwrite Service :: deletePost :: error", error);
            throw error;
        }
    }

    async getPost( slug ) {
        try {
        const post=await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
        );
        console.log(post);
        return post
        } catch (error) {
        console.error("Appwrite Service :: getPosts :: Error fetching posts:", error);
        throw error;
    }
    }

    async getPosts(queries= [Query.equal("status", "active")]) {
        try {
           const posts=await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
            console.log(posts);
            return posts
        } catch (error) {
            console.error("Appwrite Service :: getPosts :: error", error);
            throw error;
        }
    }

    // File Upload Methods

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            );
        } catch (error) {
            console.error("Appwrite Service :: uploadFile :: error", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            );
            return true;
        } catch (error) {
            console.error("Appwrite Service :: deleteFile :: error", error);
            throw error;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        );
    }
}

const service = new Service();

export default service;
