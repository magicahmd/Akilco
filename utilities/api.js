var api = {
    getRestaurants(){
        var url = 'http://10.0.0.7/api/ResNames';
        return fetch(url).then((res) => res.json());
    }
};

module.exports = api;