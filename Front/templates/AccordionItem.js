const AccordionItem = ( item ) => {
    
    const view = `
        <div id="${item.id}" key="${item.id}" class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingOne" key="${item.id}">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${item.id}" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
            ${item.name}
        </button>
        </h2>
        <div id="panelsStayOpen-collapse${item.id}" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
        <div class="accordion-body">
            <strong>This is the first item's accordion body.</strong></div>
        </div>
        </div> 
    `

    return view
}

export default AccordionItem