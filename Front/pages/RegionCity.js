import AccordionItem from "../templates/AccordionItem.js";
import region from "../utils/handleRegions.js";
import CreateRegionModal from "../templates/CreateRegionModal.js";

const RegionCity = async () => {

    let section = document.createElement('section');
    section.classList.add('regions-table' , 'col-9');

    const regions = await region.getAllRegions();

    const openModal = (e,title) => {     
        
        const h2 = document.querySelector('.title-modal');

        if (e.target.tagName === 'BUTTON') {
            h2.textContent = title === 'pais' ? `Nuevo ${title}` : `Nueva ${title}`;
            document.querySelector('#name').value = ''
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
        <div class="accordion" id="accordionPanelsStayOpenExample">
        </div>       
    `;

    section.innerHTML = view;
    regions.data.map( region => section.children[1].appendChild(AccordionItem( region , openModal ))); // Create each region item, pass openModal to execute by clicking edit button 

    const createRegionButton = document.createElement('button');
    createRegionButton.textContent = 'Agregar región';
    createRegionButton.classList.add('add-button');
    createRegionButton.onclick = (e) => openModal( e , 'region' );

    section.children[0].insertBefore(createRegionButton, section.children[0].children[1]);
    section.appendChild(CreateRegionModal());

    return section
}

export default RegionCity