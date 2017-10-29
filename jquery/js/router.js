/**
 * Created by zhenxin on 2017/10/2.
 */

  /*
  {
     path:'',
     name:'',
     fn:function(){}
  }

    new Router({
       path:'/:filter',
       fn:function(filter){

       }
    })

   */

  var Router = (function () {
     function Router(_option) {
         this.obody = document.getElementsByTagName('body')[0];
         this.option = _option;
         this.init();
     }
     Router.prototype = {

         init: function () {
             var _this = this;
             this.obody.onhashchange = function () {
                 var hash = location.hash;
                 hash = hash.substr(1,hash.length);
                 _this.listenchange(hash);
             }
         },

         listenchange: function (_hash) {
             var current = _hash.substr(1,_hash.length);
             this.option.fn(current);
         }
     }
     return Router;
  }())

