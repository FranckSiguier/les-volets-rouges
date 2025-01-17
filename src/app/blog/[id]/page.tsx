import { ArrowLeft, Calendar, User } from "lucide-react";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBlogPost, getBlogPosts } from "~/app/actions";
import { type Block } from "~/components/blog-form";

export const metadata: Metadata = {
  title: "Blog - Les Volets Rouges",
  description: "Découvrez les dernières actualités de notre restaurant.",
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    params: { id: post.id.toString() },
  }));
}

async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const post = await getBlogPost(id);

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-2xl text-gray-800">Post not found because Post</p>
      </div>
    );
  }

  const blocks = JSON.parse(post.content) as Block[];

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href={`/blog`}
          className="mb-8 inline-flex items-center text-accent hover:opacity-80"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Retour au blog
        </Link>

        <article>
          <div className="prose prose-lg max-w-none">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              {post.name}
            </h1>

            <div className="mb-8 flex items-center">
              <User className="mr-1 h-5 w-5" />
              <span className="mr-4">Paul</span>
              <Calendar className="mr-1 h-5 w-5" />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="space-y-8">
              {blocks.map((block) => (
                <div key={block.id}>
                  {block.type === "text" ? (
                    <p className="text-gray-800">{block.content}</p>
                  ) : (
                    <Image
                      src={block.content}
                      alt="Article content"
                      className="h-[600px] w-full rounded-lg object-contain shadow-md"
                      width={800}
                      height={500}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default BlogPost;
