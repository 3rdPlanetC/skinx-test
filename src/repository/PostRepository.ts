import { Post } from "../entities/post.entity";

export interface IPostRepository {
    get(): Promise<Post[] | null>;
}