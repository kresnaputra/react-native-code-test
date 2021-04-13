export interface IBlogData {
    blogs: {
        imageUrl: string,
        title: string,
        content: string,
        author: string,
        datePublished: string,
        views: number
    }[]
}