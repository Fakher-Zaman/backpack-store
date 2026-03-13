import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group">
      <div className="mb-3 overflow-hidden rounded-xl">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
      </div>
      <h3 className="text-sm font-semibold">{post.title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-gray-500 line-clamp-2">{post.excerpt}</p>
      <p className="mt-2 text-[10px] text-gray-400">
        {post.author} &middot; {post.date}
      </p>
    </article>
  );
}
