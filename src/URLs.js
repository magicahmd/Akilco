//path = 'http://10.0.0.7/Server/public'
path = 'http://10.0.0.7/Akilco/public/api';
//path = 'http://172.20.10.5/Akilco/public/api';

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

    add_preorder(){
        url = path + '/addPreOrder';
        return url;
    },

    getDishSizes(id){
        url = path + '/Dish/'+id+'/sizes';
        return url;
    },
    
    getPreorderList(user_id, restaurant_id){
        url = path + '/user/'+user_id+"/restaurant/"+restaurant_id+"/preorders";
        return url;
    },

    edit_preorder(id){
        url = path + '/editPreOrder/' + id;
        return url;
    },

    show_preorder(id){
        url = path + '/preorder/'+id;
        return url;
    },

    delete_preorder(id){
        url = path + '/preorder/'+id;
        return url;
    },

    delete_table(id){
        url = path + '/tables/'+id;
        return url;
    },

    add_table(){
        url = path + '/tables';
        return url;
    },

    assign_waiter(id){
        url = path + '/assignWaiter/'+id+'/table';
        return url;
    },

    getRestaurantTablesCounter(id){
        url = path + '/restaurant/'+id+'/tablesCounter';
        return url;
    }

}




module.exports = urls;