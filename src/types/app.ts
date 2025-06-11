export interface Project {
    id: number,
    slug: string,
    title: string,
    short_description: string,
    website_link?: string,
    github_link?: string,
    tags?: string[],
}

export interface Responsibility {
    label: string,
    value: number,
}

export interface Role {
    id: number,
    title: string,
    timeframe?: string,
    description?: string,
    responsibilities?: Responsibility[],
}