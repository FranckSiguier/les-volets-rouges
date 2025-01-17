import { Calendar, User } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBlogPosts } from "../actions";

export const metadata: Metadata = {
  title: "Blog - Les Volets Rouges",
  description: "Découvrez les dernières actualités de notre restaurant.",
};

async function BlogIndex() {
  // Get the posts from your database
  // with a server action
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-cormorant text-4xl text-accent">
            Le Blog des Volets Rouges
          </h1>
        </div>

        {posts.length === 0 && (
          <div className="mt-20 text-center">
            <p>Aucun article n&apos;a été publié pour le moment.</p>
          </div>
        )}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              prefetch
              className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
            >
              <Image
                src={post.coverImage}
                alt={post.name}
                className="h-48 w-full object-contain"
                width={500}
                height={300}
              />
              <div className="p-6">
                <h2 className="mb-2 text-xl font-semibold text-gray-900">
                  {post.name}
                </h2>
                <p className="mb-4 text-gray-600">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <User className="mr-1 h-4 w-4" />
                  <span className="mr-4">Paul</span>
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogIndex;
