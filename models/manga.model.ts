

/**
 * Interface to generate Manga objects
 */
export interface Manga {
    mid: string | number,
    title: string,
    cover: string,
    infoPage: string,
}

/**
 * Interface to create Manga objects to more information.
 */
export interface DetailManga {
    mid: string | number,
    title: string,
    cover: string,
    author: string,
    genre: string,
    numPages: string,
}