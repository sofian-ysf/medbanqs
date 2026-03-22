import { BlogPost, BlogGenerationPrompt } from '@/types/blog';
import { BlogStorage } from './storage';

const MEDICAL_SCHOOL_TOPICS = [
  { topic: "UKMLA Exam Preparation Guide", keywords: ["UKMLA", "UK medical licensing assessment", "medical finals", "exam preparation"] },
  { topic: "Step 1 Study Strategies", keywords: ["USMLE Step 1", "medical school exam", "study tips", "exam strategy"] },
  { topic: "Step 2 CK Clinical Knowledge", keywords: ["USMLE Step 2 CK", "clinical knowledge", "medical exam", "clinical skills"] },
  { topic: "Medical School Finals Success", keywords: ["medical finals", "final year medicine", "OSCE", "written exams"] },
  { topic: "Anatomy High-Yield Topics", keywords: ["anatomy", "medical school", "high yield", "exam topics"] },
  { topic: "Pharmacology for Medical Students", keywords: ["pharmacology", "drug mechanisms", "medical students", "exam preparation"] },
  { topic: "Clinical Skills Assessment", keywords: ["clinical skills", "OSCE", "practical exam", "medical assessment"] },
  { topic: "Pathology Review Questions", keywords: ["pathology", "disease mechanisms", "medical questions", "exam review"] },
  { topic: "Medical Ethics and Law", keywords: ["medical ethics", "medical law", "GMC guidelines", "patient consent"] },
  { topic: "Evidence-Based Medicine", keywords: ["EBM", "research methods", "clinical trials", "statistics"] },
  { topic: "Differential Diagnosis Approach", keywords: ["differential diagnosis", "clinical reasoning", "medical problem solving"] },
  { topic: "Emergency Medicine Essentials", keywords: ["emergency medicine", "acute care", "A&E", "urgent conditions"] },
  { topic: "Internal Medicine Review", keywords: ["internal medicine", "medicine revision", "core topics", "clinical medicine"] },
  { topic: "Surgery Core Concepts", keywords: ["surgery", "surgical principles", "operative techniques", "surgical finals"] },
  { topic: "Pediatrics Key Topics", keywords: ["pediatrics", "child health", "developmental milestones", "pediatric conditions"] },
  { topic: "Obstetrics and Gynecology", keywords: ["obstetrics", "gynecology", "women's health", "pregnancy", "OBGYN"] },
  { topic: "Psychiatry for Medical Students", keywords: ["psychiatry", "mental health", "psychiatric conditions", "mental state exam"] },
  { topic: "Radiology Interpretation", keywords: ["radiology", "X-ray interpretation", "CT scan", "MRI", "imaging"] },
  { topic: "Laboratory Values Guide", keywords: ["lab values", "blood tests", "normal ranges", "clinical biochemistry"] },
  { topic: "Medical History Taking", keywords: ["history taking", "patient consultation", "clinical communication", "SOCRATES"] }
];

export class BlogGenerator {
  private storage: BlogStorage;

  constructor() {
    this.storage = new BlogStorage();
  }

  async generateDailyBlog(): Promise<BlogPost | null> {
    try {
      const previousTopics = await this.storage.getPreviousTopics();
      const availableTopics = MEDICAL_SCHOOL_TOPICS.filter(
        t => !previousTopics.some(prev => 
          prev.toLowerCase().includes(t.topic.toLowerCase()) ||
          t.topic.toLowerCase().includes(prev.toLowerCase())
        )
      );

      if (availableTopics.length === 0) {
        console.log('All topics have been covered. Starting a new cycle with variations.');
        const randomTopic = MEDICAL_SCHOOL_TOPICS[Math.floor(Math.random() * MEDICAL_SCHOOL_TOPICS.length)];
        return await this.generateBlogContent({
          topic: `${randomTopic.topic} - Advanced Concepts`,
          keywords: [...randomTopic.keywords, "advanced", "in-depth"],
          targetAudience: "medical students and junior doctors",
          contentType: 'guide',
          previousTopics
        });
      }

      const selectedTopic = availableTopics[Math.floor(Math.random() * availableTopics.length)];
      
      const prompt: BlogGenerationPrompt = {
        topic: selectedTopic.topic,
        keywords: selectedTopic.keywords,
        targetAudience: "medical students preparing for exams",
        contentType: this.getRandomContentType(),
        previousTopics
      };

      return await this.generateBlogContent(prompt);
    } catch (error) {
      console.error('Error generating daily blog:', error);
      return null;
    }
  }

  private getRandomContentType(): BlogGenerationPrompt['contentType'] {
    const types: BlogGenerationPrompt['contentType'][] = ['educational', 'tips', 'guide', 'comparison'];
    return types[Math.floor(Math.random() * types.length)];
  }

  private async generateBlogContent(prompt: BlogGenerationPrompt): Promise<BlogPost> {
    const slug = this.createSlug(prompt.topic);
    const now = new Date().toISOString();
    
    const blog: BlogPost = {
      id: `blog-${Date.now()}`,
      slug,
      title: prompt.topic,
      description: `Comprehensive ${prompt.contentType} on ${prompt.topic} for ${prompt.targetAudience}. Master key concepts and ace your medical exams with MasterMLA.`,
      content: this.generateMockContent(prompt),
      author: "MasterMLA Team",
      publishedAt: now,
      category: this.categorizeByTopic(prompt.topic),
      tags: prompt.keywords,
      readingTime: Math.floor(Math.random() * 5) + 5,
      featured: Math.random() > 0.7,
      metaTitle: `${prompt.topic} | MasterMLA Medical Exam Prep`,
      metaDescription: `Expert guide on ${prompt.topic}. Prepare for UKMLA, USMLE, and medical finals with comprehensive study materials and practice questions.`,
      keywords: [...prompt.keywords, "medical exam", "study guide", "MasterMLA"],
      schema: this.generateSchema(prompt.topic, slug)
    };

    await this.storage.saveBlog(blog);
    return blog;
  }

  private createSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  private categorizeByTopic(topic: string): string {
    if (topic.toLowerCase().includes('ukmla') || topic.toLowerCase().includes('step')) {
      return 'Exam Preparation';
    } else if (topic.toLowerCase().includes('clinical')) {
      return 'Clinical Skills';
    } else if (topic.toLowerCase().includes('anatomy') || topic.toLowerCase().includes('pharmacology') || topic.toLowerCase().includes('pathology')) {
      return 'Basic Sciences';
    } else if (topic.toLowerCase().includes('surgery') || topic.toLowerCase().includes('medicine') || topic.toLowerCase().includes('pediatrics')) {
      return 'Clinical Specialties';
    } else {
      return 'Study Resources';
    }
  }

  private generateMockContent(prompt: BlogGenerationPrompt): string {
    return `
# ${prompt.topic}

## Introduction

Welcome to our comprehensive guide on ${prompt.topic}. This ${prompt.contentType} is designed specifically for ${prompt.targetAudience} to help you excel in your medical examinations.

## Key Learning Objectives

By the end of this article, you will:
- Understand the fundamental concepts of ${prompt.topic}
- Learn high-yield facts essential for exam success
- Master practical application through real-world examples
- Develop effective study strategies for this topic

## Core Concepts

${prompt.topic} is a crucial area that frequently appears in medical examinations. Understanding these concepts will not only help you pass your exams but also prepare you for clinical practice.

### Important Points to Remember

1. **Foundation Knowledge**: Building a strong foundation is essential for understanding complex medical concepts.
2. **Clinical Relevance**: Always connect theoretical knowledge to clinical scenarios.
3. **Practice Questions**: Regular practice with exam-style questions improves retention and application.

## High-Yield Facts

Here are the must-know facts for ${prompt.topic}:

- Key concept 1: Essential for understanding the basics
- Key concept 2: Frequently tested in examinations
- Key concept 3: Important for clinical correlation
- Key concept 4: Common pitfall to avoid

## Study Tips and Strategies

### Effective Learning Methods

1. **Active Recall**: Test yourself regularly without looking at notes
2. **Spaced Repetition**: Review material at increasing intervals
3. **Practice Questions**: Use MasterMLA's question bank for targeted practice
4. **Group Study**: Discuss complex topics with peers

### Time Management

- Allocate dedicated study time for ${prompt.topic}
- Break down complex topics into manageable chunks
- Use the Pomodoro technique for focused study sessions

## Common Exam Questions

Understanding the types of questions that appear in exams is crucial. For ${prompt.topic}, expect:

- Multiple choice questions testing factual knowledge
- Clinical vignettes requiring application of concepts
- Data interpretation questions
- Extended matching questions

## Clinical Applications

Understanding how ${prompt.topic} applies to real clinical scenarios is essential. Consider these practical applications:

- Patient assessment and diagnosis
- Treatment planning and management
- Recognizing red flags and complications
- Communicating with patients and colleagues

## Summary

Mastering ${prompt.topic} requires consistent effort and smart study strategies. Remember to:

- Focus on high-yield concepts
- Practice with exam-style questions
- Apply knowledge to clinical scenarios
- Review regularly using spaced repetition

## Next Steps

Ready to test your knowledge? Try our practice questions on ${prompt.topic} in the MasterMLA app. Track your progress and identify areas for improvement.

---

*Keywords: ${prompt.keywords.join(', ')}*
`;
  }

  private generateSchema(title: string, slug: string): any {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "author": {
        "@type": "Organization",
        "name": "MasterMLA"
      },
      "publisher": {
        "@type": "Organization",
        "name": "MasterMLA",
        "logo": {
          "@type": "ImageObject",
          "url": "https://mastermla.com/mastermla-logo.png"
        }
      },
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://mastermla.com/blog/${slug}`
      }
    };
  }
}

export async function generateBlogWithClaude(prompt: BlogGenerationPrompt): Promise<BlogPost> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not configured');
  }

  const systemPrompt = `You are an expert medical education content writer for MasterMLA. Create structured, educational blog posts for medical students preparing for UKMLA, USMLE, and finals.

CRITICAL: Use clear subsections with ### headings to break up content. Write 2-3 paragraph chunks under each subsection. NO bullet points - use prose format throughout.

Previous topics: ${prompt.previousTopics.slice(0, 5).join(', ')}`;

  const userPrompt = `Write a comprehensive, well-structured blog post about "${prompt.topic}" for ${prompt.targetAudience}.

Keywords: ${prompt.keywords.join(', ')}

Create a COMPLETE 2000-2500 word article following this exact structure:

## Introduction
Write 2-3 engaging paragraphs introducing the topic and its exam importance.

## Understanding the Fundamentals

### Basic Concepts and Definitions
2-3 paragraphs explaining core terminology and foundational knowledge.

### Pathophysiology and Mechanisms
2-3 paragraphs on disease processes, physiological mechanisms with specific examples.

### Clinical Significance
2 paragraphs connecting theory to real-world practice.

## High-Yield Information for Exams

### Must-Know Facts
2-3 paragraphs presenting essential facts within explanatory context. Include memory aids naturally.

### Common Presentations
2 paragraphs describing typical clinical presentations students will encounter.

### Key Investigations
2 paragraphs on relevant tests, their interpretation, and clinical correlation.

## Clinical Application

### Case Scenario
Present a detailed clinical case (1-2 paragraphs) relevant to the topic.

### Management Approach
2 paragraphs explaining evidence-based management of the case.

## Mastering Exam Questions

### Question Patterns
2 paragraphs on how this topic appears in exams.

### Avoiding Common Pitfalls
2 paragraphs on typical mistakes and how to avoid them.

## Effective Study Strategies

### Learning Techniques
2 paragraphs on specific methods to master this content.

### Resources and Practice
2 paragraphs on recommended materials and practice approaches.

## Summary
2 concise paragraphs reinforcing key points and encouraging students.

REQUIREMENTS:
- COMPLETE the entire article (no "continued" messages)
- Use ### for subsections to improve readability
- Write in clear, educational prose
- Include specific clinical examples
- Natural keyword integration
- Each subsection should stand alone as valuable content`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        temperature: 0.7,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.content[0].text;

    const titleMatch = content.match(/^#\s+(.+)$/m);
    const actualTitle = titleMatch ? titleMatch[1] : prompt.topic;

    const slug = actualTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const descriptionMatch = content.match(/##\s+Introduction\n\n(.+?)(?=\n\n)/s);
    const description = descriptionMatch 
      ? descriptionMatch[1].substring(0, 160) + '...'
      : `Comprehensive ${prompt.contentType} on ${actualTitle} for medical students.`;

    const blog: BlogPost = {
      id: `blog-${Date.now()}`,
      slug,
      title: actualTitle,
      description,
      content,
      author: "MasterMLA Team",
      publishedAt: new Date().toISOString(),
      category: categorizeByTopic(actualTitle),
      tags: prompt.keywords,
      readingTime: Math.ceil(content.split(/\s+/).length / 200),
      featured: Math.random() > 0.7,
      metaTitle: `${actualTitle} | MasterMLA Medical Exam Prep`,
      metaDescription: description,
      keywords: [...prompt.keywords, "medical exam", "study guide", "MasterMLA"],
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": actualTitle,
        "author": {
          "@type": "Organization",
          "name": "MasterMLA"
        },
        "publisher": {
          "@type": "Organization",
          "name": "MasterMLA",
          "logo": {
            "@type": "ImageObject",
            "url": "https://mastermla.com/mastermla-logo.png"
          }
        },
        "datePublished": new Date().toISOString(),
        "dateModified": new Date().toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://mastermla.com/blog/${slug}`
        }
      }
    };

    return blog;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

function categorizeByTopic(topic: string): string {
  const topicLower = topic.toLowerCase();
  
  if (topicLower.includes('ukmla') || topicLower.includes('step') || topicLower.includes('exam')) {
    return 'Exam Preparation';
  } else if (topicLower.includes('clinical') || topicLower.includes('skills')) {
    return 'Clinical Skills';
  } else if (topicLower.includes('anatomy') || topicLower.includes('pharmacology') || topicLower.includes('pathology') || topicLower.includes('physiology')) {
    return 'Basic Sciences';
  } else if (topicLower.includes('surgery') || topicLower.includes('medicine') || topicLower.includes('pediatrics') || topicLower.includes('psychiatry') || topicLower.includes('obstetrics')) {
    return 'Clinical Specialties';
  } else if (topicLower.includes('ethics') || topicLower.includes('law') || topicLower.includes('communication')) {
    return 'Professional Skills';
  } else {
    return 'Study Resources';
  }
}