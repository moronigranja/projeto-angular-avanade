interface Idioma {
    code : string;
    name : string;
    native : string;
}

interface Localdetalhes {
    geoname_id : number;
    capital : string;
    languages : Idioma[];
    country_flag : string;
    country_flag_emoji : string;
    country_flag_emoji_unicode : string;
    calling_code : string;
    is_eu : false;
}

export interface Local {
    ip : string;
    hostname : string;
    type : string;
    continent_code : string;
    continent_name : string;
    country_code : string;
    country_name : string;
    region_code : string;
    region_name : string;
    city : string;
    zip : string;
    latitude : number;
    longitude : number;
    location: Localdetalhes;
}
