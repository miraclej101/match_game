document.addEventListener('DOMContentLoaded', () => {
    //option de carton
    const cartonArray = [
        {
            nom : 'orange',
            img : 'images/iconfinder_4619640_food_fruit_fruits_orange_icon.svg'
        },
        {
            nom : 'ananas',
            img : 'images/iconfinder_4619624_food_fruit_fruits_pineapple_icon.svg'
        },
        {
            nom : 'banane',
            img : 'images/iconfinder_4619625_banana_food_fruits_icon.svg'
        },
        {
            nom : 'fraise',
            img : 'images/iconfinder_4619627_food_fruit_fruits_strawberry_icon.svg'
        },
        {
            nom : 'pasteque',
            img : 'images/iconfinder_4619635_food_fruit_fruits_watermelon_icon.svg'
        },
        {
            nom : 'mangue',
            img : 'images/iconfinder_4619636_food_fruit_fruits_mango_icon.svg'
        },
        {
            nom : 'pomme',
            img : 'images/iconfinder_4619641_apple_food_fruit_fruits_icon.svg'
        },
        {
            nom : 'noix_de_coco',
            img : 'images/iconfinder_4619626_coconut_food_fruit_fruits_summer_icon.svg'
        },
        {
            nom : 'banane',
            img : 'images/iconfinder_4619625_banana_food_fruits_icon.svg'
        },
        {
            nom : 'mangue',
            img : 'images/iconfinder_4619636_food_fruit_fruits_mango_icon.svg'
        },
        {
            nom : 'orange',
            img :'images/iconfinder_4619640_food_fruit_fruits_orange_icon.svg'
        },
        {
            nom : 'ananas',
            img : 'images/iconfinder_4619624_food_fruit_fruits_pineapple_icon.svg'
        },
        {
            nom : 'pomme',
            img : 'images/iconfinder_4619641_apple_food_fruit_fruits_icon.svg'
        },
        {
            nom : 'pasteque',
            img : 'images/iconfinder_4619635_food_fruit_fruits_watermelon_icon.svg'
        },
        {
            nom : 'fraise',
            img : 'images/iconfinder_4619627_food_fruit_fruits_strawberry_icon.svg'
        },
        {
            nom : 'noix_de_coco',
            img : 'images/iconfinder_4619626_coconut_food_fruit_fruits_summer_icon.svg'
        }

    ]
    cartonArray.sort(() =>0.5-Math.random());   //tirer l'array en aléatoire : descendant ou ascendant
    const jeu = document.querySelector('.content-jeu');
    const resultatAffiche = document.querySelector('#resultat');
    let cartonSelectionneNom = [];
    let cartonSelectionneId = [];
    let cartonGangne = [];
    var run = false;   //indicateur pour démarrer et arrêter le timer.
    var isFirstClick = true; //uniquement un premier clic pour démarrer le timer.
    var time = 0;   //initialiser un temps
    const  tempsAffiche = document.querySelector('#temps');
    //créer une espace de jeu
    function creerJeu (){
        for(let i =0; i<cartonArray.length;i++)
        {
            const carton = document.createElement('img');
            carton.setAttribute('src','images/iconfinder_1222712_blank_bookmark_favorites_link_star_icon_128px.png');
            carton.setAttribute('data-id', i);
            carton.addEventListener('click', ouvrirCarton);
            carton.addEventListener('click', depart );
            jeu.appendChild(carton);
        }
    }
    function depart(){
        if(!run && isFirstClick )
        {
            run=true;
            isFirstClick = false;              
            increment();
        }
    }
    function increment(){
        if(run)
        {
            setTimeout(function(){
            time++;
            var mins = Math.floor(time/60);   //calculer un nombre de minute (integer) en divisant par 60 secondes (round down)
            if(mins<10)
            {
                mins = "0"+mins;
            }
            var secs = Math.floor(time%60);   //calculer un nombre de seconde : le reste de modular de 60 secondes
            if(secs<10)
            {
                secs = "0"+secs;
            }
            tempsAffiche.textContent = mins+":"+secs;
            increment();   //recursive afin de s'écouler le timer.
            },1000);   //la function appellé après 1 seconde ; 1000 => 1000 millisecondes = 1 seconde
        }
    }

    function ouvrirCarton(){
        let cartonId = this.getAttribute('data-id');
        cartonSelectionneNom.push(cartonArray[cartonId].nom);
        cartonSelectionneId.push(cartonId);
        this.setAttribute('src',cartonArray[cartonId].img);
        if(cartonSelectionneNom.length==2)
        {
            setTimeout(verifierMatch,500);
        } 
    }

    function verifierMatch(){
        const cartons = document.querySelectorAll('.content-jeu img');
        let option1Id = cartonSelectionneId[0];
        let option2Id = cartonSelectionneId[1];
        if(option1Id==option2Id)
        {
            cartons[option1Id].setAttribute('src','images/iconfinder_1222712_blank_bookmark_favorites_link_star_icon_128px.png');
            cartons[option2Id].setAttribute('src','images/iconfinder_1222712_blank_bookmark_favorites_link_star_icon_128px.png');
            alert('Vous choisissez deux mêmes images');
        }
        else if(cartonSelectionneNom[0]==cartonSelectionneNom[1])
        {
            alert('Vous trouvez un match!');
            cartons[option1Id].setAttribute('src','images/iconfinder_299110_check_sign_icon.svg');
            cartons[option2Id].setAttribute('src','images/iconfinder_299110_check_sign_icon.svg');
            cartons[option1Id].removeEventListener('click',ouvrirCarton);
            cartons[option2Id].removeEventListener('click',ouvrirCarton);
            cartonGangne.push(cartonSelectionneNom);
        }
        else
        {
            alert('Désolé, essayez encore.');
            cartons[option1Id].setAttribute('src','images/iconfinder_1222712_blank_bookmark_favorites_link_star_icon_128px.png');
            cartons[option2Id].setAttribute('src', 'images/iconfinder_1222712_blank_bookmark_favorites_link_star_icon_128px.png');
        }
        cartonSelectionneNom=[];
        cartonSelectionneId=[];
        resultatAffiche.textContent = cartonGangne.length;
        if(cartonGangne.length==cartonArray.length/2)
        {
            run = false;   //arrêter le timer
            resultatAffiche.textContent='Félicitations vous trouvez tout!';

        }   
    }
    creerJeu();
})