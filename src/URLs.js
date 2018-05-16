//path = 'http://10.0.0.7/Server/public'
path = 'http://10.0.0.20/Akilco/public/api';
path = 'http://172.20.10.5/Akilco/public/api';

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

    edit_order(id){
        url = path + '/editOrderinfo/' + id;
        return url;
    },

    show_preorder(id){
        url = path + '/preorder/'+id;
        return url;
    },

    show_order_info(id){
        url = path + '/orderinfo/'+id;
        return url;
    },

    delete_preorder(id){
        url = path + '/preorder/'+id;
        return url;
    },

    delete_order_info(id){
        url = path + '/orderinfo/'+id;
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
    },

    assign_client(){
        url = path + '/assignClient/table';
        return url;
    },

    remove_client(id){
        url = path + '/removeClient/'+id+'/table';
        return url;
    },

    show_user(id){
        url = path + '/user/'+id;
        return url;
    },

    send_order(){
        url = path + '/order';
        return url;
    },

    getWaiterTables(user_id,restaurant_id){
        url = path + '/waiter/'+user_id+'/tables/'+restaurant_id+'/restaurant';
        return url;
    },

    getWaiterOrders(user_id,restaurant_id){
        url = path + '/waiter/'+user_id+'/orders/'+restaurant_id+'/restaurant';
        return url;
    },

    getWaiterActiveOrders(user_id,restaurant_id){
        url = path + '/waiter/'+user_id+'/activeOrders/'+restaurant_id+'/restaurant';
        return url;
    },

    getWaiterSentOrders(user_id,restaurant_id){
        url = path + '/waiter/'+user_id+'/sentOrders/'+restaurant_id+'/restaurant';
        return url;
    },

    getWaiterReadyOrders(user_id,restaurant_id){
        url = path + '/waiter/'+user_id+'/readyOrders/'+restaurant_id+'/restaurant';
        return url;
    },

    getWaiterRequests(user_id,restaurant_id){
        url = path + '/waiter/'+user_id+'/activeAsks/'+restaurant_id+'/restaurant';
        return url;
    },

    getWaiterOnTableOrders(user_id,restaurant_id){
        url = path + '/waiter/'+user_id+'/onTableOrders/'+restaurant_id+'/restaurant';
        return url;
    },

    getOrderInfo(id){
        url = path + '/order/'+id+'/orderinfo';
        return url;
    },

    approveOrder(id){
        url = path + '/approve/'+id+'/order';
        return url;
    },

    pickOrder(id){
        url = path + '/pick/'+id+'/order';
        return url;
    },

    cookedOrder(id){
        url = path + '/cooked/'+id+'/order';
        return url;
    },

    doneOrder(id){
        url = path + '/done/'+id+'/order';
        return url;
    },

    waiterNotifications(user_id,restaurant_id){
        url = path + '/waiter/'+user_id+'/notifications/'+restaurant_id+'/restaurant'
        return url;
    },

    send_ask(){
        url = path + '/ask';
        return url;
    },

    do_ask(id){
        url= path + '/do/'+id+'/ask';
        return url;
    },

    getCookingOrders(id){
        url= path + '/restaurant/'+id+'/cookingOrders';
        return url;
    },
}




module.exports = urls;