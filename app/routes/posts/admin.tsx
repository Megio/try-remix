import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, Outlet, Form } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getPosts } from "~/models/post.server";
import { deletePost } from '../../models/post.server';

type LoaderData = {
    posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async () => {
    return json({ posts: await getPosts() });
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();

    const slug = formData.get("slug");

    invariant(
        typeof slug === "string",
        "slug must be a string"
    );

    await deletePost(slug);

    return redirect("/posts/admin");
}

const PostAdmin = () => {
    const { posts } = useLoaderData() as LoaderData;
    return (
        <div className="mx-auto max-w-4xl">
            <h1 className="my-6 mb-2 border-b-2 text-center text-3xl">
                Blog Admin
            </h1>
            <div className="grid grid-cols-4 gap-6">
                <nav className="col-span-4 md:col-span-1">
                    <ul>
                        {posts.map((post) => (
                            <li key={post.slug} className="space-x-4">
                                <Link
                                    to={post.slug}
                                    className="text-blue-600 underline"
                                >
                                    {post.title}
                                </Link>
                                <Form method="post" style={{ display: "inline" }}>
                                    <input type="hidden" name="slug" value={post.slug} />
                                    <button
                                        type="submit"
                                        className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
                                    >
                                        X
                                    </button>
                                </Form>
                            </li>
                        ))}
                    </ul>
                </nav>
                <main className="col-span-4 md:col-span-3">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default PostAdmin