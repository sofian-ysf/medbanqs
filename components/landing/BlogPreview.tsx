import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// This will pull from actual blog data in production
const PREVIEW_POSTS = [
  {
    slug: "ukmla-exam-preparation-guide",
    title: "UKMLA Exam Preparation Guide",
    excerpt: "Everything you need to know about preparing for the UK Medical Licensing Assessment.",
    category: "Exam Prep",
  },
  {
    slug: "top-study-strategies",
    title: "Top Study Strategies for Medical Students",
    excerpt: "Proven techniques to maximize your revision efficiency and retention.",
    category: "Study Tips",
  },
  {
    slug: "common-exam-mistakes",
    title: "Common UKMLA Mistakes to Avoid",
    excerpt: "Learn from others' experiences and avoid these frequent pitfalls.",
    category: "Exam Prep",
  },
];

const BlogPreview = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-dark-text mb-2">
              From the blog
            </h2>
            <p className="text-dark-secondary">
              Tips, guides, and insights for your UKMLA preparation.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-dark-text font-medium hover:gap-3 transition-all"
          >
            View all posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {PREVIEW_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <div className="bg-warm-bg rounded-xl h-40 mb-4 group-hover:bg-gray-100 transition-colors" />
              <span className="text-xs text-dark-muted uppercase tracking-wider">
                {post.category}
              </span>
              <h3 className="font-semibold text-dark-text mt-1 mb-2 group-hover:text-dark-secondary transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-dark-secondary line-clamp-2">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="sm:hidden text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-dark-text font-medium"
          >
            View all posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
