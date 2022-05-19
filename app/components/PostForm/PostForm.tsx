import { Form, FormMethod } from "@remix-run/react"
import { useState, useEffect } from 'react';
import { ActionData, inputClassName } from '../../routes/posts/admin/new';

interface PostFormProps {
    method: FormMethod;
    errors: ActionData;
    isCreating: boolean;
    btnLabel: string;
    initialValues?: {
        title: string;
        slug: string;
        markdown: string;
    }
}

const PostForm: React.FC<PostFormProps> = ({
    errors,
    method,
    isCreating,
    initialValues,
    btnLabel
}) => {

    const [formValues, setFormValues] = useState(initialValues || {
        title: "",
        slug: "",
        markdown: ""
    });

    useEffect(() => {
        setFormValues({
            title: initialValues?.title || "",
            slug: initialValues?.slug || "",
            markdown: initialValues?.markdown || ""
        })
    }, [initialValues])

    return (
        <>
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
                            value={formValues?.title}
                            onChange={(e) => setFormValues({
                                ...formValues,
                                title: e.target.value,
                            })}
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
                            value={formValues?.slug}
                            onChange={(e) => setFormValues({
                                ...formValues,
                                slug: e.target.value,
                            })}
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
                        value={formValues?.markdown}
                        onChange={(e) => setFormValues({
                            ...formValues,
                            markdown: e.target.value,
                        })}
                    />
                </p>
                <div className="text-right space-x-7">
                    <button
                        type="submit"
                        className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
                        disabled={isCreating}
                    >
                        {isCreating ? "Doing something..." : btnLabel}
                    </button>
                </div>
            </Form>
        </>)
}

export default PostForm