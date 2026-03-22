"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  Language,
  detectRegionalLanguage,
  detectUserLanguage,
  saveLanguagePreference,
  LANGUAGES,
} from "@/utils/language";

// Translation dictionaries
export const translations = {
  en: {
    // Navigation
    nav: {
      howItWorks: "How it works",
      features: "Features",
      caseStudies: "Case Studies",
      pricing: "Pricing",
      talkToUs: "Schedule Demo",
      getStarted: "Get Started",
    },
    // Hero section
    hero: {
      announcement: "Test our AI Project Manager with @moccet in Slack →",
      title: "Build in days, not months",
      subtitle:
        "AI agents and world-class experts working together. Fixed pricing. 10x faster delivery. Join 500+ companies building better with Moccet.",
      tagline:
        "AI agents + human experts complete projects 10x faster and 70% cheaper",
      startBuilding: "Get Started",
      scheduleDemo: "Schedule Demo",
      trust: {
        noCredit: "No credit card required",
        socCompliant: "SOC 2 compliant",
        deploy: "Deploy in 24 hours",
      },
      mainTitle: {
        line1: "moccet",
        line2: "delivers",
        typewriterWords: ["faster", "smarter", "better"],
      },
    },
    // Process section
    process: {
      eyebrow: "The Process",
      title: "Six steps to transform",
      subtitle:
        "How we turn your vision into reality with AI-powered efficiency",
      steps: {
        research: {
          title: "AI Research & Strategy",
          description:
            "Share your idea. Our AI analyzes market data, competitor insights, and creates comprehensive technical briefs in minutes.",
          highlight: "comprehensive technical briefs in minutes",
        },
        pricing: {
          title: "Transparent Fixed Pricing",
          description:
            "Get instant quotes that include everything. Save 70% compared to traditional teams while getting better ROI.",
          highlight: "Save 70% compared to traditional teams",
        },
        match: {
          title: "Perfect Team Match",
          description:
            "Access world-class talent you couldn't hire directly. We match the best AI tools and human experts for your project.",
          highlight: "the best AI tools and human experts",
        },
        management: {
          title: "24/7 AI Management",
          description:
            "Experience seamless coordination. Test @moccet in Slack to see how AI transforms project management forever.",
          highlight: "Test @moccet in Slack",
        },
        optimization: {
          title: "Continuous Optimization",
          description:
            "AI Business Analyst maximizes ROI by analyzing real-time data. Get insights that drive exponential growth.",
          highlight: "drive exponential growth",
        },
        partnership: {
          title: "Long-term Partnership",
          description:
            "Machine learning builds your unique profile. Each project gets smarter, making us your growth partner, not a vendor.",
          highlight: "your growth partner, not a vendor",
        },
      },
      demo: {
        title: "Experience the magic yourself",
        subtitle:
          "Add @moccet to Slack and see AI project management in action",
        button: "Add to Slack",
      },
    },
    // CTA section
    cta: {
      title: "Ready to build something extraordinary?",
      subtitle: "Join thousands of teams building with moccet",
      startProject: "Start Your Project",
      talkToExpert: "Talk to an expert",
    },
    // Features section
    features: {
      eyebrow: "Features",
      title: "A complete platform for building with AI and Experts",
      subtitle:
        "Everything you need to turn your vision into reality, delivered at unprecedented speed.",
      hubLabel: "Powered by AI & Experts",
      smartCoordination: {
        title: "Smart Coordination Engine",
        description:
          "Our AI system analyzes your project goals and assembles the perfect team of AI agents and human experts.",
      },
      realtimeDashboard: {
        title: "Real-time Dashboard",
        description:
          "Get complete visibility into progress, resources, and timeline with our interactive project dashboard.",
      },
      outcomeBasedPricing: {
        title: "Outcome-based Pricing",
        description:
          "Pay only for results, not for hours. Our fixed pricing model means no surprise costs or overruns.",
      },
      expertNetwork: {
        title: "Expert Network",
        description:
          "Access our global network of vetted AI specialists, developers, designers, and project managers.",
      },
      enterpriseSolutions: {
        title: "Enterprise Solutions",
        description:
          "Custom solutions for businesses of all sizes with enterprise-grade security and compliance built in.",
      },
      seamlessIntegrations: {
        title: "Seamless Integrations",
        description:
          "Integrate with your existing tools and workflows for a smooth, efficient development process.",
      },
    },
    // Seamless section
    seamless: {
      secretSauce: {
        badge: "OUR SECRET SAUCE",
        title: "AI meets human expertise",
        description:
          "Our Coordination Engine analyzes your project goals and assembles the ideal team of AI agents and human experts from our global network to deliver projects at unprecedented speed and quality.",
        metric: "10×",
        metricLabel:
          "faster project completion compared to traditional agencies and freelancers",
      },
      briefGenerator: {
        badge: "COMPLETE TRANSPARENCY",
        title: "AI-powered brief generation",
        description:
          "Our intelligent brief generator uses AI to create project briefs that capture every detail, saving hours of back-and-forth communication.",
        metric: "90%",
        metricLabel:
          "reduction in project scoping time with AI-generated briefs",
      },
      pricing: {
        badge: "FIXED OUTCOME PRICING",
        title: "Pay for results, not for hours",
        description:
          "Our fixed outcome-based pricing means we're incentivized to make AI better, not bill more hours. Know exactly what you'll pay. No surprise costs.",
        metric: "48 hrs",
        metricLabel:
          "average delivery time for projects that typically take weeks",
      },
      stats: {
        badge: "PROVEN RESULTS",
        title: "We're in the business of growing businesses",
        description:
          "Our platform helps companies of all sizes deliver projects faster and more efficiently, allowing them to focus on what matters most—their core business.",
        metric: "100%",
        metricLabel:
          "client satisfaction on delivered projects across all industries",
      },
      qualityObsession: {
        badge: "QUALITY OBSESSION",
        title: "Quality + Quantity",
        description:
          "Every line of code, every pixel, every decision benefits from both cutting-edge AI and years of human expertise. Quality isn't just checked—it's built in from day one.",
        features: [
          "Human experts review critical paths",
          "Security-first architecture always",
          "Documentation that actually helps",
        ],
        metric: "98.5%",
        metricLabel:
          "average code coverage across all projects with zero security vulnerabilities",
      },
    },
    // Showcases section
    showcases: {
      sectionTitle: "Showcases",
      title: "moccet in action",
      subtitle:
        "See our AI agents and human experts in action across different industries and use cases",
      subtitleMobile: "AI agents in action across industries",
      healthcare: {
        title: "Healthcare AI Team",
        description:
          "AI agents and clinical experts building HIPAA-compliant systems with real-time patient data integration",
        mobileDescription: "HIPAA-compliant healthcare systems",
        category: "Healthcare Technology",
        hipaaCompliant: "HIPAA Compliant",
        realtimeData: "Real-time patient data",
      },
      businessAnalyst: {
        title: "AI Business Analyst",
        description:
          "Real-time revenue analytics and growth insights powered by machine learning algorithms",
        mobileDescription: "AI-powered business analytics",
        category: "Business Intelligence",
        liveAnalytics: "Live Analytics",
        aiPoweredInsights: "AI-powered insights",
      },
      alwaysLearning: {
        title: "Always learning",
        description:
          "Learn and adapt continuously, expanding knowledge and maximizing performance with every interaction",
        mobileDescription: "Adaptive AI that learns continuously",
        category: "Adaptive Intelligence",
      },
      autonomous: {
        title: "Autonomous Intelligence",
        description:
          "Intelligent, proactive AI that thinks ahead without user input in operational decisions",
        mobileDescription: "Autonomous decision-making AI",
        category: "Autonomous Systems",
      },
      hoverToSeeDemo: "Hover to see live demo",
      loadingDemo: "Loading demo...",
      ctaText: "Ready to see how AI agents can transform your business?",
      ctaTextMobile: "Transform your business with AI?",
      requestCustomDemo: "Request Custom Demo",
      requestDemoMobile: "Request Demo",
    },
    // Case Studies section
    caseStudies: {
      sectionTitle: "Success Stories",
      title: "The most innovative companies use AI to accelerate with moccet",
      subtitle:
        "Real projects, real results. See how we're transforming businesses with AI-powered teams.",
      deliveryTime: "Delivery time",
      costSavings: "Cost savings",
      techflow: {
        title: "TechFlow",
        subtitle: "AI customer support automation",
        description:
          "Revolutionized customer service with AI agents that achieved 98% customer satisfaction",
        mobileDescription: "98% customer satisfaction with AI support",
        category: "Customer Support",
      },
      healthvault: {
        title: "HealthVault",
        subtitle: "HIPAA-compliant patient management",
        description:
          "Built a comprehensive healthcare platform that streamlines patient data management",
        mobileDescription: "HIPAA-compliant patient management system",
        category: "Healthcare",
      },
      tradepro: {
        title: "TradePro",
        subtitle: "Real-time trading analytics platform",
        description:
          "Transformed trading operations with AI-powered analytics and automated decision making",
        mobileDescription: "AI-powered trading analytics platform",
        category: "Fintech",
      },
      retailmax: {
        title: "RetailMax",
        subtitle: "AI e-commerce recommendations",
        description:
          "Created a comprehensive e-commerce solution with personalized AI recommendations",
        mobileDescription: "AI-powered e-commerce platform",
        category: "E-commerce",
      },
      cta: {
        title: "Create your success story now",
        subtitle:
          "Join innovative companies using AI to accelerate their growth. Get started today and see results within days.",
        startProject: "Start Your Project",
        viewAll: "View All Case Studies",
      },
    },
    // Target Audience section
    targetAudience: {
      sectionTitle: "Fit for all",
      title: "The right solution for your business",
      subtitle:
        "Whether you're a VC-backed startup, small business, or enterprise, Moccet helps you deliver software projects faster and more efficiently.",
      startups: {
        title: "VC-Backed Startups",
        description:
          "Move fast and make the most of your runway with our rapid development capabilities.",
        features: [
          "MVP development in days not months",
          "Extend runway with 70% cost savings",
          "Iterate based on market feedback",
          "Scale tech with your business growth",
        ],
      },
      smallBusinesses: {
        title: "Small Businesses",
        description:
          "Finally integrate AI and access world-class talent without the enterprise price tag or technical complexity.",
        features: [
          "AI integration without technical complexity",
          "Access to global top-tier tech talent",
          "Predictable fixed pricing",
          "No need to hire in-house tech teams",
        ],
      },
      enterprises: {
        title: "Enterprises",
        description:
          "Accelerate digital transformation and innovation with our AI-powered approach.",
        features: [
          "Rapid prototyping and delivery",
          "Reduce IT backlog dramatically",
          "Enterprise-grade security and compliance",
          "Seamless integration with existing systems",
        ],
      },
    },
    // Blogs section
    blogs: {
      sectionTitle: "Blogs",
      title: "Your moccet deep dive starts here.",
      posts: {
        future: {
          title: "Ready for the future of AI with moccet?",
          description:
            "Explore how artificial intelligence is reshaping modern business operations and what it means for the next decade.",
          category: "AI",
        },
        productivity: {
          title: "Unlock agentic productivity for every employee",
          description:
            "A comprehensive guide to developing AI-powered solutions while maintaining productivity standards.",
          category: "PRODUCTIVITY",
        },
        agentforce: {
          title: "Agentforce 2.0: Agentforce arrives",
          description:
            "How we helped companies integrate AI agents directly into their Slack workflows for better collaboration.",
          category: "INTEGRATION",
        },
        tips: {
          title: "Top moccet tips to boost productivity",
          description:
            "Learn the strategies and tools we use to dramatically improve team productivity without compromising quality.",
          category: "TIPS",
        },
      },
    },
    // Footer
    footer: {
      tagline:
        "AI agents and world-class experts working together to transform your ideas into reality. Build anything, 10x faster.",
      sections: {
        product: {
          title: "Product",
          links: {
            howItWorks: "How it works",
            features: "Features",
            pricing: "Pricing",
            aiTools: "AI Tools",
            roadmap: "Roadmap",
          },
        },
        solutions: {
          title: "Solutions",
          links: {
            forStartups: "For Startups",
            forSmbs: "For SMBs",
            forEnterprise: "For Enterprise",
            forAgencies: "For Agencies",
            forDevelopers: "For Developers",
          },
        },
        resources: {
          title: "Resources",
          links: {
            documentation: "Documentation",
            apiReference: "API Reference",
            caseStudies: "Case Studies",
            blog: "Blog",
            supportCenter: "Support Center",
          },
        },
        company: {
          title: "Company",
          links: {
            aboutUs: "About Us",
            careers: "Careers",
            partners: "Partners",
            contact: "Contact",
            pressKit: "Press Kit",
          },
        },
      },
      legal: {
        copyright: "© 2024 Moccet, Inc. All rights reserved.",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        security: "Security",
        gdpr: "GDPR",
      },
    },
  },
  es: {
    // Navigation
    nav: {
      howItWorks: "Cómo funciona",
      features: "Características",
      caseStudies: "Casos de Estudio",
      pricing: "Precios",
      talkToUs: "Hablar con nosotros",
      getStarted: "Comenzar",
    },
    // Hero section
    hero: {
      announcement:
        "Prueba nuestro Gestor de Proyectos AI con @moccet en Slack →",
      title: "Construye en días, no meses",
      subtitle:
        "Agentes de IA y expertos de clase mundial trabajando juntos. Precios fijos. Entrega 10x más rápida. Únete a más de 500 empresas construyendo mejor con Moccet.",
      tagline:
        "Agentes de IA + expertos humanos completan proyectos 10x más rápido y 70% más barato",
      startBuilding: "Comenzar a Construir Gratis",
      scheduleDemo: "Programar Demo",
      trust: {
        noCredit: "No se requiere tarjeta de crédito",
        socCompliant: "Cumple con SOC 2",
        deploy: "Despliega en 24 horas",
      },
      mainTitle: {
        line1: "moccet",
        line2: "entrega",
        typewriterWords: ["más rápido", "más inteligente", "mejor"],
      },
    },
    // Process section
    process: {
      eyebrow: "El Proceso",
      title: "Seis pasos para transformar",
      subtitle:
        "Cómo convertimos tu visión en realidad con eficiencia impulsada por IA",
      steps: {
        research: {
          title: "Investigación y Estrategia de IA",
          description:
            "Comparte tu idea. Nuestra IA analiza datos de mercado, perspectivas de competidores y crea informes técnicos completos en minutos.",
          highlight: "informes técnicos completos en minutos",
        },
        pricing: {
          title: "Precios Fijos Transparentes",
          description:
            "Obtén cotizaciones instantáneas que incluyen todo. Ahorra 70% comparado con equipos tradicionales mientras obtienes mejor ROI.",
          highlight: "Ahorra 70% comparado con equipos tradicionales",
        },
        match: {
          title: "Emparejamiento Perfecto de Equipo",
          description:
            "Accede a talento de clase mundial que no podrías contratar directamente. Emparejamos las mejores herramientas de IA y expertos humanos para tu proyecto.",
          highlight: "las mejores herramientas de IA y expertos humanos",
        },
        management: {
          title: "Gestión de IA 24/7",
          description:
            "Experimenta coordinación sin problemas. Prueba @moccet en Slack para ver cómo la IA transforma la gestión de proyectos para siempre.",
          highlight: "Prueba @moccet en Slack",
        },
        optimization: {
          title: "Optimización Continua",
          description:
            "El Analista de Negocios IA maximiza el ROI analizando datos en tiempo real. Obtén perspectivas que impulsan el crecimiento exponencial.",
          highlight: "impulsan el crecimiento exponencial",
        },
        partnership: {
          title: "Asociación a Largo Plazo",
          description:
            "El aprendizaje automático construye tu perfil único. Cada proyecto se vuelve más inteligente, convirtiéndonos en tu socio de crecimiento, no un proveedor.",
          highlight: "tu socio de crecimiento, no un proveedor",
        },
      },
      demo: {
        title: "Experimenta la magia tú mismo",
        subtitle:
          "Agrega @moccet a Slack y ve la gestión de proyectos IA en acción",
        button: "Agregar a Slack",
      },
    },
    // CTA section
    cta: {
      title: "¿Listo para construir algo extraordinario?",
      subtitle: "Únete a miles de equipos construyendo con moccet",
      startProject: "Iniciar Tu Proyecto",
      talkToExpert: "Hablar con un experto",
    },
    // Features section
    features: {
      eyebrow: "Características",
      title: "Una plataforma completa para construir con IA y Expertos",
      subtitle:
        "Todo lo que necesitas para convertir tu visión en realidad, entregado a una velocidad sin precedentes.",
      hubLabel: "Impulsado por IA y Expertos",
      smartCoordination: {
        title: "Motor de Coordinación Inteligente",
        description:
          "Nuestro sistema de IA analiza los objetivos de tu proyecto y reúne el equipo perfecto de agentes de IA y expertos humanos.",
      },
      realtimeDashboard: {
        title: "Panel de Control en Tiempo Real",
        description:
          "Obtén visibilidad completa del progreso, recursos y cronograma con nuestro panel de proyecto interactivo.",
      },
      outcomeBasedPricing: {
        title: "Precios Basados en Resultados",
        description:
          "Paga solo por resultados, no por horas. Nuestro modelo de precios fijos significa que no hay costos sorpresa ni sobrecostos.",
      },
      expertNetwork: {
        title: "Red de Expertos",
        description:
          "Accede a nuestra red global de especialistas en IA, desarrolladores, diseñadores y gerentes de proyecto verificados.",
      },
      enterpriseSolutions: {
        title: "Soluciones Empresariales",
        description:
          "Soluciones personalizadas para empresas de todos los tamaños con seguridad y cumplimiento de nivel empresarial integrados.",
      },
      seamlessIntegrations: {
        title: "Integraciones Perfectas",
        description:
          "Integra con tus herramientas y flujos de trabajo existentes para un proceso de desarrollo fluido y eficiente.",
      },
    },
    // Seamless section
    seamless: {
      secretSauce: {
        badge: "NUESTRA SALSA SECRETA",
        title: "La IA se encuentra con la experiencia humana",
        description:
          "Nuestro Motor de Coordinación analiza los objetivos de tu proyecto y reúne el equipo ideal de agentes de IA y expertos humanos de nuestra red global para entregar proyectos a una velocidad y calidad sin precedentes.",
        metric: "10×",
        metricLabel:
          "finalización de proyectos más rápida comparada con agencias tradicionales y freelancers",
      },
      briefGenerator: {
        badge: "TRANSPARENCIA COMPLETA",
        title: "Generación de resúmenes impulsada por IA",
        description:
          "Nuestro generador de resúmenes inteligente usa IA para crear resúmenes de proyecto que capturan cada detalle, ahorrando horas de comunicación de ida y vuelta.",
        metric: "90%",
        metricLabel:
          "reducción en el tiempo de definición del alcance del proyecto con resúmenes generados por IA",
      },
      pricing: {
        badge: "PRECIOS FIJOS POR RESULTADOS",
        title: "Paga por resultados, no por horas",
        description:
          "Nuestros precios fijos basados en resultados significan que estamos incentivados para hacer la IA mejor, no para facturar más horas. Sabe exactamente lo que pagarás. Sin costos sorpresa.",
        metric: "48 hrs",
        metricLabel:
          "tiempo promedio de entrega para proyectos que típicamente toman semanas",
      },
      stats: {
        badge: "RESULTADOS COMPROBADOS",
        title: "Estamos en el negocio de hacer crecer negocios",
        description:
          "Nuestra plataforma ayuda a empresas de todos los tamaños a entregar proyectos más rápido y eficientemente, permitiéndoles enfocarse en lo que más importa: su negocio principal.",
        metric: "100%",
        metricLabel:
          "satisfacción del cliente en proyectos entregados en todas las industrias",
      },
      qualityObsession: {
        badge: "OBSESIÓN POR LA CALIDAD",
        title: "Calidad + Cantidad",
        description:
          "Cada línea de código, cada píxel, cada decisión se beneficia tanto de la IA de vanguardia como de años de experiencia humana. La calidad no solo se verifica, está integrada desde el primer día.",
        features: [
          "Los expertos humanos revisan las rutas críticas",
          "Arquitectura de seguridad primero siempre",
          "Documentación que realmente ayuda",
        ],
        metric: "98.5%",
        metricLabel:
          "cobertura de código promedio en todos los proyectos con cero vulnerabilidades de seguridad",
      },
    },
    // Showcases section
    showcases: {
      sectionTitle: "Demostraciones",
      title: "moccet en acción",
      subtitle:
        "Ve a nuestros agentes de IA y expertos humanos en acción en diferentes industrias y casos de uso",
      subtitleMobile: "Agentes de IA en acción en todas las industrias",
      healthcare: {
        title: "Equipo de IA para Salud",
        description:
          "Agentes de IA y expertos clínicos construyendo sistemas compatibles con HIPAA con integración de datos de pacientes en tiempo real",
        mobileDescription: "Sistemas de salud compatibles con HIPAA",
        category: "Tecnología de la Salud",
        hipaaCompliant: "Compatible con HIPAA",
        realtimeData: "Datos de pacientes en tiempo real",
      },
      businessAnalyst: {
        title: "Analista de Negocios IA",
        description:
          "Análisis de ingresos en tiempo real e insights de crecimiento impulsados por algoritmos de aprendizaje automático",
        mobileDescription: "Análisis de negocios impulsado por IA",
        category: "Inteligencia de Negocios",
        liveAnalytics: "Análisis en Vivo",
        aiPoweredInsights: "Insights impulsados por IA",
      },
      alwaysLearning: {
        title: "Siempre aprendiendo",
        description:
          "Aprende y se adapta continuamente, expandiendo el conocimiento y maximizando el rendimiento con cada interacción",
        mobileDescription: "IA adaptativa que aprende continuamente",
        category: "Inteligencia Adaptativa",
      },
      autonomous: {
        title: "Inteligencia Autónoma",
        description:
          "IA inteligente y proactiva que piensa por adelantado sin entrada del usuario en decisiones operativas",
        mobileDescription: "IA de toma de decisiones autónoma",
        category: "Sistemas Autónomos",
      },
      hoverToSeeDemo: "Pasa el cursor para ver la demostración en vivo",
      loadingDemo: "Cargando demostración...",
      ctaText:
        "¿Listo para ver cómo los agentes de IA pueden transformar tu negocio?",
      ctaTextMobile: "¿Transformar tu negocio con IA?",
      requestCustomDemo: "Solicitar Demostración Personalizada",
      requestDemoMobile: "Solicitar Demo",
    },
    // Case Studies section
    caseStudies: {
      sectionTitle: "Historias de Éxito",
      title: "Las empresas más innovadoras usan IA para acelerar con moccet",
      subtitle:
        "Proyectos reales, resultados reales. Ve cómo estamos transformando negocios con equipos impulsados por IA.",
      deliveryTime: "Tiempo de entrega",
      costSavings: "Ahorro de costos",
      techflow: {
        title: "TechFlow",
        subtitle: "Automatización de soporte al cliente con IA",
        description:
          "Revolucionó el servicio al cliente con agentes de IA que lograron 98% de satisfacción del cliente",
        mobileDescription: "98% de satisfacción del cliente con soporte de IA",
        category: "Soporte al Cliente",
      },
      healthvault: {
        title: "HealthVault",
        subtitle: "Gestión de pacientes compatible con HIPAA",
        description:
          "Construyó una plataforma integral de atención médica que optimiza la gestión de datos de pacientes",
        mobileDescription:
          "Sistema de gestión de pacientes compatible con HIPAA",
        category: "Salud",
      },
      tradepro: {
        title: "TradePro",
        subtitle: "Plataforma de análisis de trading en tiempo real",
        description:
          "Transformó las operaciones de trading con análisis impulsado por IA y toma de decisiones automatizada",
        mobileDescription: "Plataforma de análisis de trading impulsada por IA",
        category: "Fintech",
      },
      retailmax: {
        title: "RetailMax",
        subtitle: "Recomendaciones de comercio electrónico con IA",
        description:
          "Creó una solución integral de comercio electrónico con recomendaciones personalizadas de IA",
        mobileDescription:
          "Plataforma de comercio electrónico impulsada por IA",
        category: "Comercio electrónico",
      },
      cta: {
        title: "Crea tu historia de éxito ahora",
        subtitle:
          "Únete a empresas innovadoras que usan IA para acelerar su crecimiento. Comienza hoy y ve resultados en días.",
        startProject: "Iniciar Tu Proyecto",
        viewAll: "Ver Todos los Casos de Estudio",
      },
    },
    // Target Audience section
    targetAudience: {
      sectionTitle: "Apto para todos",
      title: "La solución adecuada para tu negocio",
      subtitle:
        "Ya seas una startup respaldada por VC, una pequeña empresa o una empresa, Moccet te ayuda a entregar proyectos de software más rápido y eficientemente.",
      startups: {
        title: "Startups Respaldadas por VC",
        description:
          "Muévete rápido y aprovecha al máximo tu capital con nuestras capacidades de desarrollo rápido.",
        features: [
          "Desarrollo de MVP en días, no meses",
          "Extiende tu capital con 70% de ahorro en costos",
          "Itera basándote en comentarios del mercado",
          "Escala la tecnología con el crecimiento de tu negocio",
        ],
      },
      smallBusinesses: {
        title: "Pequeñas Empresas",
        description:
          "Finalmente integra IA y accede a talento de clase mundial sin el precio empresarial o la complejidad técnica.",
        features: [
          "Integración de IA sin complejidad técnica",
          "Acceso a talento tecnológico global de primer nivel",
          "Precios fijos predecibles",
          "No necesitas contratar equipos técnicos internos",
        ],
      },
      enterprises: {
        title: "Empresas",
        description:
          "Acelera la transformación digital y la innovación con nuestro enfoque impulsado por IA.",
        features: [
          "Prototipado y entrega rápidos",
          "Reduce drásticamente el backlog de TI",
          "Seguridad y cumplimiento de nivel empresarial",
          "Integración perfecta con sistemas existentes",
        ],
      },
    },
    // Blogs section
    blogs: {
      sectionTitle: "Blogs",
      title: "Tu inmersión profunda en moccet comienza aquí.",
      posts: {
        future: {
          title: "¿Listo para el futuro de la IA con moccet?",
          description:
            "Explora cómo la inteligencia artificial está remodelando las operaciones comerciales modernas y lo que significa para la próxima década.",
          category: "IA",
        },
        productivity: {
          title: "Desbloquea la productividad agéntica para cada empleado",
          description:
            "Una guía completa para desarrollar soluciones impulsadas por IA mientras se mantienen los estándares de productividad.",
          category: "PRODUCTIVIDAD",
        },
        agentforce: {
          title: "Agentforce 2.0: Llega Agentforce",
          description:
            "Cómo ayudamos a las empresas a integrar agentes de IA directamente en sus flujos de trabajo de Slack para una mejor colaboración.",
          category: "INTEGRACIÓN",
        },
        tips: {
          title:
            "Los mejores consejos de moccet para aumentar la productividad",
          description:
            "Aprende las estrategias y herramientas que usamos para mejorar drásticamente la productividad del equipo sin comprometer la calidad.",
          category: "CONSEJOS",
        },
      },
    },
    // Footer
    footer: {
      tagline:
        "Agentes de IA y expertos de clase mundial trabajando juntos para transformar tus ideas en realidad. Construye cualquier cosa, 10 veces más rápido.",
      sections: {
        product: {
          title: "Producto",
          links: {
            howItWorks: "Cómo funciona",
            features: "Características",
            pricing: "Precios",
            aiTools: "Herramientas de IA",
            roadmap: "Hoja de ruta",
          },
        },
        solutions: {
          title: "Soluciones",
          links: {
            forStartups: "Para Startups",
            forSmbs: "Para PyMEs",
            forEnterprise: "Para Empresas",
            forAgencies: "Para Agencias",
            forDevelopers: "Para Desarrolladores",
          },
        },
        resources: {
          title: "Recursos",
          links: {
            documentation: "Documentación",
            apiReference: "Referencia API",
            caseStudies: "Casos de Estudio",
            blog: "Blog",
            supportCenter: "Centro de Soporte",
          },
        },
        company: {
          title: "Empresa",
          links: {
            aboutUs: "Acerca de Nosotros",
            careers: "Carreras",
            partners: "Socios",
            contact: "Contacto",
            pressKit: "Kit de Prensa",
          },
        },
      },
      legal: {
        copyright: "© 2024 Moccet, Inc. Todos los derechos reservados.",
        privacy: "Política de Privacidad",
        terms: "Términos de Servicio",
        security: "Seguridad",
        gdpr: "GDPR",
      },
    },
  },
  fr: {
    // Navigation
    nav: {
      howItWorks: "Comment ça marche",
      features: "Fonctionnalités",
      caseStudies: "Études de Cas",
      pricing: "Tarifs",
      talkToUs: "Nous parler",
      getStarted: "Commencer",
    },
    // Hero section
    hero: {
      announcement:
        "Testez notre Gestionnaire de Projet IA avec @moccet dans Slack →",
      title: "Construisez en jours, pas en mois",
      subtitle:
        "Agents IA et experts de classe mondiale travaillant ensemble. Prix fixe. Livraison 10x plus rapide. Rejoignez plus de 500 entreprises construisant mieux avec Moccet.",
      tagline:
        "Agents IA + experts humains complètent les projets 10x plus vite et 70% moins cher",
      startBuilding: "Commencer à Construire Gratuitement",
      scheduleDemo: "Programmer une Démo",
      trust: {
        noCredit: "Aucune carte de crédit requise",
        socCompliant: "Conforme SOC 2",
        deploy: "Déployer en 24 heures",
      },
      mainTitle: {
        line1: "moccet",
        line2: "livre",
        typewriterWords: ["plus vite", "plus intelligent", "mieux"],
      },
    },
    // Process section
    process: {
      eyebrow: "Le Processus",
      title: "Six étapes pour transformer",
      subtitle:
        "Comment nous transformons votre vision en réalité avec l'efficacité alimentée par l'IA",
      steps: {
        research: {
          title: "Recherche et Stratégie IA",
          description:
            "Partagez votre idée. Notre IA analyse les données de marché, les perspectives des concurrents et crée des briefs techniques complets en quelques minutes.",
          highlight: "briefs techniques complets en quelques minutes",
        },
        pricing: {
          title: "Tarification Fixe Transparente",
          description:
            "Obtenez des devis instantanés qui incluent tout. Économisez 70% par rapport aux équipes traditionnelles tout en obtenant un meilleur ROI.",
          highlight: "Économisez 70% par rapport aux équipes traditionnelles",
        },
        match: {
          title: "Correspondance d'Équipe Parfaite",
          description:
            "Accédez à des talents de classe mondiale que vous ne pourriez pas embaucher directement. Nous associons les meilleurs outils IA et experts humains pour votre projet.",
          highlight: "les meilleurs outils IA et experts humains",
        },
        management: {
          title: "Gestion IA 24/7",
          description:
            "Vivez une coordination sans faille. Testez @moccet dans Slack pour voir comment l'IA transforme la gestion de projet pour toujours.",
          highlight: "Testez @moccet dans Slack",
        },
        optimization: {
          title: "Optimisation Continue",
          description:
            "L'Analyste d'Affaires IA maximise le ROI en analysant les données en temps réel. Obtenez des insights qui stimulent la croissance exponentielle.",
          highlight: "stimulent la croissance exponentielle",
        },
        partnership: {
          title: "Partenariat à Long Terme",
          description:
            "L'apprentissage automatique construit votre profil unique. Chaque projet devient plus intelligent, faisant de nous votre partenaire de croissance, pas un fournisseur.",
          highlight: "votre partenaire de croissance, pas un fournisseur",
        },
      },
      demo: {
        title: "Vivez la magie vous-même",
        subtitle:
          "Ajoutez @moccet à Slack et voyez la gestion de projet IA en action",
        button: "Ajouter à Slack",
      },
    },
    // CTA section
    cta: {
      title: "Prêt à construire quelque chose d'extraordinaire?",
      subtitle: "Rejoignez des milliers d'équipes construisant avec moccet",
      startProject: "Démarrer Votre Projet",
      talkToExpert: "Parler à un expert",
    },
    // Features section
    features: {
      eyebrow: "Fonctionnalités",
      title: "Une plateforme complète pour construire avec l'IA et les Experts",
      subtitle:
        "Tout ce dont vous avez besoin pour transformer votre vision en réalité, livré à une vitesse sans précédent.",
      hubLabel: "Alimenté par l'IA et les Experts",
      smartCoordination: {
        title: "Moteur de Coordination Intelligent",
        description:
          "Notre système d'IA analyse les objectifs de votre projet et assemble l'équipe parfaite d'agents IA et d'experts humains.",
      },
      realtimeDashboard: {
        title: "Tableau de Bord en Temps Réel",
        description:
          "Obtenez une visibilité complète sur les progrès, les ressources et le calendrier avec notre tableau de bord de projet interactif.",
      },
      outcomeBasedPricing: {
        title: "Tarification Basée sur les Résultats",
        description:
          "Payez uniquement pour les résultats, pas pour les heures. Notre modèle de tarification fixe signifie pas de coûts surprises ou de dépassements.",
      },
      expertNetwork: {
        title: "Réseau d'Experts",
        description:
          "Accédez à notre réseau mondial de spécialistes IA, développeurs, designers et chefs de projet vérifiés.",
      },
      enterpriseSolutions: {
        title: "Solutions d'Entreprise",
        description:
          "Solutions personnalisées pour les entreprises de toutes tailles avec sécurité et conformité de niveau entreprise intégrées.",
      },
      seamlessIntegrations: {
        title: "Intégrations Transparentes",
        description:
          "Intégrez avec vos outils et flux de travail existants pour un processus de développement fluide et efficace.",
      },
    },
    // Seamless section
    seamless: {
      secretSauce: {
        badge: "NOTRE SAUCE SECRÈTE",
        title: "L'IA rencontre l'expertise humaine",
        description:
          "Notre Moteur de Coordination analyse les objectifs de votre projet et assemble l'équipe idéale d'agents IA et d'experts humains de notre réseau mondial pour livrer des projets à une vitesse et une qualité sans précédent.",
        metric: "10×",
        metricLabel:
          "achèvement de projet plus rapide par rapport aux agences traditionnelles et freelances",
      },
      briefGenerator: {
        badge: "TRANSPARENCE COMPLÈTE",
        title: "Génération de briefs alimentée par l'IA",
        description:
          "Notre générateur de briefs intelligent utilise l'IA pour créer des briefs de projet qui capturent chaque détail, économisant des heures de communication aller-retour.",
        metric: "90%",
        metricLabel:
          "réduction du temps de définition du projet avec des briefs générés par l'IA",
      },
      pricing: {
        badge: "TARIFICATION FIXE PAR RÉSULTATS",
        title: "Payez pour les résultats, pas pour les heures",
        description:
          "Notre tarification fixe basée sur les résultats signifie que nous sommes incités à améliorer l'IA, pas à facturer plus d'heures. Sachez exactement ce que vous paierez. Pas de coûts surprises.",
        metric: "48 hrs",
        metricLabel:
          "temps de livraison moyen pour des projets qui prennent généralement des semaines",
      },
      stats: {
        badge: "RÉSULTATS PROUVÉS",
        title: "Nous sommes dans le business de faire grandir les entreprises",
        description:
          "Notre plateforme aide les entreprises de toutes tailles à livrer des projets plus rapidement et plus efficacement, leur permettant de se concentrer sur ce qui compte le plus - leur cœur de métier.",
        metric: "100%",
        metricLabel:
          "satisfaction client sur les projets livrés dans toutes les industries",
      },
      qualityObsession: {
        badge: "OBSESSION DE LA QUALITÉ",
        title: "Qualité + Quantité",
        description:
          "Chaque ligne de code, chaque pixel, chaque décision bénéficie à la fois de l'IA de pointe et d'années d'expertise humaine. La qualité n'est pas seulement vérifiée - elle est intégrée dès le premier jour.",
        features: [
          "Les experts humains examinent les chemins critiques",
          "Architecture sécurité d'abord toujours",
          "Documentation qui aide vraiment",
        ],
        metric: "98.5%",
        metricLabel:
          "couverture de code moyenne sur tous les projets avec zéro vulnérabilité de sécurité",
      },
    },
    // Showcases section
    showcases: {
      sectionTitle: "Vitrines",
      title: "moccet en action",
      subtitle:
        "Voyez nos agents IA et experts humains en action dans différentes industries et cas d'usage",
      subtitleMobile: "Agents IA en action dans toutes les industries",
      healthcare: {
        title: "Équipe IA Santé",
        description:
          "Agents IA et experts cliniques construisant des systèmes conformes HIPAA avec intégration de données patients en temps réel",
        mobileDescription: "Systèmes de santé conformes HIPAA",
        category: "Technologie de la Santé",
        hipaaCompliant: "Conforme HIPAA",
        realtimeData: "Données patients en temps réel",
      },
      businessAnalyst: {
        title: "Analyste d'Affaires IA",
        description:
          "Analyses de revenus en temps réel et insights de croissance alimentés par des algorithmes d'apprentissage automatique",
        mobileDescription: "Analyses d'affaires alimentées par l'IA",
        category: "Intelligence d'Affaires",
        liveAnalytics: "Analyses en Direct",
        aiPoweredInsights: "Insights alimentés par l'IA",
      },
      alwaysLearning: {
        title: "Toujours en apprentissage",
        description:
          "Apprend et s'adapte continuellement, élargissant les connaissances et maximisant les performances à chaque interaction",
        mobileDescription: "IA adaptative qui apprend continuellement",
        category: "Intelligence Adaptative",
      },
      autonomous: {
        title: "Intelligence Autonome",
        description:
          "IA intelligente et proactive qui anticipe sans intervention de l'utilisateur dans les décisions opérationnelles",
        mobileDescription: "IA de prise de décision autonome",
        category: "Systèmes Autonomes",
      },
      hoverToSeeDemo: "Survolez pour voir la démo en direct",
      loadingDemo: "Chargement de la démo...",
      ctaText:
        "Prêt à voir comment les agents IA peuvent transformer votre entreprise?",
      ctaTextMobile: "Transformer votre entreprise avec l'IA?",
      requestCustomDemo: "Demander une Démo Personnalisée",
      requestDemoMobile: "Demander une Démo",
    },
    // Case Studies section
    caseStudies: {
      sectionTitle: "Histoires de Succès",
      title:
        "Les entreprises les plus innovantes utilisent l'IA pour accélérer avec moccet",
      subtitle:
        "Projets réels, résultats réels. Voyez comment nous transformons les entreprises avec des équipes alimentées par l'IA.",
      deliveryTime: "Temps de livraison",
      costSavings: "Économies de coûts",
      techflow: {
        title: "TechFlow",
        subtitle: "Automatisation du support client avec l'IA",
        description:
          "A révolutionné le service client avec des agents IA qui ont atteint 98% de satisfaction client",
        mobileDescription: "98% de satisfaction client avec support IA",
        category: "Support Client",
      },
      healthvault: {
        title: "HealthVault",
        subtitle: "Gestion de patients conforme HIPAA",
        description:
          "A construit une plateforme de santé complète qui rationalise la gestion des données des patients",
        mobileDescription: "Système de gestion de patients conforme HIPAA",
        category: "Santé",
      },
      tradepro: {
        title: "TradePro",
        subtitle: "Plateforme d'analyse de trading en temps réel",
        description:
          "A transformé les opérations de trading avec des analyses alimentées par l'IA et la prise de décision automatisée",
        mobileDescription: "Plateforme d'analyse de trading alimentée par l'IA",
        category: "Fintech",
      },
      retailmax: {
        title: "RetailMax",
        subtitle: "Recommandations e-commerce IA",
        description:
          "A créé une solution e-commerce complète avec des recommandations IA personnalisées",
        mobileDescription: "Plateforme e-commerce alimentée par l'IA",
        category: "E-commerce",
      },
      cta: {
        title: "Créez votre histoire de succès maintenant",
        subtitle:
          "Rejoignez les entreprises innovantes utilisant l'IA pour accélérer leur croissance. Commencez aujourd'hui et voyez les résultats en quelques jours.",
        startProject: "Démarrer Votre Projet",
        viewAll: "Voir Toutes les Études de Cas",
      },
    },
    // Target Audience section
    targetAudience: {
      sectionTitle: "Adapté à tous",
      title: "La solution adaptée à votre entreprise",
      subtitle:
        "Que vous soyez une startup soutenue par VC, une petite entreprise ou une entreprise, Moccet vous aide à livrer des projets logiciels plus rapidement et plus efficacement.",
      startups: {
        title: "Startups Soutenues par VC",
        description:
          "Avancez rapidement et tirez le meilleur parti de votre capital avec nos capacités de développement rapide.",
        features: [
          "Développement MVP en jours et non en mois",
          "Étendez votre capital avec 70% d'économies",
          "Itérez basé sur les retours du marché",
          "Évoluez la technologie avec la croissance de votre entreprise",
        ],
      },
      smallBusinesses: {
        title: "Petites Entreprises",
        description:
          "Intégrez enfin l'IA et accédez à des talents de classe mondiale sans le prix entreprise ou la complexité technique.",
        features: [
          "Intégration IA sans complexité technique",
          "Accès aux meilleurs talents tech mondiaux",
          "Tarification fixe prévisible",
          "Pas besoin d'embaucher des équipes tech internes",
        ],
      },
      enterprises: {
        title: "Entreprises",
        description:
          "Accélérez la transformation numérique et l'innovation avec notre approche alimentée par l'IA.",
        features: [
          "Prototypage et livraison rapides",
          "Réduisez drastiquement le backlog IT",
          "Sécurité et conformité de niveau entreprise",
          "Intégration transparente avec les systèmes existants",
        ],
      },
    },
    // Blogs section
    blogs: {
      sectionTitle: "Blogs",
      title: "Votre plongée profonde dans moccet commence ici.",
      posts: {
        future: {
          title: "Prêt pour l'avenir de l'IA avec moccet?",
          description:
            "Explorez comment l'intelligence artificielle remodele les opérations commerciales modernes et ce que cela signifie pour la prochaine décennie.",
          category: "IA",
        },
        productivity: {
          title: "Débloquez la productivité agentique pour chaque employé",
          description:
            "Un guide complet pour développer des solutions alimentées par l'IA tout en maintenant les normes de productivité.",
          category: "PRODUCTIVITÉ",
        },
        agentforce: {
          title: "Agentforce 2.0: Agentforce arrive",
          description:
            "Comment nous avons aidé les entreprises à intégrer des agents IA directement dans leurs flux de travail Slack pour une meilleure collaboration.",
          category: "INTÉGRATION",
        },
        tips: {
          title: "Meilleurs conseils moccet pour booster la productivité",
          description:
            "Apprenez les stratégies et outils que nous utilisons pour améliorer considérablement la productivité d'équipe sans compromettre la qualité.",
          category: "CONSEILS",
        },
      },
    },
    // Footer
    footer: {
      tagline:
        "Agents IA et experts de classe mondiale travaillant ensemble pour transformer vos idées en réalité. Construisez n'importe quoi, 10 fois plus vite.",
      sections: {
        product: {
          title: "Produit",
          links: {
            howItWorks: "Comment ça marche",
            features: "Fonctionnalités",
            pricing: "Tarifs",
            aiTools: "Outils IA",
            roadmap: "Feuille de route",
          },
        },
        solutions: {
          title: "Solutions",
          links: {
            forStartups: "Pour les Startups",
            forSmbs: "Pour les PME",
            forEnterprise: "Pour les Entreprises",
            forAgencies: "Pour les Agences",
            forDevelopers: "Pour les Développeurs",
          },
        },
        resources: {
          title: "Ressources",
          links: {
            documentation: "Documentation",
            apiReference: "Référence API",
            caseStudies: "Études de Cas",
            blog: "Blog",
            supportCenter: "Centre de Support",
          },
        },
        company: {
          title: "Entreprise",
          links: {
            aboutUs: "À Propos",
            careers: "Carrières",
            partners: "Partenaires",
            contact: "Contact",
            pressKit: "Kit Presse",
          },
        },
      },
      legal: {
        copyright: "© 2024 Moccet, Inc. Tous droits réservés.",
        privacy: "Politique de Confidentialité",
        terms: "Conditions d'Utilisation",
        security: "Sécurité",
        gdpr: "RGPD",
      },
    },
  },
  // German translations
  de: {
    nav: {
      howItWorks: "Wie es funktioniert",
      features: "Funktionen",
      caseStudies: "Fallstudien",
      pricing: "Preise",
      talkToUs: "Mit uns sprechen",
      getStarted: "Loslegen",
    },
    hero: {
      announcement:
        "Testen Sie unseren KI-Projektmanager mit @moccet in Slack →",
      title: "In Tagen bauen, nicht in Monaten",
      subtitle:
        "KI-Agenten und Weltklasse-Experten arbeiten zusammen. Festpreise. 10x schnellere Lieferung. Schließen Sie sich über 500 Unternehmen an, die besser mit Moccet bauen.",
      tagline:
        "KI-Agenten + menschliche Experten erledigen Projekte 10x schneller und 70% günstiger",
      startBuilding: "Kostenlos starten",
      scheduleDemo: "Demo buchen",
      trust: {
        noCredit: "Keine Kreditkarte erforderlich",
        socCompliant: "SOC 2 konform",
        deploy: "In 24 Stunden bereitstellen",
      },
      mainTitle: {
        line1: "moccet",
        line2: "liefert",
        typewriterWords: ["schneller", "intelligenter", "besser"],
      },
    },
    process: {
      eyebrow: "Der Prozess",
      title: "Sechs Schritte zur Transformation",
      subtitle:
        "Wie wir Ihre Vision mit KI-gestützter Effizienz in die Realität umsetzen",
      steps: {
        research: {
          title: "KI-Forschung & Strategie",
          description:
            "Teilen Sie Ihre Idee. Unsere KI analysiert Marktdaten, Konkurrenteneinblicke und erstellt umfassende technische Briefs in Minuten.",
          highlight: "umfassende technische Briefs in Minuten",
        },
      },
      demo: {
        title: "Erleben Sie die Magie selbst",
        subtitle:
          "Fügen Sie @moccet zu Slack hinzu und sehen Sie KI-Projektmanagement in Aktion",
        button: "Zu Slack hinzufügen",
      },
    },
    cta: {
      title: "Bereit, etwas Außergewöhnliches zu bauen?",
      subtitle:
        "Schließen Sie sich Tausenden von Teams an, die mit moccet bauen",
      startProject: "Projekt starten",
      talkToExpert: "Mit einem Experten sprechen",
    },
  },
  // Chinese translations
  zh: {
    nav: {
      howItWorks: "工作原理",
      features: "功能",
      caseStudies: "案例研究",
      pricing: "定价",
      talkToUs: "与我们交谈",
      getStarted: "开始",
    },
    hero: {
      announcement: "在 Slack 中使用 @moccet 测试我们的 AI 项目经理 →",
      title: "以天为单位构建，而非月",
      subtitle:
        "AI 代理和世界级专家协同工作。固定定价。交付速度快 10 倍。加入 500 多家使用 Moccet 更好地构建的公司。",
      tagline: "AI 代理 + 人类专家完成项目速度快 10 倍，成本低 70%",
      startBuilding: "免费开始构建",
      scheduleDemo: "预约演示",
      trust: {
        noCredit: "无需信用卡",
        socCompliant: "符合 SOC 2",
        deploy: "24 小时内部署",
      },
      mainTitle: {
        line1: "moccet",
        line2: "交付",
        typewriterWords: ["更快", "更智能", "更好"],
      },
    },
    process: {
      eyebrow: "流程",
      title: "转型六步骤",
      subtitle: "我们如何用 AI 驱动的效率将您的愿景变为现实",
      steps: {
        research: {
          title: "AI 研究与策略",
          description:
            "分享您的想法。我们的 AI 分析市场数据、竞争对手见解，并在几分钟内创建全面的技术简报。",
          highlight: "几分钟内创建全面的技术简报",
        },
      },
      demo: {
        title: "亲自体验魔力",
        subtitle: "将 @moccet 添加到 Slack，查看 AI 项目管理的实际效果",
        button: "添加到 Slack",
      },
    },
    cta: {
      title: "准备构建非凡的东西吗？",
      subtitle: "加入数千个使用 moccet 构建的团队",
      startProject: "开始您的项目",
      talkToExpert: "与专家交谈",
    },
  },
  // Arabic translations
  ar: {
    // Navigation
    nav: {
      howItWorks: "كيف يعمل",
      features: "المميزات",
      caseStudies: "دراسات الحالة",
      pricing: "الأسعار",
      talkToUs: "تحدث إلينا",
      getStarted: "ابدأ الآن",
    },
    // Hero section
    hero: {
      announcement: "جرب مدير المشاريع بالذكاء الاصطناعي مع @moccet في Slack ←",
      title: "Build in days, not months", // Keep English as requested
      subtitle:
        "وكلاء الذكاء الاصطناعي والخبراء على مستوى عالمي يعملون معًا. تسعير ثابت. تسليم أسرع بـ 10 مرات. انضم إلى أكثر من 500 شركة تبني بشكل أفضل مع Moccet.",
      tagline:
        "وكلاء الذكاء الاصطناعي + الخبراء البشريون ينجزون المشاريع أسرع بـ 10 مرات وأرخص بـ 70%",
      startBuilding: "ابدأ البناء مجانًا",
      scheduleDemo: "حدد موعد العرض",
      trust: {
        noCredit: "لا حاجة لبطاقة ائتمان",
        socCompliant: "متوافق مع SOC 2",
        deploy: "النشر في 24 ساعة",
      },
      mainTitle: {
        line1: "moccet",
        line2: "ينجز",
        typewriterWords: ["أسرع", "أذكى", "أفضل"],
      },
    },
    // Process section
    process: {
      eyebrow: "العملية",
      title: "ست خطوات للتحول",
      subtitle: "كيف نحول رؤيتك إلى واقع بكفاءة مدعومة بالذكاء الاصطناعي",
      steps: {
        research: {
          title: "البحث والاستراتيجية بالذكاء الاصطناعي",
          description:
            "شارك فكرتك. يحلل ذكاءنا الاصطناعي بيانات السوق ورؤى المنافسين وينشئ ملخصات تقنية شاملة في دقائق.",
          highlight: "ملخصات تقنية شاملة في دقائق",
        },
        pricing: {
          title: "تسعير ثابت شفاف",
          description:
            "احصل على عروض أسعار فورية تشمل كل شيء. وفر 70% مقارنة بالفرق التقليدية مع الحصول على عائد استثمار أفضل.",
          highlight: "وفر 70% مقارنة بالفرق التقليدية",
        },
        match: {
          title: "المطابقة المثالية للفريق",
          description:
            "الوصول إلى المواهب العالمية التي لا يمكنك توظيفها مباشرة. نطابق أفضل أدوات الذكاء الاصطناعي والخبراء البشريين لمشروعك.",
          highlight: "أفضل أدوات الذكاء الاصطناعي والخبراء البشريين",
        },
        management: {
          title: "إدارة بالذكاء الاصطناعي 24/7",
          description:
            "اختبر التنسيق السلس. جرب @moccet في Slack لترى كيف يحول الذكاء الاصطناعي إدارة المشاريع إلى الأبد.",
          highlight: "جرب @moccet في Slack",
        },
        optimization: {
          title: "التحسين المستمر",
          description:
            "محلل الأعمال بالذكاء الاصطناعي يزيد عائد الاستثمار من خلال تحليل البيانات في الوقت الفعلي. احصل على رؤى تدفع النمو الأسي.",
          highlight: "تدفع النمو الأسي",
        },
        partnership: {
          title: "شراكة طويلة الأمد",
          description:
            "التعلم الآلي يبني ملفك الفريد. كل مشروع يصبح أكثر ذكاءً، مما يجعلنا شريك نموك، وليس مجرد بائع.",
          highlight: "شريك نموك، وليس مجرد بائع",
        },
      },
      demo: {
        title: "اختبر السحر بنفسك",
        subtitle:
          "أضف @moccet إلى Slack وشاهد إدارة المشاريع بالذكاء الاصطناعي في العمل",
        button: "أضف إلى Slack",
      },
    },
    // CTA section
    cta: {
      title: "مستعد لبناء شيء استثنائي؟",
      subtitle: "انضم إلى آلاف الفرق التي تبني مع moccet",
      startProject: "ابدأ مشروعك",
      talkToExpert: "تحدث إلى خبير",
    },
    // Features section
    features: {
      eyebrow: "المميزات",
      title: "منصة كاملة للبناء مع الذكاء الاصطناعي والخبراء",
      subtitle:
        "كل ما تحتاجه لتحويل رؤيتك إلى واقع، يتم تسليمه بسرعة غير مسبوقة.",
      hubLabel: "مدعوم بالذكاء الاصطناعي والخبراء",
      smartCoordination: {
        title: "محرك التنسيق الذكي",
        description:
          "يحلل نظام الذكاء الاصطناعي لدينا أهداف مشروعك ويجمع الفريق المثالي من وكلاء الذكاء الاصطناعي والخبراء البشريين.",
      },
      realtimeDashboard: {
        title: "لوحة تحكم في الوقت الفعلي",
        description:
          "احصل على رؤية كاملة للتقدم والموارد والجدول الزمني مع لوحة تحكم المشروع التفاعلية.",
      },
      outcomeBasedPricing: {
        title: "التسعير القائم على النتائج",
        description:
          "ادفع فقط مقابل النتائج، وليس الساعات. نموذج التسعير الثابت لدينا يعني عدم وجود تكاليف مفاجئة أو تجاوزات.",
      },
      expertNetwork: {
        title: "شبكة الخبراء",
        description:
          "الوصول إلى شبكتنا العالمية من متخصصي الذكاء الاصطناعي والمطورين والمصممين ومديري المشاريع المعتمدين.",
      },
      enterpriseSolutions: {
        title: "حلول المؤسسات",
        description:
          "حلول مخصصة للشركات من جميع الأحجام مع أمان وامتثال على مستوى المؤسسات.",
      },
      seamlessIntegrations: {
        title: "تكاملات سلسة",
        description:
          "التكامل مع أدواتك الحالية وسير العمل لعملية تطوير سلسة وفعالة.",
      },
    },
    // Seamless section
    seamless: {
      secretSauce: {
        badge: "سر نجاحنا",
        title: "الذكاء الاصطناعي يلتقي بالخبرة البشرية",
        description:
          "يحلل محرك التنسيق لدينا أهداف مشروعك ويجمع الفريق المثالي من وكلاء الذكاء الاصطناعي والخبراء البشريين من شبكتنا العالمية لتسليم المشاريع بسرعة وجودة غير مسبوقة.",
        metric: "10×",
        metricLabel:
          "إنجاز أسرع للمشاريع مقارنة بالوكالات التقليدية والعاملين المستقلين",
      },
      briefGenerator: {
        badge: "شفافية كاملة",
        title: "إنشاء ملخصات مدعومة بالذكاء الاصطناعي",
        description:
          "يستخدم مولد الملخصات الذكي لدينا الذكاء الاصطناعي لإنشاء ملخصات مشروع تلتقط كل التفاصيل، مما يوفر ساعات من التواصل ذهابًا وإيابًا.",
        metric: "90%",
        metricLabel:
          "تقليل في وقت تحديد نطاق المشروع مع الملخصات المولدة بالذكاء الاصطناعي",
      },
      pricing: {
        badge: "تسعير ثابت للنتائج",
        title: "ادفع مقابل النتائج، وليس الساعات",
        description:
          "تسعيرنا الثابت القائم على النتائج يعني أننا محفزون لجعل الذكاء الاصطناعي أفضل، وليس لإصدار فواتير بمزيد من الساعات. اعرف بالضبط ما ستدفعه. لا تكاليف مفاجئة.",
        metric: "48 ساعة",
        metricLabel: "متوسط وقت التسليم للمشاريع التي تستغرق عادة أسابيع",
      },
      stats: {
        badge: "نتائج مثبتة",
        title: "نحن في مجال تنمية الأعمال",
        description:
          "تساعد منصتنا الشركات من جميع الأحجام على تسليم المشاريع بشكل أسرع وأكثر كفاءة، مما يسمح لهم بالتركيز على ما يهم أكثر - أعمالهم الأساسية.",
        metric: "100%",
        metricLabel: "رضا العملاء على المشاريع المسلمة عبر جميع الصناعات",
      },
      qualityObsession: {
        badge: "هوس بالجودة",
        title: "الجودة + الكمية",
        description:
          "كل سطر من التعليمات البرمجية، كل بكسل، كل قرار يستفيد من الذكاء الاصطناعي المتطور وسنوات من الخبرة البشرية. الجودة ليست مجرد فحص - إنها مدمجة من اليوم الأول.",
        features: [
          "يراجع الخبراء البشريون المسارات الحرجة",
          "بنية الأمان أولاً دائمًا",
          "وثائق مفيدة فعلاً",
        ],
        metric: "98.5%",
        metricLabel: "متوسط تغطية الكود عبر جميع المشاريع مع صفر ثغرات أمنية",
      },
    },
    // Showcases section
    showcases: {
      sectionTitle: "العروض",
      title: "moccet في العمل",
      subtitle:
        "شاهد وكلاء الذكاء الاصطناعي والخبراء البشريين في العمل عبر مختلف الصناعات وحالات الاستخدام",
      subtitleMobile: "وكلاء الذكاء الاصطناعي في العمل عبر الصناعات",
      healthcare: {
        title: "فريق الذكاء الاصطناعي للرعاية الصحية",
        description:
          "وكلاء الذكاء الاصطناعي والخبراء السريريون يبنون أنظمة متوافقة مع HIPAA مع تكامل بيانات المرضى في الوقت الفعلي",
        mobileDescription: "أنظمة رعاية صحية متوافقة مع HIPAA",
        category: "تكنولوجيا الرعاية الصحية",
        hipaaCompliant: "متوافق مع HIPAA",
        realtimeData: "بيانات المرضى في الوقت الفعلي",
      },
      businessAnalyst: {
        title: "محلل الأعمال بالذكاء الاصطناعي",
        description:
          "تحليلات الإيرادات في الوقت الفعلي ورؤى النمو مدعومة بخوارزميات التعلم الآلي",
        mobileDescription: "تحليلات الأعمال المدعومة بالذكاء الاصطناعي",
        category: "ذكاء الأعمال",
        liveAnalytics: "تحليلات مباشرة",
        aiPoweredInsights: "رؤى مدعومة بالذكاء الاصطناعي",
      },
      alwaysLearning: {
        title: "التعلم المستمر",
        description:
          "التعلم والتكيف باستمرار، وتوسيع المعرفة وتعظيم الأداء مع كل تفاعل",
        mobileDescription: "ذكاء اصطناعي تكيفي يتعلم باستمرار",
        category: "الذكاء التكيفي",
      },
      autonomous: {
        title: "الذكاء المستقل",
        description:
          "ذكاء اصطناعي ذكي واستباقي يفكر مسبقًا دون مدخلات من المستخدم في القرارات التشغيلية",
        mobileDescription: "ذكاء اصطناعي لاتخاذ القرارات المستقلة",
        category: "الأنظمة المستقلة",
      },
      hoverToSeeDemo: "مرر الماوس لمشاهدة العرض المباشر",
      loadingDemo: "جاري تحميل العرض...",
      ctaText: "مستعد لترى كيف يمكن لوكلاء الذكاء الاصطناعي تحويل أعمالك؟",
      ctaTextMobile: "حول أعمالك بالذكاء الاصطناعي؟",
      requestCustomDemo: "اطلب عرضًا مخصصًا",
      requestDemoMobile: "اطلب عرضًا",
    },
    // Case Studies section
    caseStudies: {
      sectionTitle: "قصص النجاح",
      title: "أكثر الشركات ابتكارًا تستخدم الذكاء الاصطناعي للتسريع مع moccet",
      subtitle:
        "مشاريع حقيقية، نتائج حقيقية. شاهد كيف نحول الأعمال بفرق مدعومة بالذكاء الاصطناعي.",
      deliveryTime: "وقت التسليم",
      costSavings: "توفير التكاليف",
      techflow: {
        title: "TechFlow",
        subtitle: "أتمتة دعم العملاء بالذكاء الاصطناعي",
        description:
          "ثورة في خدمة العملاء مع وكلاء الذكاء الاصطناعي الذين حققوا رضا العملاء بنسبة 98%",
        mobileDescription: "رضا العملاء بنسبة 98% مع دعم الذكاء الاصطناعي",
        category: "دعم العملاء",
      },
      healthvault: {
        title: "HealthVault",
        subtitle: "إدارة المرضى المتوافقة مع HIPAA",
        description: "بناء منصة رعاية صحية شاملة تبسط إدارة بيانات المرضى",
        mobileDescription: "نظام إدارة المرضى المتوافق مع HIPAA",
        category: "الرعاية الصحية",
      },
      tradepro: {
        title: "TradePro",
        subtitle: "منصة تحليلات التداول في الوقت الفعلي",
        description:
          "تحويل عمليات التداول مع التحليلات المدعومة بالذكاء الاصطناعي واتخاذ القرارات الآلية",
        mobileDescription: "منصة تحليلات التداول المدعومة بالذكاء الاصطناعي",
        category: "التكنولوجيا المالية",
      },
      retailmax: {
        title: "RetailMax",
        subtitle: "توصيات التجارة الإلكترونية بالذكاء الاصطناعي",
        description:
          "إنشاء حل تجارة إلكترونية شامل مع توصيات شخصية بالذكاء الاصطناعي",
        mobileDescription: "منصة تجارة إلكترونية مدعومة بالذكاء الاصطناعي",
        category: "التجارة الإلكترونية",
      },
      cta: {
        title: "اصنع قصة نجاحك الآن",
        subtitle:
          "انضم إلى الشركات المبتكرة التي تستخدم الذكاء الاصطناعي لتسريع نموها. ابدأ اليوم وشاهد النتائج خلال أيام.",
        startProject: "ابدأ مشروعك",
        viewAll: "عرض جميع دراسات الحالة",
      },
    },
    // Target Audience section
    targetAudience: {
      sectionTitle: "مناسب للجميع",
      title: "الحل المناسب لأعمالك",
      subtitle:
        "سواء كنت شركة ناشئة مدعومة برأس المال الاستثماري، أو شركة صغيرة، أو مؤسسة، يساعدك Moccet على تسليم مشاريع البرمجيات بشكل أسرع وأكثر كفاءة.",
      startups: {
        title: "الشركات الناشئة المدعومة برأس المال الاستثماري",
        description:
          "تحرك بسرعة واستفد من مدرجك بأقصى قدر مع قدرات التطوير السريع لدينا.",
        features: [
          "تطوير MVP في أيام وليس شهور",
          "تمديد المدرج مع توفير 70% في التكاليف",
          "التكرار بناءً على ملاحظات السوق",
          "توسيع التكنولوجيا مع نمو أعمالك",
        ],
      },
      smallBusinesses: {
        title: "الأعمال الصغيرة",
        description:
          "أخيرًا دمج الذكاء الاصطناعي والوصول إلى المواهب العالمية دون سعر المؤسسات أو التعقيد التقني.",
        features: [
          "دمج الذكاء الاصطناعي دون تعقيد تقني",
          "الوصول إلى أفضل المواهب التقنية العالمية",
          "تسعير ثابت يمكن التنبؤ به",
          "لا حاجة لتوظيف فرق تقنية داخلية",
        ],
      },
      enterprises: {
        title: "المؤسسات",
        description:
          "تسريع التحول الرقمي والابتكار مع نهجنا المدعوم بالذكاء الاصطناعي.",
        features: [
          "النمذجة والتسليم السريع",
          "تقليل تراكم تكنولوجيا المعلومات بشكل كبير",
          "أمان وامتثال على مستوى المؤسسات",
          "تكامل سلس مع الأنظمة الحالية",
        ],
      },
    },
    // Blogs section
    blogs: {
      sectionTitle: "المدونات",
      title: "رحلتك العميقة في moccet تبدأ هنا.",
      posts: {
        future: {
          title: "مستعد لمستقبل الذكاء الاصطناعي مع moccet؟",
          description:
            "استكشف كيف يعيد الذكاء الاصطناعي تشكيل عمليات الأعمال الحديثة وما يعنيه ذلك للعقد القادم.",
          category: "الذكاء الاصطناعي",
        },
        productivity: {
          title: "فتح الإنتاجية الوكيلة لكل موظف",
          description:
            "دليل شامل لتطوير حلول مدعومة بالذكاء الاصطناعي مع الحفاظ على معايير الإنتاجية.",
          category: "الإنتاجية",
        },
        agentforce: {
          title: "Agentforce 2.0: وصول Agentforce",
          description:
            "كيف ساعدنا الشركات على دمج وكلاء الذكاء الاصطناعي مباشرة في سير عمل Slack لتحسين التعاون.",
          category: "التكامل",
        },
        tips: {
          title: "أفضل نصائح moccet لتعزيز الإنتاجية",
          description:
            "تعلم الاستراتيجيات والأدوات التي نستخدمها لتحسين إنتاجية الفريق بشكل كبير دون المساس بالجودة.",
          category: "النصائح",
        },
      },
    },
    // Footer
    footer: {
      tagline:
        "وكلاء الذكاء الاصطناعي والخبراء على مستوى عالمي يعملون معًا لتحويل أفكارك إلى واقع. ابنِ أي شيء، أسرع بـ 10 مرات.",
      sections: {
        product: {
          title: "المنتج",
          links: {
            howItWorks: "كيف يعمل",
            features: "المميزات",
            pricing: "الأسعار",
            aiTools: "أدوات الذكاء الاصطناعي",
            roadmap: "خارطة الطريق",
          },
        },
        solutions: {
          title: "الحلول",
          links: {
            forStartups: "للشركات الناشئة",
            forSmbs: "للشركات الصغيرة والمتوسطة",
            forEnterprise: "للمؤسسات",
            forAgencies: "للوكالات",
            forDevelopers: "للمطورين",
          },
        },
        resources: {
          title: "الموارد",
          links: {
            documentation: "الوثائق",
            apiReference: "مرجع API",
            caseStudies: "دراسات الحالة",
            blog: "المدونة",
            supportCenter: "مركز الدعم",
          },
        },
        company: {
          title: "الشركة",
          links: {
            aboutUs: "من نحن",
            careers: "الوظائف",
            partners: "الشركاء",
            contact: "اتصل بنا",
            pressKit: "ملف صحفي",
          },
        },
      },
      legal: {
        copyright: "© 2024 Moccet, Inc. جميع الحقوق محفوظة.",
        privacy: "سياسة الخصوصية",
        terms: "شروط الخدمة",
        security: "الأمان",
        gdpr: "GDPR",
      },
    },
  },
};

type TranslationKey = keyof typeof translations.en;

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  detectedLanguage: Language;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

// Helper function to get nested translation
const getNestedTranslation = (
  obj: any,
  path: string,
  fallbackObj?: any
): string => {
  const result = path.split(".").reduce((current, key) => current?.[key], obj);

  // If not found in current language and fallback object provided, try fallback
  if (!result && fallbackObj) {
    const fallbackResult = path
      .split(".")
      .reduce((current, key) => current?.[key], fallbackObj);
    return fallbackResult || path;
  }

  return result || path;
};

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
}) => {
  const [detectedLanguage, setDetectedLanguage] = useState<Language>("en");
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Detect language based on location
    const detectAndSetLanguage = async () => {
      // First check if user has a saved preference
      const userLanguage = detectUserLanguage();
      setLanguage(userLanguage);

      // Also detect regional language for toggle functionality
      const detected = await detectRegionalLanguage();
      setDetectedLanguage(detected);
    };

    detectAndSetLanguage();
  }, []);

  useEffect(() => {
    // Save language preference
    console.log("Language changed to:", language);
    saveLanguagePreference(language);
  }, [language]);

  const t = (key: string): string => {
    // Use the language translations if available, otherwise fall back to English
    const currentTranslations =
      translations[language as keyof typeof translations] || translations.en;

    // If current language is not English, provide English as fallback
    if (language !== "en") {
      return getNestedTranslation(currentTranslations, key, translations.en);
    }

    return getNestedTranslation(currentTranslations, key);
  };

  return (
    <TranslationContext.Provider
      value={{ language, setLanguage, t, detectedLanguage }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
