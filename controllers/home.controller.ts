import axios from "axios";
import * as cheerio from "cheerio";
import { Request, Response } from "express";
import { Manga } from "../models/manga.model";


export const getRecentManga = async(req: Request, res: Response) => {
  const URL = process.env.URL_MANGA_TMO!
  const {status, data} = await axios.get(URL);
  
  if (status == 200) {
    const $ = cheerio.load(data);
    const containerManga = $('#top_weekly');
    const listM: Manga[] = [];

    containerManga.children().each((i, el) => {

      const cover = $(el).find('img.content-thumbnail-cover').attr()!.src
      const { title, href } = $(el).find('.content-title a').attr()!;
      const mid = href.split('/')[4];
      listM.push({
        title,
        mid,
        cover,
        infoPage: href
      })
    });

    res.status(200).json({
      ok: true,
      result: listM
    })
  }
}