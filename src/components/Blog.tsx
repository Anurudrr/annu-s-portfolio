import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { BlogItem } from '../types';

interface BlogProps {
  posts?: BlogItem[];
}

export default function Blog({ posts }: BlogProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section id="blog" className="bg-[#f4eee8] px-3 py-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1680px] overflow-hidden bg-[#050505]">
        <div className="grid gap-8 p-6 text-[#fffaf4] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:p-14">
          <div>
            <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-wider text-[#f1d8ca]/70">
              Notes / Engineering
            </div>
            <h2 className="font-bangers text-[clamp(3.6rem,8vw,8rem)] uppercase leading-[0.94] tracking-[0.01em]">
              Writing
            </h2>
          </div>
          <p className="max-w-sm font-mono text-[11px] font-bold uppercase leading-relaxed tracking-wider text-[#f1d8ca]/65">
            Technical decisions, build notes, and lessons from practical project work.
          </p>
        </div>

        <div className="grid grid-cols-1 bg-[#f1d8ca] md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              itemScope
              itemType="https://schema.org/BlogPosting"
              whileHover={{ y: -4 }}
              className="flex min-h-[360px] flex-col justify-between border-b-2 border-[#050505] bg-[#f1d8ca] p-6 text-[#050505] transition-colors hover:bg-[#fffaf4] md:border-r-2 sm:p-8 xl:[&:nth-child(3n)]:border-r-0"
            >
              <div>
                <div
                  className={`mb-6 inline-flex border-2 border-[#050505] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider shadow-[3px_3px_0_#050505] ${
                    index % 3 === 0
                      ? 'bg-[#8bd450]'
                      : index % 3 === 1
                        ? 'bg-[#ef4b2d] text-[#fffaf4]'
                        : 'bg-[#f7cab2]'
                  }`}
                >
                  {post.category} / {post.readingTime}
                </div>

                <h3
                  itemProp="headline"
                  className="font-bangers text-5xl uppercase leading-[0.98] tracking-[0.01em]"
                >
                  {post.title}
                </h3>
                <p
                  itemProp="description"
                  className="mt-5 font-elite text-sm font-medium leading-relaxed text-[#050505]/75"
                >
                  {post.summary}
                </p>
              </div>

              <div className="mt-8">
                <div className="mb-5 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[#050505]/30 bg-[#fffaf4] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-[#050505]/65"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/dev/blog/${post.slug}`}
                  className="border-b border-current pb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#214f31] transition-colors hover:text-[#ef4b2d]"
                >
                  Read note -&gt;
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
