const body = document.querySelector('body');
//On récupère l'ensemble des touches du clavier dans le DOM
const keyButtons = [...document.querySelectorAll('.key')];
//On récupère l'ensemble du contenu des touches du clavier
const keys = keyButtons.map(keyButton => keyButton.dataset.key);
//On créé un tableau associatif permettant de lier une touche du clavier à son contenu => a:button b:button c:button...
const keyTobuttonMap = keyButtons.reduce((acc, cur) => {
    const curKey = cur.dataset.key;
    acc[curKey] = cur;
    return acc;
}, {});

let currentKey;

//On écoute les événements de type 'keyup' sur le body
body.addEventListener('keyup', e => {
    const typedKey = e.key;
    //On vérifie que la touche tapée correspond à la touche à taper
    checkKey(typedKey);
 });

//On écoute les événements de type 'click' sur les touches du clavier
keyButtons.forEach(keyButton => {
    keyButton.addEventListener("click", (e) => {
        const typedKey = e.target.dataset.key;
        checkKey(typedKey);
    })
 });

//Fonction permettant de vérifier que la touche tapée correspond à la touche à taper
 const checkKey = typedKey => {
    //Si c'est la bonne touche on attribue l'animation à une nouvelle touche au hasard
    if (typedKey.toUpperCase() === currentKey) {
        setRandomKey();
    }
 };

//Fonction permettant d'attribuer l'animation à une touche au hasard
const setRandomKey = () => {
    if (currentKey) {
        //On supprime la classe 'jiggle' de la touche précédente
        keyTobuttonMap[currentKey].classList.remove('jiggle');
    }
    const randomIndex = Math.floor(Math.random() * keys.length);
    currentKey = keys[randomIndex];
    //On utilisant le tableau associatif on ajoute la classe 'jiggle' à la touche
    keyTobuttonMap[currentKey].classList.add('jiggle');

    //Sans utiliser le tableau associatif
    /*for (i=0; i<keyButtons.length; i++){
        if(keyButtons[i].dataset.key == currentKey){
            keyButtons[i].classList.add('jiggle');
        }
    }*/
};

setRandomKey();
