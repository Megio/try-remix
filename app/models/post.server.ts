import { prisma } from "~/db.server";
import type { Post } from "@prisma/client";
export type { Post };

export const getPosts = async () => prisma.post.findMany();

export const getPost = async (slug: string) => prisma.post.findUnique({ where: { slug } });

export const createPost = async (post: Pick<Post, "slug" | "title" | "markdown">) => {
    return prisma.post.create({ data: post });
}

export const upsertPost = async (post: Pick<Post, "slug" | "title" | "markdown">) => {
    return prisma.post.update({ where: { slug: post.slug }, data: post })
}

export const deletePost = async (slug: string) => prisma.post.delete({ where: { slug } });
