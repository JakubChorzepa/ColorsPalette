class Model {
    constructor(){
        this.colors = [
            {
                id: 1,
                colorHex: '#9EE9E4',
                isLocked: false,
            },
            {
                id: 2,
                colorHex: '#FDD4CF',
                isLocked: false,
            },
            {
                id: 3,
                colorHex: '#01928C',
                isLocked: false,
            },
            {
                id: 4,
                colorHex: '#DFFF48',
                isLocked: false,
            }
        ];
    }
    generateColors(newColors){
        this.colors = this.colors.map(color =>{
            color.isLocked ? color : { id: color.id, colorHex: newColors[color.id - 1], isLocked: color.isLocked };
        });
    }
    lockColor(id){
        this.colors = this.colors.map((color) => {
            color.id === id ? {id: color.id, colorHex: color.colorHex, isLocked: !color.isLocked} : color;
        });
    }
    printColors(){
        console.log(this.colors);
    }
}

export default Model;