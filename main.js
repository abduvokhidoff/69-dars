import pokemons from "./pokemons.js";

let wrapper = document.querySelector('.wrapper');
let select = document.querySelector('.slc');
let input = document.querySelector('.search')
let button = document.querySelector('.btn')
let button1 = document.querySelector('.btn1')
let button2 = document.querySelector('.btn2')


const ReadSelect = () => {
    let uniqueTypes = new Set();

    pokemons.forEach((v) => {
        uniqueTypes.add(v.type[0]);
    });
    uniqueTypes.forEach((type) => {
        let option = document.createElement('option');
        option.innerHTML = type;
        select.appendChild(option);
    });
};

ReadSelect();


const ReadFunction = (baza = pokemons) => {
    wrapper.innerHTML = '';

    baza.forEach((v) => {
        let div = document.createElement('div');
        div.classList.add('flex', 'flex-col',  'w-[19%]', 'h-[388px]',  'bg-[#FFFF00]', 'rounded-[10px]');
        div.innerHTML = `
            <div class="flex items-center justify-end ">
                <div class="flex items-center justify-center bg-[#FF0000] rounded-tr-[10px] px-[5px] py-[5px]">
                    <p class="text-[white] font-[Roboto] font-[800] text-[15.5px]">${v.num}</p>
                </div>
            </div>
            <div class="flex items-center flex-col gap-[18px]">
                <h3 class="text-[#212529] font-[Roboto] text-[20px] font-[900]">${v.name}</h3>
                <img src="${v.img}" alt="${v.name}">
                <div class="px-[5px] py-[10px] rounded-[20px] bg-[#C4E4FF]">
                    <h4 class="font-[Roboto] text-[20px] font-[400] text-[#212529]">${v.type}</h4>
                </div>
            </div>
            <div class="mt-[16px] flex items-center flex-col gap-[0]">
                <p class="font-[Roboto] text-[#212529] font-[700]">Candy count: ${v.candy_count || 'N/A'}</p>
                <p class="font-[Roboto] text-[#212529] font-[700]">${v.weight}</p> 
                <p class="font-[Roboto] text-[#80007C] font-[900] text-[14px]">${v.weaknesses}</p>
            </div>
            <div class="flex items-end justify-start">
                <div class="bg-[#00FFFF] rounded-bl-[10px] px-[5px] py-[5px]">
                    <p class="text-[black] font-[Roboto] font-[800] text-[15.75px]">${v.spawn_time}</p>
                </div>
            </div>
        `;
        wrapper.appendChild(div);
    });

    
    
}

ReadFunction();

const SearcheFunction = () => {
    let inputvalue = input.value.trim().toLowerCase()
    let filteredtitle = pokemons.filter((v) => {
        return v.name.trim().toLowerCase().includes(inputvalue)
    })

    if(filteredtitle.length > 0){
        ReadFunction(filteredtitle)
    }
    else{
        ReadFunction()
    }
}
const SelectFunction = () => {
    let selectvalue = select.value.trim().toLowerCase()
    let filteredtype = pokemons.filter((v) => {
        return v.type.some(type => type.toLowerCase() === selectvalue);
    })
    if(filteredtype.length > 0){
        ReadFunction(filteredtype)
    } 
    else{
        ReadFunction()
    }
}

select.addEventListener('change', () => {
    SelectFunction()
})

 
const SortFunction = () => {
    let selectvalue = select.value.trim().toLowerCase()
    let filteredtype = pokemons.filter((v) => {
        return v.type.some(type => type.toLowerCase() === selectvalue);
    })
    if(filteredtype.length > 0){
        filteredtype.sort((i,v) => parseFloat(i.weight) - parseFloat(v.weight))
        ReadFunction(filteredtype)
    }
    else{
        pokemons.sort((i,v) => parseFloat(i.weight) - parseFloat(v.weight))
        ReadFunction()
    }
}

button1.addEventListener('click', () => {
SortFunction()
})

button2.addEventListener('click', () => {
    input.value =''
    select.value = ''
    ReadFunction()
})

button.addEventListener('click', () => {
    SearcheFunction()
})






