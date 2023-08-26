import { SearchLinkParams } from "../models/link.model";


export const generateLinkSearch = (linkParams: SearchLinkParams): string => {
  let parts: string[] = [];

  if (linkParams.resultType)
    parts.push(`view=${linkParams.resultType}`)
  else
    parts.push('view=thumbnails')

  if (linkParams.resultpage)
    parts.push(`page=${linkParams.resultpage}`)
  else
    parts.push('page=1');

  if (linkParams.orderBy)
    parts.push(`order=${linkParams.orderBy}`);
  else
    parts.push('order=publication_date')

  if (linkParams.orderDirList)
    parts.push(`order-dir${linkParams.orderDirList}`)
  else
    parts.push('order-dir=asc')

  if (linkParams.titleSearch)
    parts.push(`search%5BsearchText%5D=${linkParams.titleSearch.replace(' ', '+')}`)

  if (linkParams.filterSearch)
    parts.push(`search%5BsearchBy%5D=${linkParams.filterSearch}`)
  
  if (linkParams.typeSearch)
    parts.push(`type=${linkParams.typeSearch}`)
  else
    parts.push('type=all')

  if (linkParams.genderSearch && linkParams.genderSearch.length >= 0) {
    linkParams.genderSearch.forEach((genderId: number) => {
      parts.push(`genders%5B%5D=${genderId}`);
    });
  }

  return parts.join('&');
}