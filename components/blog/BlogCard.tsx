'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import { BlogPatterns, blogCardColors } from './BlogPatterns';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const Pattern = BlogPatterns[index % BlogPatterns.length];
  const backgroundColor = blogCardColors[index % blogCardColors.length];

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="medbanqs-blog-card rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1">
        {/* Pattern Container - Taller for better proportion */}
        <div 
          className="medbanqs-card-pattern-container relative h-56 overflow-hidden rounded-2xl"
          style={{ backgroundColor }}
        >
          <div className="medbanqs-pattern-wrapper absolute inset-0 flex items-center justify-center">
            <div 
              className="medbanqs-pattern-animate"
              style={{ 
                color: 'rgba(0, 0, 0, 0.8)',
                animationDelay: `${index * 0.2}s`
              }}
            >
              <Pattern />
            </div>
          </div>
        </div>

        {/* Content - Minimal with transparent background */}
        <div className="pt-6 pb-4">
          <h3 className="text-lg font-semibold text-gray-800 px-1 line-clamp-3 leading-snug">
            {post.title}
          </h3>
          
          <p className="text-sm text-gray-600 mt-3 px-1">
            {post.category}
          </p>
        </div>
      </article>
    </Link>
  );
}