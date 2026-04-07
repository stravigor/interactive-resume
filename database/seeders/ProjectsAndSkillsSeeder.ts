import { Seeder } from '@strav/database/seeder'
import Project from '../../app/models/Project'
import Skill from '../../app/models/Skill'

export default class ProjectsAndSkillsSeeder extends Seeder {
  async run() {
    // Create skills
    const skills = await this.createSkills()

    // Create projects
    await this.createProjects(skills)

    console.log('✅ Projects and skills seeded successfully!')
  }

  private async createSkills() {
    const skillsData = [
      // Languages
      { name: 'TypeScript', category: 'language', proficiency: 10, years_experience: 5, color: '#3178C6' },
      { name: 'JavaScript', category: 'language', proficiency: 10, years_experience: 7, color: '#F7DF1E' },
      { name: 'PHP', category: 'language', proficiency: 9, years_experience: 6, color: '#777BB4' },
      { name: 'Python', category: 'language', proficiency: 7, years_experience: 3, color: '#3776AB' },

      // Frontend
      { name: 'React', category: 'frontend', proficiency: 10, years_experience: 5, color: '#61DAFB' },
      { name: 'Vue.js', category: 'frontend', proficiency: 9, years_experience: 4, color: '#4FC08D' },
      { name: 'Three.js', category: 'frontend', proficiency: 8, years_experience: 2, color: '#000000' },
      { name: 'Redux', category: 'frontend', proficiency: 9, years_experience: 4, color: '#764ABC' },
      { name: 'Sass/CSS', category: 'frontend', proficiency: 10, years_experience: 7, color: '#CC6699' },

      // Backend
      { name: 'Node.js', category: 'backend', proficiency: 10, years_experience: 5, color: '#339933' },
      { name: 'Bun', category: 'backend', proficiency: 9, years_experience: 1, color: '#000000' },
      { name: 'Express', category: 'backend', proficiency: 9, years_experience: 5, color: '#000000' },
      { name: 'Laravel', category: 'backend', proficiency: 8, years_experience: 4, color: '#FF2D20' },
      { name: 'AdonisJS', category: 'backend', proficiency: 8, years_experience: 2, color: '#5A45FF' },

      // Database
      { name: 'PostgreSQL', category: 'database', proficiency: 9, years_experience: 5, color: '#4169E1' },
      { name: 'MySQL', category: 'database', proficiency: 9, years_experience: 6, color: '#4479A1' },
      { name: 'MongoDB', category: 'database', proficiency: 7, years_experience: 3, color: '#47A248' },
      { name: 'Redis', category: 'database', proficiency: 8, years_experience: 3, color: '#DC382D' },

      // DevOps
      { name: 'Docker', category: 'devops', proficiency: 9, years_experience: 4, color: '#2496ED' },
      { name: 'AWS', category: 'devops', proficiency: 8, years_experience: 3, color: '#FF9900' },
      { name: 'Terraform', category: 'devops', proficiency: 7, years_experience: 2, color: '#7B42BC' },
      { name: 'Git', category: 'devops', proficiency: 10, years_experience: 7, color: '#F05032' },
    ]

    const skills: Record<string, any> = {}

    for (const skillData of skillsData) {
      const skill = await Skill.create(skillData)
      skills[skillData.name] = skill
    }

    return skills
  }

  private async createProjects(skills: Record<string, any>) {
    const projectsData = [
      {
        name: 'Strav Framework',
        slug: 'strav-framework',
        description: 'A comprehensive full-stack TypeScript framework built from scratch, featuring dependency injection, real-time WebSocket communication, ORM with migrations, Vue.js islands for hybrid SSR/SPA, and extensive CLI tooling. This framework demonstrates deep understanding of software architecture and design patterns.',
        short_description: 'Modern TypeScript full-stack framework with real-time capabilities',
        tech_stack: ['TypeScript', 'Bun', 'Vue.js', 'PostgreSQL', 'WebSockets'],
        features: [
          'IoC Container with dependency injection',
          'Real-time broadcasting with channels',
          'Type-safe ORM with migrations',
          'Vue.js islands architecture',
          'Comprehensive CLI tools',
          'Built for Bun runtime'
        ],
        role: 'Creator & Lead Developer',
        category: 'framework',
        github_url: 'https://github.com/strav/framework',
        priority: 100,
        is_featured: true,
        skillIds: ['TypeScript', 'Node.js', 'Bun', 'Vue.js', 'PostgreSQL']
      },
      {
        name: '3D Product Konfigurator',
        slug: '3d-konfigurator',
        description: 'Interactive 3D product customization tool built with React and Three.js. Features real-time rendering at 60fps, custom shader implementations, texture mapping, and mobile optimization. Handles complex 3D models with thousands of polygons while maintaining smooth performance.',
        short_description: 'Real-time 3D product customization with Three.js',
        tech_stack: ['React', 'Three.js', 'TypeScript', 'WebGL', 'Redux'],
        features: [
          'Real-time 3D rendering',
          '60fps performance',
          'Custom shader implementations',
          'Mobile-optimized',
          'Texture and material customization',
          'Export configurations'
        ],
        role: 'Lead Frontend Developer',
        category: 'frontend',
        priority: 95,
        is_featured: true,
        skillIds: ['React', 'Three.js', 'TypeScript', 'JavaScript']
      },
      {
        name: 'Infrastructure Management Portal',
        slug: 'infrastructure-portal',
        description: 'Comprehensive DevOps platform for managing AWS infrastructure through a web interface. Built with AdonisJS and integrates with Terraform for Infrastructure as Code. Features automated deployment pipelines, resource monitoring, and cost optimization tools.',
        short_description: 'AWS infrastructure management with Terraform integration',
        tech_stack: ['AdonisJS', 'TypeScript', 'AWS SDK', 'Terraform', 'Docker'],
        features: [
          'AWS resource management',
          'Terraform integration',
          'CI/CD pipeline automation',
          'Resource monitoring',
          'Cost optimization',
          'Multi-account support'
        ],
        role: 'Full-Stack Developer',
        category: 'infrastructure',
        priority: 90,
        is_featured: true,
        skillIds: ['AdonisJS', 'TypeScript', 'AWS', 'Terraform', 'Docker']
      },
      {
        name: 'E-commerce Consultant System',
        slug: 'consultant-system',
        description: 'Multi-tenant e-commerce platform with personalized shopping assistance. Features AI-powered product recommendations, real-time inventory management, and comprehensive admin dashboards. Handles thousands of concurrent users with optimized database queries and caching strategies.',
        short_description: 'AI-powered e-commerce consultation platform',
        tech_stack: ['PHP', 'MySQL', 'React', 'Redis', 'Docker'],
        features: [
          'Multi-tenant architecture',
          'AI product recommendations',
          'Real-time inventory',
          'Admin dashboards',
          'Payment integration',
          'Multi-language support'
        ],
        role: 'Backend Lead',
        category: 'backend',
        priority: 85,
        is_featured: false,
        skillIds: ['PHP', 'MySQL', 'React', 'Redis', 'Docker']
      },
      {
        name: 'Production Management System',
        slug: 'production-system',
        description: 'Enterprise manufacturing execution system for tracking production workflows, quality control, and resource allocation. Features real-time production monitoring, automated reporting, and integration with IoT sensors for shop floor data collection.',
        short_description: 'Manufacturing execution and production tracking system',
        tech_stack: ['Node.js', 'PostgreSQL', 'React', 'Docker', 'MQTT'],
        features: [
          'Real-time production tracking',
          'Quality control workflows',
          'Resource allocation',
          'IoT sensor integration',
          'Automated reporting',
          'Predictive maintenance'
        ],
        role: 'System Architect',
        category: 'backend',
        priority: 80,
        is_featured: false,
        skillIds: ['Node.js', 'PostgreSQL', 'React', 'Docker']
      },
      {
        name: 'Fabric API Wrapper Libraries',
        slug: 'fabric-api-wrapper',
        description: 'Open-source API client libraries for fabric customization services, available in both PHP and JavaScript/TypeScript. Features comprehensive type definitions, automatic retry logic, rate limiting, and extensive documentation.',
        short_description: 'Multi-language API client libraries for fabric services',
        tech_stack: ['TypeScript', 'PHP', 'Axios', 'Guzzle', 'Jest'],
        features: [
          'Type-safe API calls',
          'Automatic retry logic',
          'Rate limiting',
          'Comprehensive testing',
          'Published on npm/packagist',
          'Extensive documentation'
        ],
        role: 'Library Author',
        category: 'library',
        priority: 70,
        is_featured: false,
        skillIds: ['TypeScript', 'PHP', 'JavaScript']
      }
    ]

    for (const projectData of projectsData) {
      const skillIds = projectData.skillIds
      delete (projectData as any).skillIds

      const project = await Project.create(projectData)

      // Associate skills with project
      for (const skillName of skillIds) {
        if (skills[skillName]) {
          await project.skills().attach(skills[skillName].id)
        }
      }
    }
  }
}