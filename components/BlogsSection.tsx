"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLatestStaticBlogs } from "@/lib/blog/client-storage";
import { BlogPatterns, blogCardColors } from "./blog/BlogPatterns";

export default function BlogsSection() {
  const blogPosts = getLatestStaticBlogs(4);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 sm:mb-4">
            MEDICAL EXAM RESOURCES
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 md:mb-8 leading-tight tracking-tight px-2 sm:px-0">
            Expert Guides & Study Tips
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
          {blogPosts.map((post, index) => {
            const Pattern = BlogPatterns[index % BlogPatterns.length];
            const backgroundColor = blogCardColors[index % blogCardColors.length];

            return (
              <div
                key={post.id}
                className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000 group cursor-pointer"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                    {/* Pattern Visual Section */}
                    <div
                      className="h-40 sm:h-44 md:h-48 relative flex items-center justify-center rounded-t-2xl"
                      style={{ backgroundColor }}
                    >
                      <div style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                        <Pattern />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                      <div className="text-xs font-semibold text-gray-500 mb-2 tracking-wide uppercase">
                        {post.category}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-black mb-3 line-clamp-2 group-hover:text-gray-600 transition-colors duration-300">
                        {post.title}
                      </h3>

                      <div className="mt-auto">
                        <span className="inline-flex items-center text-sm font-medium text-black hover:text-gray-600 transition-colors duration-300 group">
                          READ MORE
                          <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-300 text-sm sm:text-base"
          >
            View All Blog Posts
            <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}