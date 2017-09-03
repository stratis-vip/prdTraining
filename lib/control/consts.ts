/*
//https://stackoverflow.com/a/8596808/7301942
function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}
*/
 const MINWEIGHT= 27.3; //Lizzie Velasquez at her 21 https://en.wikipedia.org/wiki/Lizzie_Vel%C3%A1squez
 const MAXWEIGHT= 635;  //Jon Brower Minnoch https://en.wikipedia.org/wiki/Jon_Brower_Minnoch
    
 const MINHEIGHT= 0.546;    //Chandra Bahadur Dangi https://en.wikipedia.org/wiki/Chandra_Bahadur_Dangi
 const MAXHEIGHT= 2.72; //Robert Wadlow https://en.wikipedia.org/wiki/Robert_Wadlow
    
 const MAXVO2MAX= 100; //97.5 Oskar Svendsen	Cycling
    /*SEX_UNDEFINED: 0);
    define("SEX_MALE", 1);
    define("SEX_FEMALE", 2);*/
export {MINWEIGHT,MAXWEIGHT, MINHEIGHT, MAXHEIGHT, MAXVO2MAX}