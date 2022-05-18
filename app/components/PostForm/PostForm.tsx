import { Form, FormMethod } from "@remix-run/react"
import { ActionData, inputClassName } from '../../routes/posts/admin/new';

interface PostFormProps {
    method: FormMethod;
    errors: ActionData;
    isCreating: boolean;
    intialValues?: {
        title: string;
        slug: string;
        markdown: string;
    }
}

const PostForm: React.FC<PostFormProps> = ({
    errors,
    method,
    isCreating,
    intialValues
}) => {

    console.log(intialValues?.title, intialValues?.slug, intialValues?.markdown)

    return (
        <Form method={method} >
            <p>
                <label>
                    Post Title:{" "}
                    {errors?.title ? (
                        <em className="text-red-600">{errors.title}</em>
                    ) : null}
                    <input
                        type="text"
                        name="title"
                        className={inputClassName}
                        defaultValue={intialValues?.title}
                    />
                </label>
            </p>
            <p>
                <label>
                    Post Slug:{" "}
                    {errors?.slug ? (
                        <em className="text-red-600">{errors.slug}</em>
                    ) : null}
                    <input
                        type="text"
                        name="slug"
                        className={inputClassName}
                        defaultValue={intialValues?.slug}
                    />
                </label>
            </p>
            <p>
                <label htmlFor="markdown">Markdown:{" "}
                    {errors?.markdown ? (
                        <em className="text-red-600">
                            {errors.markdown}
                        </em>
                    ) : null}</label>
                <br />
                <textarea
                    id="markdown"
                    rows={5}
                    name="markdown"
                    className={`${inputClassName} font-mono`}
                    defaultValue={intialValues?.markdown}
                />
            </p>
            <p className="text-right">
                <button
                    type="submit"
                    className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
                    disabled={isCreating}
                >
                    {isCreating ? "Creating..." : "Create Post"}
                </button>
            </p>
        </Form>)
}

export default PostForm