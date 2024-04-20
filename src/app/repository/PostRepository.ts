import { Post } from "./entities/post.entity";

export interface IPostRepository {
    getAll(): Promise<Post[] | null>;
}