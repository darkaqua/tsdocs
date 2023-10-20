import { parse } from "deno/flags/mod.ts";

const { main } = parse(Deno.args);

const JS_DOC_FRAGMENT = /\/\*\*(.*?)\*\/\s(.*?){/gs;
const JS_DOC_CLEAN_UP = /^( \*( )?)/gm

const DOC_REGEX = /@(.*?)\s((.|\n)*?)(?=@|$|\*\/)/gs;

const text = Deno.readTextFileSync(main);
const matches = text.matchAll(new RegExp(JS_DOC_FRAGMENT));


for(const [,rawDoc, rawFunction] of matches) {
	const cleanRawDoc = rawDoc.replace(JS_DOC_CLEAN_UP, '').trim();
	
	const docMatches = cleanRawDoc.matchAll(new RegExp(DOC_REGEX));
	
	for(const [, label, value] of docMatches) {
		console.log('- LABEL:', label, '\n  VALUE:', value.trim(), '\n')
	}
	
}

