interface coord {
    lat : string;
    long : string;
}

interface weather{
    id : number;
    main : string;
    description : string;
    icon : string;
}

interface main{
    temp : number;
    feels_like : number;
    temp_min : number;
    temp_max : number;
    pressure : number;
    humidity : number;
}

export interface Clima {
    coord : coord;
    weather : weather[];
    base : string;
    main : main;
    visibility : number;
    timezone : number;
    id : number;
    name : string;
    cod : number;
}
