export type ResponseType =
  | 'tech_stack'
  | 'experience'
  | 'projects'
  | 'contact'
  | 'methodology'
  | 'text'

export interface StructuredResponse {
  type: ResponseType
  data: TechStackData | ExperienceData | ProjectsData | ContactData | MethodologyData | null
  text: string
}

export interface TechStackItem {
  name: string
  category?: string
  proficiency: number
  color?: 'primary' | 'secondary' | 'accent'
}

export interface TechStackData {
  title: string
  subtitle?: string
  items: TechStackItem[]
  footer?: string
}

export interface ExperienceItem {
  period: string
  title: string
  company: string
  description: string
  highlights?: string[]
  current?: boolean
}

export interface ExperienceData {
  title: string
  subtitle?: string
  items: ExperienceItem[]
  totalYears?: string
}

export interface ProjectItem {
  name: string
  description: string
  icon?: string
  emoji?: string
  techStack: string[]
  url?: string
  featured?: boolean
}

export interface ProjectsData {
  title: string
  subtitle?: string
  projects: ProjectItem[]
}

export interface ContactData {
  title: string
  email: string
  phone?: string
  linkedin?: string
  github?: string
  location?: string
  available?: boolean
}

export interface MethodologyItem {
  title: string
  subtitle?: string
  icon?: string
  emoji?: string
}

export interface MethodologyData {
  title: string
  subtitle?: string
  items: MethodologyItem[]
}

export interface MessageMetadata {
  responseType?: ResponseType
  structuredData?: TechStackData | ExperienceData | ProjectsData | ContactData | MethodologyData
  timestamp?: string
}