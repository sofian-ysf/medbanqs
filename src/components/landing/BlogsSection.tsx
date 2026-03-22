"use client";

import React from "react";
import { useTranslation } from "@/contexts/TranslationContext";

const BlogsSection: React.FC = () => {
  const { t } = useTranslation();

  const posts = [
    {
      title: t("blogs.posts.future.title"),
      description: t("blogs.posts.future.description"),
      category: t("blogs.posts.future.category"),
    },
    {
      title: t("blogs.posts.productivity.title"),
      description: t("blogs.posts.productivity.description"),
      category: t("blogs.posts.productivity.category"),
    },
    {
      title: t("blogs.posts.agentforce.title"),
      description: t("blogs.posts.agentforce.description"),
      category: t("blogs.posts.agentforce.category"),
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="text-sm font-semibold text-purple-600 mb-2">
            {t("blogs.sectionTitle")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("blogs.title")}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div key={index} className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-100"></div>
              <div className="p-6">
                <div className="text-xs font-semibold text-purple-600 mb-2">
                  {post.category}
                </div>
                <h3 className="font-semibold mb-3">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;