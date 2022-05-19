import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import invariant from "tiny-invariant";
import { deletePost, Post, upsertPost } from "~/models/post.server";
import type { LoaderFunction } from "@remix-run/node";
import { getPost } from "~/models/post.server";
import PostForm from "~/components/PostForm/PostForm";
import { ActionData } from "./new";


type LoaderData = { post: Post };

export const loader: LoaderFunction = async ({ params }) => {
    invariant(params.slug, `params.slug is required`);

    const post = await getPost(params.slug);

    invariant(post, `Post not found: ${params.slug}`);


    return json<LoaderData>({ post });
};

export const action: ActionFunction = async ({ request }) => {
    // TODO: remove me
    await new Promise((res) => setTimeout(res, 1000))

    const formData = await request.formData();

    const title = formData.get("title");
    const slug = formData.get("slug");
    const markdown = formData.get("markdown");

    const errors: ActionData = {
        title: title ? null : "Title is required",
        slug: slug ? null : "Slug is required",
        markdown: markdown ? null : "Markdown is required",
    };
    const hasErrors = Object.values(errors).some(
        (errorMessage) => errorMessage
    );
    if (hasErrors) {
        return json<ActionData>(errors);
    }

    invariant(
        typeof title === "string",
        "title must be a string"
    );
    invariant(
        typeof slug === "string",
        "slug must be a string"
    );
    invariant(
        typeof markdown === "string",
        "markdown must be a string"
    );

    await upsertPost({ title, slug, markdown });

    return redirect("/posts/admin");

};


const AdminSlug = () => {
    const errors = useActionData();
    const transition = useTransition();
    const isCreating = Boolean(transition.submission);

    const { post } = useLoaderData() as LoaderData;

    return (
        <PostForm
            errors={errors}
            isCreating={isCreating}
            method="post"
            initialValues={post}
            btnLabel="Modify Post"
        />
    );
}

export default AdminSlug;