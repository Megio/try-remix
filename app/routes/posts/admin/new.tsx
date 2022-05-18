import { Form, useActionData, useTransition } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { createPost } from "~/models/post.server";
import type { ActionFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import PostForm from "~/components/PostForm/PostForm";

export type ActionData =
    | {
        title: null | string;
        slug: null | string;
        markdown: null | string;
    }
    | undefined;

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

    await createPost({ title, slug, markdown });

    return redirect("/posts/admin");
};

export const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

const NewPost = () => {
    const errors = useActionData();

    const transition = useTransition();
    const isCreating = Boolean(transition.submission);

    return (
        <PostForm
            method="post"
            errors={errors}
            isCreating={isCreating}
        />
    );
}

export default NewPost;