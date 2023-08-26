

/**
 * Interface to generate Manga objects
 */
export interface Manga {
    mid: string | number,
    title: string,
    cover: string,
    infoPage?: string,
    numPages?: number,
    author?: string,
    description?: string
    genres?: string | string[]
}

export interface MangaPage {
    num: number,
    srcImage: string
}