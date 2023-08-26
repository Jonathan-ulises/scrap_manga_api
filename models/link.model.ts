


export interface SearchLinkParams {
	[key: string]:	 string | number | Array<number> | undefined;
	resultType?: 		 string;
	resultpage?: 		 number;
	orderBy?: 	 		 string;
	orderDirList?:	 string;
	titleSearch?:		 string;
	filterSearch?: 	 string;
	typeSearch?: 		 string;
	genderSearch?: 	 Array<number>;
}