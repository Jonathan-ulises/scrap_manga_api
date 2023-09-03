import axios from "axios";
import * as cheerio from "cheerio";
import { Request, Response } from "express";
import { Manga, MangaPage } from "../models/manga.model";
import { SearchLinkParams } from '../models/link.model';
import { generateLinkSearch } from "../helpers/generateLinks";
import { limpiarNombre } from "../helpers/limpiarDatos";
import AxiosBase from "../models/axiosBase";


// TODO: IMPORTANTE
// TODO: IMPLEMENTAR CONEXIONES PROXY PARA EVITAR DETENCION POR CONEXIONES SIMULTANEAS MEDIANTE LA MISMA IP

export const getRecentManga = async(req: Request, res: Response) => {
  try {
    const { status, data } = await AxiosBase.otome.get('/')
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
    } else {
      res.status(500).json({
        ok: false,
        result: `Error con consulta en ${AxiosBase.otome.getUri()}`
      })
    }
  } catch (error) {
    console.log(error)
    // Envio de la pagina de error para poder visualizar correctamente
    res.status(500).send(error['response']['data'])
  }
  
}

export const getDetailManga = async(req: Request, res: Response) => {
  const { mid } = req.body;

  const { status, data } = await AxiosBase.otome.get(`/contents/${mid}`);
  if (status === 200) {
    const $ = cheerio.load(data);

    const mangaDetail: Manga = {
      mid,
      title: $('div.panel-heading > h3').text(),
      cover: $('.content-thumbnail-cover').attr()!.src,
      numPages: $('div.well').find('div.col-xs-6').length,
      author: $('span.tag.tag-accepted > a').text(),
      description: 'SIN INFORMACION',
      genres: $('a.tag.tag-accepted').map((i, element) => { return $(element).text() }).toArray()
    }

    res.status(200).json({
      ok: true,
      result: mangaDetail
    })
  }
}

export const getMangaPages = async(req: Request, res: Response) => {
  const { mid, numPages } = req.body;

  const listPage: MangaPage[] = [];

  for(let i = 1; i <= numPages; i++) {
    const { status, data } = await AxiosBase.otome.get(`/reader/${mid}/paginated/${i}`);
    if (status === 200) {
      const $ = cheerio.load(data);
      const page: MangaPage = {
        num: i,
        srcImage: $('img.content-image.lazy').attr()!['data-original'] || ''
      }
      listPage.push(page)
    }
  }

  res.status(200).json({
    ok: true,
    result: listPage
  })
}

export const getMangaByGenres = async(req: Request, res: Response) => {
  const listManga: Array<Manga> = [];
  const paramsSearch: SearchLinkParams = req.body

  const { status, data } = await AxiosBase.otome.get(`/section/hentai?${generateLinkSearch(paramsSearch)}`);
  if ( status === 200 ) {
    const $ = cheerio.load(data);
    $('.col-xs-6.col-sm-3.col-md-3.col-lg-2').each((_, el) => {
      const cover = $(el).find('img.content-thumbnail-cover').attr()!.src
      const { title, href } = $(el).find('.content-title a').attr()!;
      const mid = href.split('/')[4];
      listManga.push({
        title,
        mid,
        cover,
        infoPage: href
      })
    });
  }
  
  res.status(200).json({
    ok: true,
    result: {
      paramsSearch,
      listManga
    }
  })
  
}

export const getChapterList = async(req: Request, res: Response) => {
  const { mid } = req.body;
  if (mid) {
    let title: string = '';

    const listManga: Array<Manga> = [];
    const { status, data } = await AxiosBase.otome.get(`/contents/${mid}`);
    if (status === 200) {
      const $ = cheerio.load(data);
      title = $('div.panel-heading > h3').text();
      title = limpiarNombre(title);
      let paramsSearch: SearchLinkParams;

      let cantidadManga = 0;
      
      let page = 1;
      do {
        try {
          paramsSearch = {
            titleSearch: title,
            resultpage: page,
          }
  
          const { status: statusSearch, data: dataSearch } = await AxiosBase.otome.get(`/section/hentai?${generateLinkSearch(paramsSearch)}`);
          if (statusSearch === 200) {
            const $ = cheerio.load(dataSearch);
            $('.col-xs-6.col-sm-3.col-md-3.col-lg-2').each((_, el) => {
              const cover = $(el).find('img.content-thumbnail-cover').attr()!.src
              const { title, href } = $(el).find('.content-title a').attr()!;
              const mid = href.split('/')[4];
              listManga.push({
                title,
                mid,
                cover,
                infoPage: href
              })
            });

            cantidadManga = $('.col-xs-6.col-sm-3.col-md-3.col-lg-2').length
            page++;
          } else {
            break;
          }
        } catch (error) {
          console.error(error);
          break;
        }
      } while (cantidadManga >= 24);
    }

    res.status(200).json({
      ok: true,
      result: {
        titleSearch: title,
        listSize: listManga.length,
        listManga
      }
    })

  } else {
    res.status(204).json({
      ok: false,
      result: 'Error en la peticion.'
    })
  }
}
