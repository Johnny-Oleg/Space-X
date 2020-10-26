export default class FetchData {
    URL = 'https://api.spacexdata.com/v4/';

    getResource = async url => {
        const res = await fetch(url);

        if(!res.ok) throw new Error(`Error: ${res.status}`);

        return await res.json();
    };

    getRocket = async () => await this.getResource(`${this.URL}rockets`);

    getLaunches = async () => await this.getResource(`${this.URL}launches/past`);

    getCompany = async () => await this.getResource(`${this.URL}company`);
};