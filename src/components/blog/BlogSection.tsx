import { blogPosts } from '@/data/blogs';
import BlogCard from './BlogCard';

export default function BlogSection() {
  return (
    <section id="blog" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-center font-display text-3xl font-bold uppercase md:text-4xl">
          Recent Blog Posts
        </h2>
        <div className="grid gap-6 grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <button className="rounded-full border-2 border-red-400 px-8 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-400 hover:text-white">
            Read all
          </button>
        </div>
      </div>
    </section>
  );
}
