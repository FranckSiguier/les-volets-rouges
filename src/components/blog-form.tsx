import React, { useState } from "react";
import {
  Type,
  Image as ImageIcon,
  Trash2,
  Send,
  LoaderCircle,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { createClient } from "~/utils/supabase/client";
import { formatString } from "~/utils/utils";
import { env } from "~/env";
import { uploadBlogPost } from "~/app/actions";
import { Button } from "./ui/button";

type BlockType = "text" | "image";

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  file?: File;
}

function BlogForm() {
  const supabase = createClient();
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: crypto.randomUUID(),
      type,
      content: "",
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: string, content: string, file?: File) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id ? { ...block, content, file } : block,
      ),
    );
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const blocksToUpload = blocks.map(async (block) => {
      if (block.type === "image" && block.file) {
        const fileName = formatString(block.file.name);
        block.content =
          env.NEXT_PUBLIC_SUPABASE_URL +
          "/storage/v1/object/public/assets/" +
          fileName;
        await supabase.storage.from("assets").upload(fileName, block.file);
        block.file = undefined;
        return block;
      }
      return block;
    });

    const uploadedBlocks = await Promise.all(blocksToUpload);

    const post = {
      name: title,
      content: uploadedBlocks,
    };

    await uploadBlogPost(post);

    // Clear the form
    setTitle("");
    setBlocks([]);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-lg bg-white px-8 py-6 shadow-lg">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">
            Nouvel Article
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Titre
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titre de l'article"
                className="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Blocks */}
            <div className="space-y-4">
              {blocks.map((block) => (
                <div key={block.id} className="group relative">
                  {block.type === "text" ? (
                    <textarea
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, e.target.value)}
                      placeholder="Écrire du contenu"
                      rows={4}
                      className="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  ) : (
                    <ImageDropZone
                      onDrop={(files) =>
                        updateBlock(
                          block.id,
                          URL.createObjectURL(files[0] as Blob),
                          files[0],
                        )
                      }
                      preview={block.content}
                    />
                  )}
                  <Button
                    type="button"
                    onClick={() => removeBlock(block.id)}
                    className="absolute -right-2 -top-2 rounded-full bg-red-100 p-1 text-red-600 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Add Block Buttons */}
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => addBlock("text")}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Type className="mr-2 h-5 w-5" />
                Ajouter un bloc de texte
              </Button>
              <Button
                type="button"
                onClick={() => addBlock("image")}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <ImageIcon className="mr-2 h-5 w-5" />
                Ajouter une Image
              </Button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              {isSubmitting ? (
                <>
                  <Button className="flex w-full cursor-not-allowed items-center justify-center gap-4 bg-accent text-white opacity-60 hover:bg-accent md:w-1/2">
                    <LoaderCircle className="animate-spin" />
                    <p>Création ...</p>
                  </Button>
                </>
              ) : (
                <Button
                  className="w-full items-center bg-accent text-white hover:bg-accent hover:bg-opacity-60 md:w-1/2"
                  type="submit"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Publier
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function ImageDropZone({
  onDrop,
  preview,
}: {
  onDrop: (files: File[]) => void;
  preview?: string;
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-lg border-2 border-dashed p-4 text-center transition-colors ${isDragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-indigo-500"}`}
    >
      <input {...getInputProps()} />
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="Preview" className="mx-auto max-h-64" />
      ) : (
        <div className="space-y-2 py-8">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="text-gray-500">
            {isDragActive
              ? "Relâchez pour ajouter l'image"
              : "Drag & drop une image, où cliquez et sélectionner"}
          </p>
        </div>
      )}
    </div>
  );
}

export default BlogForm;
