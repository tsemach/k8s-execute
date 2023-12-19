export function J(o: any, prettyPrint: boolean = true) {
  if (prettyPrint) {        
    return JSON.stringify(o, undefined, 2)
  }
  return JSON.stringify(o) 
}