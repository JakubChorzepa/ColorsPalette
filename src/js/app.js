const generateButton = document.querySelector('.generate');
const lockButton = document.querySelectorAll('.lock');
const boxes = document.querySelectorAll('.box');
const copyButton = document.querySelectorAll('.copy');
const hexText = document.querySelectorAll('.hex-text');
const libraryButton = document.querySelector('.library');
const closeLibrary = document.querySelector('.close-library');
const saveButton = document.querySelector('.save');
const closeSave = document.querySelector('.close-save');

const randomHexColor = () =>{
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
const blackOrWhite = (hex) =>{
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    if ((r*0.299 + g*0.587 + b*0.114) > 186) return '#000'; else return '#fff';
}
const setColors = () =>{
    boxes.forEach( box =>{
        const lock = box.getAttribute('lock');
        if(lock == 'unlocked'){
            const color = randomHexColor();
            const text = box.querySelector('p');
            box.style.background = color;
            text.innerHTML = color;
            box.style.color = blackOrWhite(color);
        }
        else {}
    });
}

const setTheLock = () =>{
    lockButton.forEach((lock,index) =>{
        let isLocked = false;
        lock.addEventListener('click',()=>{
            if(isLocked==false) {
                lock.name = 'lock-closed-outline';
                isLocked = true;
                boxes[index].setAttribute('lock','locked');
            }
            else{
                lock.name = 'lock-open-outline';
                isLocked = false;
                boxes[index].setAttribute('lock','unlocked');
            }
        });
    });
}
const copyToClipboard = () =>{
    copyButton.forEach((copy,index)=>{
        copy.addEventListener('click',()=>{
            const text = hexText[index].innerText;
            const elem = document.createElement("textarea");
            elem.value = text;
            document.body.appendChild(elem);
            elem.select();
            document.execCommand("copy");
            document.body.removeChild(elem);
        });
    });
}
const library = () =>{
    libraryButton.addEventListener('click', ()=>{
        document.querySelector('.library-parent').style.opacity = '1';
        document.querySelector('.library-parent').style.visibility = 'visible';
        document.querySelector('.container').style.opacity = '0.7';
        document.querySelector('.container').style.pointerEvents = 'none';
    });
    closeLibrary.addEventListener('click', ()=>{
        document.querySelector('.library-parent').style.opacity = '0';
        document.querySelector('.library-parent').style.visibility = 'hidden';
        document.querySelector('.container').style.opacity = '1';
        document.querySelector('.container').style.pointerEvents = 'all';
    });
}
const savePalette = () =>{
    saveButton.addEventListener('click', ()=>{
        document.querySelector('.save-parent').style.opacity = '1';
        document.querySelector('.save-parent').style.visibility = 'visible';
        document.querySelector('.container').style.opacity = '0.7';
        document.querySelector('.container').style.pointerEvents = 'none';
    });
    closeSave.addEventListener('click', ()=>{
        document.querySelector('.save-parent').style.opacity = '0';
        document.querySelector('.save-parent').style.visibility = 'hidden';
        document.querySelector('.container').style.opacity = '1';
        document.querySelector('.container').style.pointerEvents = 'all';
    });
    const save = () =>{
        const name = document.querySelector('.palette-name').value;
        const library = document.querySelector('.library-parent');
        const set = document.createElement('div');
        const colors = [];
        const locks = [];
        document.querySelector('.save-parent').style.opacity = '0';
        document.querySelector('.save-parent').style.visibility = 'hidden';
        document.querySelector('.container').style.opacity = '1';
        document.querySelector('.container').style.pointerEvents = 'all';

        hexText.forEach(hex=>{
            colors.push(hex.innerText);
        });
        boxes.forEach(box=>{
            locks.push(box.getAttribute('lock'));
        });


        set.classList.add('set');
        set.innerHTML =
        `
        <div class="name">${name}</div>
        <div class="colors" class="colors">
            <div class="saved-color" style="background-color:${colors[0]}" lock="${locks[0]}"></div>
            <div class="saved-color" style="background-color:${colors[1]}" lock="${locks[1]}"></div>
            <div class="saved-color" style="background-color:${colors[2]}" lock="${locks[2]}"></div>
            <div class="saved-color" style="background-color:${colors[3]}" lock="${locks[3]}"></div>
        </div>
        <div class="select">Select</div>
        `;
        library.appendChild(set);
        selectPalletteToLoad();
    };

    document.querySelector('.save-palette').addEventListener('click',()=>{
        save();
    });
    document.querySelector('input').addEventListener('keypress',(e)=>{
        if(e.key === 'Enter'){
            e.preventDefault();
            save();
        }
    });

}
const selectPalletteToLoad = () =>{
    const select = document.querySelectorAll('.select');
    const savedColorsSet = document.querySelectorAll('.colors');
    select.forEach((selection,index) =>{
        selection.addEventListener('click', ()=>{
            const colors = savedColorsSet[index];
            loadSelectedColors(colors);
        });
    });
}
const loadSelectedColors = (colors) =>{
    const colorsToLoad = [];
    colors.querySelectorAll('.saved-color').forEach(savedColor =>{
        colorsToLoad.push(savedColor.style.backgroundColor);
    });
    boxes.forEach((box,index) =>{
        box.style.backgroundColor = colorsToLoad[index];
    });
}
document.addEventListener('DOMContentLoaded',()=>{
    setColors();
    setTheLock();
    copyToClipboard();
    library();
    savePalette();
    generateButton.addEventListener('click',()=>{
        setColors(boxes);
    });
});

