import { MigrationInterface, QueryRunner } from "typeorm";
import { Post } from "../app/repository/entities/post.entity";
import PostData from '../migrations/seeds/posts-old.json'

export class CreatePostTable1713645216740 implements MigrationInterface {
    name = 'CreatePostTable1713645216740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`postedAt\` varchar(255) NOT NULL, \`postedBy\` varchar(255) NOT NULL, \`tag\` json NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        for await (const postItem of PostData) {
            const post = new Post()
            post.title = postItem.title
            post.content = postItem.content
            post.postedAt = postItem.postedAt
            post.postedBy = postItem.postedBy
            post.tag = `${postItem.tags}`
            await queryRunner.manager.save(post)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`post\``);
    }

}
