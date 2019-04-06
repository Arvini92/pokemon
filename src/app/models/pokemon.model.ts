export class Pokemon {
    // public name: string;
    // public id: string;
    // public types: string[];
    // public moves: string[];
    // public stats: string[];
    // public weight: string;
    // public height: string;
    // public abilities: string;
    // public category: string;
    // public gender: string;

  
    // constructor(
    //     name: string, 
    //     id: string, 
    //     types: [],
    //     moves: [],
    //     stats: [],
    //     weight: string,
    //     height: string,
    //     abilities: string,
    //     category: string,
    //     gender: string
    // ) {
    //   this.name = name;
    //   this.id = id;
    //   this.types = types;
    //   this.moves = moves;
    //   this.stats = stats;
    //   this.weight = weight;
    //   this.height = height;
    //   this.abilities = abilities;
    //   this.category = category;
    //   this.gender = gender;
    // }

    constructor(
        public name: string,
        public id: string,
        public types: string[],
        public moves: string[],
        public stats: any[],
        public weight: string,
        public height: string,
        public abilities: string[],
        // public category: string,
        // public gender: string
    ) {
       
    }
}