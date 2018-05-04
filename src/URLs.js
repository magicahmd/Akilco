//path = 'http://10.0.0.7/Server/public'
path = 'http://10.0.0.7/Akilco/public/api';

var urls={

    getRestaurantsList(){
        url = path + '/restaurants';
        return(url);
    },

    getRestaurantMenu(id){
        url = path + '/restaurant/'+id+'/menus';
        return(url);
    },

    getDishesList(id){
        url = path + '/menus/'+id+'/dishes';
        return(url);
    },

    //edit it
    getRestaurantTables(id){
        url = path + '/restaurant/'+id+'/tables';
        return(url);
    },

    //edit it
    getTable(id){
        url = path + '/tables/' +id;
        return(url);  
    },

    check_login(){
        url = path + '/logs';
        return(url);
    },

    getUserRoles(id){
        url = path + '/user/' + id + '/roles';
        return(url); 
    },

    sign_up(){
        url = path + '/user';
        return url;
    },

    add_List(){
        url = path + '/menus';
        return url;
    },

    delete_List(id){
        url = path + '/menus/' + id;
        return url;
    },

    getRestaurantManagers(id){
        url = path + '/restaurant/' + id + '/managers';
        return url;
    },

    getRestaurantWaiters(id){
        url = path + '/restaurant/' + id + '/waiters';
        return url;
    },
    getRestaurantChefs(id){
        url = path + '/restaurant/' + id + '/chefs';
        return url;
    },
}




module.exports = urls;