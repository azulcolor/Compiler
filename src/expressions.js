  export const jump = /\n/g
  export const all = /\n|\r|\t|\s/gm
  export const order = /Top+Thing{+[\s\w ;=1-9À-ÿ\u00f1\u00d1].+}+Sky{+[\w ;=1-9()'À-ÿ\u00f1\u00d1].+inf\(\);}Down/
  export const top = /Top/
  export const thing = /Thing/
  export const sky = /Sky/
  export const inf = /inf\(\)/
  export const down = /Down/
  export const symbols = /[#`,\$%"^&_?¿~°¬<>]/;
  export const comments = /\/\/[a-zA-Z0-9 ]*\s*/gm;