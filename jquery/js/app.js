/**
 * Created by zhenxin on 2017/9/27.
 */


$(function(){

    var KEY = 'ZZZX';
    var ENTER_KEY = 13;

    var todostore = {

        insert: function (val) {
            localStorage.setItem(KEY,JSON.stringify(val));
        },
        selectAll: function () {
            return JSON.parse(localStorage.getItem(KEY)) || [];
        }

    }


    var app = {

        init: function () {

            new Router({
                path:'/:filter',
                fn:function(_filter){
                    this.filter = _filter;
                    this.render(true);
                }.bind(this)
            })

            this.filter = 'all';
            this.todos = todostore.selectAll();

            this.bindEvents();
            this.render(true);
        },
        getfilterlist: function () {
            var list = this.todos;
            if(this.filter === 'all'){
                return list;
            }
            if(this.filter === 'active'){
                return list.filter(function (val) {
                    return !val.completed;
                });
            }
            if(this.filter === 'completed'){
                return list.filter(function (val) {
                    return val.completed;
                });
            }
        },
        render: function (flag) {
            var _this = this,
                list = this.getfilterlist();

            if(list.length <= 1 || flag){
                $('.todo-list').html('');
                $.each(list,function(i, item){

                    var template = _this.template(item);

                    if(i > 0){
                        $('.todo-list').children().first().before(template);
                    }else{
                        $('.todo-list').append(template);
                    }
                });
            }else{
                var item = list[list.length-1];
                var template = this.template(item);
                $('.todo-list').children().first().before(template);
            }

            this.total();
        },
        template: function (item) {
            var checked = item.completed ? 'checked' : '';
            return '<li>\
                    <span class="item-id">'+item.id+'</span>\
                    <input type="checkbox" class="finish" '+checked+'>\
                    <label>'+item.content+'</label>\
                    <button class="delete">&times;</button>\
                </li>';
        },

        bindEvents: function () {
            $('#new-text').on('keyup',this.create.bind(this));
            $('.finish-all').on('change', this.toggleAll.bind(this));
            $('.clear-finish').on('click', this.clearCompleted.bind(this));
            $('.buttons a').on('click', this.slideBorder.bind(this));
            $('.todo-list')
                .on('change', '.finish', this.complete.bind(this))
                .on('click', '.delete', this.destroy.bind(this));
        },
        clearCompleted: function (e) {
            this.todos = this.todos.filter(function (val) {
                return !val.completed;
            })
            this.render(true);
            todostore.insert(this.todos);
        },
        slideBorder: function (e) {
            var index = $(e.target).index();
            var $btn = $('.buttons').find('a');
            $btn.removeClass('active');
            $btn.eq(index).addClass('active');
        },
        complete: function (e) {

            var id = $(e.target).prev().html();

            $.each(this.todos, function (i, v) {
                if(v.id === +id){
                    v.completed = e.target.checked ? true : false;
                }
            })
            todostore.insert(this.todos);
            this.total();
        },
        toggleAll: function (e) {
            for(var i in this.todos){
                this.todos[i].completed = e.target.checked ? true : false;
            }
            this.render(true);
        },
        destroy: function (e) {
            var $li = $(e.target).parent(),
                id = +$li.find('.item-id').html();

            var i = this.getindex(id);
            this.todos.splice(i, 1);

            todostore.insert(this.todos);
            $li.slideUp('slow', function () {
                $(this).remove();
            });
            this.total();
        },
        getindex: function (id) {
            for(var i in this.todos){
                var item = this.todos[i];
                if(item.id === +id){
                    return i;
                }
            }
            return -1;
        },
        create: function (e) {
            var $input = $(e.target),
                val = $input.val().trim();

            if(e.keyCode !== ENTER_KEY || !val) {
                return;
            }

            this.todos.push({
                id: new Date().getTime(),
                content: val,
                completed: false
            });

            $input.val('');
            todostore.insert(this.todos);
            this.render();
        },
        total: function () {
            if(this.todos.length === 0){
                $('.center-main').hide();
                $('footer').hide();
            }else{
                $('.center-main').show();
                $('footer').show();
            }
            var total = this.todos.filter(function (val) {
                return !val.completed;
            })
            $('#total').html(total.length.toString(10));
        }

    }

    app.init();
})