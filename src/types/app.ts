export interface Project {
    id: number,
    slug: string,
    title: string,
    short_description: string,
    website_link?: string,
    github_link?: string,
    tags?: string[],
}