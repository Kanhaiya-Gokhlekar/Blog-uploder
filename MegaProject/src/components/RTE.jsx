import React from "react";
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                    apiKey="hrx3gg52drgpg8selg3ax7y9ko829a157ecfqe1lca6vsm9u"
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image", "advlist", "autolink", "lists", "link", "charmap", "preview",
                                "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
                                "insertdatetime", "media", "table", "help", "wordcount"
                            ],
                            toolbar: "undo redo | blocks | image | bold italic forecolor | " +
                                     "alignleft aligncenter alignright alignjustify | " +
                                     "bullist numlist outdent indent | removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    );
}
