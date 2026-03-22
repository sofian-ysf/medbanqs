"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  bgColor: string;
  textColor: string;
  category: string;
}

const BlogsSection: React.FC = () => {
  const { t } = useTranslation();
  const blogPosts: BlogPost[] = [
    {
      id: "ai-future",
      title: t('blogs.posts.future.title'),
      description: t('blogs.posts.future.description'),
      image: "/api/placeholder/300/200",
      bgColor: "bg-gradient-to-br from-emerald-500 to-teal-600",
      textColor: "text-white",
      category: t('blogs.posts.future.category'),
    },
    {
      id: "productivity",
      title: t('blogs.posts.productivity.title'),
      description: t('blogs.posts.productivity.description'),
      image: "/api/placeholder/300/200",
      bgColor: "bg-gradient-to-br from-blue-300 to-purple-400",
      textColor: "text-white",
      category: t('blogs.posts.productivity.category'),
    },
    {
      id: "agentforce",
      title: t('blogs.posts.agentforce.title'),
      description: t('blogs.posts.agentforce.description'),
      image: "/api/placeholder/300/200",
      bgColor: "bg-gradient-to-br from-indigo-400 to-blue-500",
      textColor: "text-white",
      category: t('blogs.posts.agentforce.category'),
    },
    {
      id: "productivity-tips",
      title: t('blogs.posts.tips.title'),
      description: t('blogs.posts.tips.description'),
      image: "/api/placeholder/300/200",
      bgColor: "bg-gradient-to-br from-orange-300 to-red-400",
      textColor: "text-white",
      category: t('blogs.posts.tips.category'),
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000">
          <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
            {t('blogs.sectionTitle')}
          </p>
          <h2 className="text-5xl sm:text-7xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-tight tracking-tight">
            {t('blogs.title')}
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {blogPosts.map((post, index) => (
            <div
              key={post.id}
              className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000 group cursor-pointer"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                {/* Image/Visual Section */}
                <div
                  className={`${post.bgColor} h-48 relative flex items-center justify-center`}
                >
                  {/* Decorative Elements based on category */}
                  {post.category === "AI" && (
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* People illustration placeholder */}
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full"></div>
                        <div className="w-16 h-16 bg-white/30 rounded-full"></div>
                      </div>
                    </div>
                  )}

                  {post.category === "PRODUCTIVITY" && (
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* Robot/AI icons */}
                      <div className="grid grid-cols-3 gap-3">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 bg-white/20 rounded-lg"
                          ></div>
                        ))}
                      </div>
                    </div>
                  )}

                  {post.category === "INTEGRATION" && (
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* Interface mockup */}
                      <div className="w-32 h-20 bg-white/20 rounded-lg flex flex-col gap-2 p-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                        </div>
                        <div className="space-y-1">
                          <div className="h-1 bg-white/30 rounded w-full"></div>
                          <div className="h-1 bg-white/30 rounded w-3/4"></div>
                          <div className="h-1 bg-white/30 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {post.category === "TIPS" && (
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* Cards/tips illustration */}
                      <div className="relative">
                        <div className="w-16 h-20 bg-white/20 rounded-lg transform rotate-12"></div>
                        <div className="w-16 h-20 bg-white/30 rounded-lg absolute top-0 left-4 transform -rotate-6"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs font-semibold text-gray-500 mb-2 tracking-wide uppercase">
                    {post.category}
                  </div>

                  <h3 className="text-lg font-bold text-black mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                    {post.title}
                  </h3>

                  <div className="mt-auto">
                    <button className="inline-flex items-center text-sm font-medium text-black hover:text-purple-600 transition-colors duration-300 group">
                      READ MORE
                      <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default BlogsSection;