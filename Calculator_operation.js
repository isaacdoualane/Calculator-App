var afficheur = document.getElementById("afficheur");
var b_0 = document.getElementById("bouton_0");
var b_1 = document.getElementById("bouton_1");
var b_2 = document.getElementById("bouton_2");
var b_3 = document.getElementById("bouton_3");
var b_4 = document.getElementById("bouton_4");
var b_5 = document.getElementById("bouton_5");
var b_6 = document.getElementById("bouton_6");
var b_7 = document.getElementById("bouton_7");
var b_8 = document.getElementById("bouton_8");
var b_9 = document.getElementById("bouton_9");
var b_plus = document.getElementById("bouton_+");
var b_moins = document.getElementById("bouton_-");
var b_mult = document.getElementById("bouton_*");
var b_div = document.getElementById("bouton_/");
var b_parenthesis_G = document.getElementById("bouton_(");
var b_parenthesis_D = document.getElementById("bouton_)");
var b_virgule = document.getElementById("bouton_.");
var b_supp = document.getElementById("bouton_supp");
var b_AC = document.getElementById("bouton_AC");
var b_egal = document.getElementById("bouton_=");

var regexOperation = /[\+\-\*\/]/ , regexPoint = /\./ , regexNombre = /[0-9]/ , regexNewline = /\n/ ;
afficheur.value = 0;

b_0.addEventListener("click" , () => { onClickNumber(0); });
b_1.addEventListener("click" , () => { onClickNumber(1); });
b_2.addEventListener("click" , () => { onClickNumber(2); });
b_3.addEventListener("click" , () => { onClickNumber(3); });
b_4.addEventListener("click" , () => { onClickNumber(4); });
b_5.addEventListener("click" , () => { onClickNumber(5); });
b_6.addEventListener("click" , () => { onClickNumber(6); });
b_7.addEventListener("click" , () => { onClickNumber(7); });
b_8.addEventListener("click" , () => { onClickNumber(8); });
b_9.addEventListener("click" , () => { onClickNumber(9); });
b_plus.addEventListener("click" , onClickOperation.bind(onClickOperation,'+') );
b_moins.addEventListener("click" , onClickOperation.bind(onClickOperation,'-') );
b_mult.addEventListener("click" , onClickOperation.bind(onClickOperation,'*') );
b_div.addEventListener("click" , onClickOperation.bind(onClickOperation,'/') );
b_parenthesis_G.addEventListener("click" , () => { onClickParenthesisOrPoint('(') });
b_parenthesis_D.addEventListener("click" , () => { onClickParenthesisOrPoint(')') });
b_virgule.addEventListener("click" , onClickParenthesisOrPoint.bind(onClickParenthesisOrPoint,'.') );
b_supp.addEventListener('click' , () => {
    if( regexNewline.test(afficheur.value) ){
        afficheur.value = afficheur.value.slice( (afficheur.value.indexOf("\n")+2) , ); // le 2 pour "\n" et "="
        //afficheur.value = afficheur.value.substring(0, afficheur.value.length - 1);
    }
    else{
        if( afficheur.value.length > 1 || afficheur.value[0] != "0" ){
            if( afficheur.value.length == 1 ){
                afficheur.value = afficheur.value.substring(0, afficheur.value.length - 1);
                afficheur.value += 0;
            }
            else if( afficheur.value[0] == "E" ){ afficheur.value = 0; }
            else{
                afficheur.value = afficheur.value.substring(0, afficheur.value.length - 1);
            }
        }
    }
});
b_AC.addEventListener("click" , () => { afficheur.value = 0 } );
b_egal.addEventListener("click" , calcule );

function calcule(){
    if( !regexNewline.test(afficheur.value) ){
        try{
            afficheur.value += "\n=" + eval(afficheur.value);
        }
        catch{
            afficheur.value = "Error !";
        }
    }
}

function onClickNumber(chiffre){
    if( chiffre == 0 ){
        if( regexNewline.test(afficheur.value) ){
            afficheur.value = afficheur.value.slice( (afficheur.value.indexOf("\n")+2) , ); // le 2 pour "\n" et "="
            if( afficheur.value.length == 1 && afficheur.value[0] == 0 ){ afficheur.value += ''; }
            else{ afficheur.value += 0; }
        }
        else{
            if( afficheur.value.length == 1 && afficheur.value[0] == 0 ){afficheur.value += '';}
            else if( afficheur.value.length > 1 && afficheur.value[afficheur.value.length-1] == "0" && regexOperation.test(afficheur.value[afficheur.value.length-2]) ){
                afficheur.value += '';
            }
            else if( afficheur.value[0] == "E" ){ afficheur.value = 0; }
            else{ afficheur.value += 0; }
        }
    }
    else{
        if( regexNewline.test(afficheur.value) ){
            afficheur.value = afficheur.value.slice( (afficheur.value.indexOf("\n")+2) , ); // le 2 pour "\n" et "="
            if( afficheur.value.length == 1 && afficheur.value[0] == 0 ){
                afficheur.value = afficheur.value.substring(0, afficheur.value.length - 1);
                afficheur.value += chiffre;
            }
            else{ afficheur.value += chiffre; }
        }
        else{
            if( afficheur.value.length == 1 && afficheur.value[0] == "0" ){
                afficheur.value = afficheur.value.substring(0, afficheur.value.length - 1);
                afficheur.value += chiffre;
            }
            else if( afficheur.value.length > 1 && afficheur.value[afficheur.value.length-1] == "0" && regexOperation.test(afficheur.value[afficheur.value.length-2]) ){
                afficheur.value = afficheur.value.substring(0, afficheur.value.length - 1);
                afficheur.value += chiffre;
            }
            else if( afficheur.value[0] == "E" ){ afficheur.value = chiffre; }
            else{ afficheur.value += chiffre; }
        }
    }
}

function onClickOperation(signe){
    if( regexNewline.test(afficheur.value) ){
        afficheur.value = afficheur.value.slice( (afficheur.value.indexOf("\n")+2) , ); // le 2 pour "\n" et "="
        afficheur.value += signe;
    }
    else{
        if( afficheur.value.length != 0 ){
            if( afficheur.value[0] == "E" ){ afficheur.value = "0" + signe; }
            else if( !regexOperation.test(afficheur.value[afficheur.value.length-1]) ){ afficheur.value += signe; }
            else{ 
                afficheur.value = afficheur.value.substring(0, afficheur.value.length - 1);
                afficheur.value += signe;
            }
        }
    }
}

function onClickParenthesisOrPoint(p){
    if( p == "." ){
        if( regexNewline.test(afficheur.value) ){
            afficheur.value = afficheur.value.slice( (afficheur.value.indexOf("\n")+2) , ); // le 2 pour "\n" et "="
        }
        else if( afficheur.value[0] == "E" ){ afficheur.value = "0."; }
    
        let i = afficheur.value.length-1 , vecteur = [] ;
        while( !regexOperation.test(afficheur.value[i]) && i!= -1 ){
            vecteur.unshift(afficheur.value[i]);
            i--;
        }
        if( !regexPoint.test(vecteur) ){ afficheur.value += "."; }
    }
    else{
        if( regexNewline.test(afficheur.value) ){
            afficheur.value = afficheur.value.slice( (afficheur.value.indexOf("\n")+2) , ); // le 2 pour "\n" et "="
            if( afficheur.value.length == 1 && afficheur.value[0] == 0 ){
                afficheur.value = afficheur.value.substring(0, afficheur.value.length - 1);
                afficheur.value += p;
            }
            else{ afficheur.value += p; }
        }
        else if( afficheur.value[0] == "E" ){ afficheur.value = p; }
        else if(afficheur.value.length == 1 && afficheur.value[0] == "0"){
            afficheur.value = afficheur.value.substring(0, afficheur.value.length - 1);
            afficheur.value += p;
        }
        else if( afficheur.value.length > 1 && afficheur.value[afficheur.value.length-1] == "0" && regexOperation.test(afficheur.value[afficheur.value.length-2]) ){
            afficheur.value = afficheur.value.substring(0, afficheur.value.length - 1);
            afficheur.value += p;
        }
        else{
            afficheur.value += p;
        }
    } 
}
