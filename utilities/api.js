var api = {
    getRestaurants(){
        var url = 'http://localhost/api/ResNames';
        return fetch(url).then((res) => res.json());
    }
};

module.exports = api;