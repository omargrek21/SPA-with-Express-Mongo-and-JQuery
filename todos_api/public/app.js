/*global $*/

$(document).ready(function(){
    $.getJSON('/api/todos')
    .done(displayTodos)
    .fail(handleError);
    
    $('#todoInput').keypress(function(event){
        if(event.which === 13){
            addTodo();
        }
    });
    
    $('.list').on('click', 'li', function(){
        updateTodo($(this));
    });
    
    $('.list').on('click', 'span', function(ev){
        ev.stopPropagation();
        removeTodo($(this).parent());
    });
});

function displayTodos(data){
    data.forEach(todo => {
        appendTodo(todo);
    });
}

function addTodo(){
    let data = $('#todoInput').val();
    if(data){
        $.post('/api/todos',{name: data})
        .done(function(newTodo){
            appendTodo(newTodo);
            $('#todoInput').val('');
        })
        .fail(handleError);
    }
}

function removeTodo(todo){
    let clickedId = todo.data('id');
    let deleteUrl = '/api/todos/' + clickedId;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl 
    })
    .done(function(response){
        todo.remove();
    })
    .fail(handleError);
}

function updateTodo(todo){
    let updateUrl = 'api/todos/' + todo.data('id');
    $.ajax({
      method: 'PUT',
      url: updateUrl,
      data: {completed: !todo.data('completed')}
    })
    .done(function(updatedTodo){
        todo.toggleClass('done');
        todo.data('completed', updatedTodo.completed);
    })
    .fail(handleError);
}

function appendTodo(todo){
    let newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if(todo.completed){
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);
}

function handleError(err){
    console.log("error: ", err);
}