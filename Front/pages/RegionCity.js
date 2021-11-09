import AccordionItem from "../templates/AccordionItem.js";
import region from "../utils/handleRegions.js";
import country from "../utils/handleCountries.js";
import city from "../utils/handleCities.js";

import CreateRegionModal from "../templates/CreateRegionModal.js";

const RegionCity = async () => {

    let section = document.createElement('section');
    section.classList.add('regions-table' , 'col-9');

    const [ regions , countries , cities ] = await Promise.all([region.getAll(), country.getAll() , city.getAll()]);    

    const openModal = ( e , title ) => {     

        const h2 = document.querySelector('.title-modal');

        if (e.target.tagName === 'BUTTON') {
            h2.textContent = title.includes('pais') || title.includes('país') ? `Nuevo ${title}` : `Nueva ${title}`;
            document.querySelector('#name').value = ''
            
            const parentID = e.target.parentNode.parentNode.parentNode.parentNode.id;
            h2.id = title.includes('pais') || title.includes('país') ? 'ncountry-' + parentID : 'ncity-' + parentID;
        } 

        else h2.textContent = title === 'pais' ? `Modificar ${title}` : `Modificar ${title}`;

        const modal = document.querySelector('.modal-user');
        modal.classList.add('visible');
        const closeModalButton = document.querySelector('.close-modal');
        closeModalButton.onclick = () => modal.classList.remove('visible');    
    }

    const view = `
        <div class=title-content>
            <h2 class="">Regiones</h2>
        </div>
        <div class="accordion mb-5" id="accordionPanelsStayOpenExample">
        </div>       
    `;

    const titleContent = ( title , textButton , textModal ) => {
        
        const div = document.createElement('div');
        div.classList.add('title-content' , 'section');

        const h3Title = document.createElement('h3');
        h3Title.textContent = title;

        const createButton = document.createElement('button');
        createButton.textContent = textButton;
        createButton.classList.add('add-button');
        createButton.onclick = (e) => openModal( e , textModal );

        div.appendChild(h3Title);
        div.appendChild(createButton);

        return div
    }

    section.innerHTML = view;
    const accordionContainer = section.children[1];
    let regionCounter = 0;
    regions.data.forEach( region  => {

        let countryCounter = 0; // Reset count, countries per region

        const countryHeader = titleContent( region.name , 'Agregar país' , `país en ${region.name}`);
        accordionContainer.appendChild(AccordionItem( region , openModal , "region" ));
        const countriesContainer = accordionContainer.children[regionCounter].children[1].children[0];
        countriesContainer.appendChild(countryHeader);

        countries.data.forEach ( country  => {

            if ( country.region_id === region.id ) {

                   
                countriesContainer.appendChild( AccordionItem( country , openModal , "country" ) ); 
                countryCounter++; 

                cities.data.forEach ( city => {
                    
                    if ( city.country_id === country.id) {
                    
                        const citiesContainer = countriesContainer.children[countryCounter].children[1].children[0];
                        citiesContainer.appendChild( AccordionItem( city , openModal , "city" ) );
                    }
            
                });
            };
        });
        regionCounter++;
    });

    const createRegionButton = document.createElement('button');
    createRegionButton.textContent = 'Agregar región';
    createRegionButton.classList.add('add-button');
    createRegionButton.onclick = (e) => openModal( e , 'región' );

    section.children[0].insertBefore(createRegionButton, section.children[0].children[1]);
    section.appendChild(CreateRegionModal());

    return section
}

export default RegionCity