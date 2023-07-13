/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de alimentos existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/alimentos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.alimentos.forEach(item => insertList(item.id,item.nome, item.energia, item.proteina, item.lipideo, item.carboidrato, item.grupo))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de Grupos existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getListGrupo = async () => {
  let url = 'http://127.0.0.1:5000/grupos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.grupos.forEach(item => insertListGrupo(item.id,item.nome))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na combobox de Grupos 
  --------------------------------------------------------------------------------------
*/
const insertListGrupo = (id,nome) => {
  var item = [id, nome]
  var combobox = document.getElementById('newGrupo'); 
  var el = document.createElement("option");
  el.textContent = nome;
  el.value = id;
  combobox.appendChild(el);
}

/*
  --------------------------------------------------------------------------------------
  Função para limpar o formulário
  --------------------------------------------------------------------------------------
*/
function limparForm(){
  document.getElementById("newNome").value = "";
  document.getElementById("newCaloria").value = "";
  document.getElementById("newProteina").value = "";
  document.getElementById("newLipideo").value = "";
  document.getElementById("newCarboidrato").value = "";
  document.getElementById("newGrupo").value = "";
}

/*
  --------------------------------------------------------------------------------------
  Chamada de funções para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
limparForm();
getListGrupo();

/*
  --------------------------------------------------------------------------------------
  Função para incluir um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputAlimento, inputCaloria, inputProteina, inputLipideo, inputCarboidrato, inputGrupo) => {
  const formData = new FormData();
  formData.append('nome', inputAlimento);
  formData.append('energia', inputCaloria);
  formData.append('proteina', inputProteina);
  formData.append('lipideo', inputLipideo);
  formData.append('carboidrato', inputCarboidrato);
  formData.append('grupo', inputGrupo);

  let url = 'http://127.0.0.1:5000/alimento';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
      return error;
    });
    return response.json().mesage;
}

/*
  --------------------------------------------------------------------------------------
  Função para atualizar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const updateItem = async (inputId, inputAlimento, inputCaloria, inputProteina, inputLipideo, inputCarboidrato, inputGrupo) => {
  const formData = new FormData();  
  formData.append('id', inputId);
  formData.append('nome', inputAlimento);
  formData.append('energia', inputCaloria);
  formData.append('proteina', inputProteina);
  formData.append('lipideo', inputLipideo);
  formData.append('carboidrato', inputCarboidrato);
  formData.append('grupo', inputGrupo);

  let url = 'http://127.0.0.1:5000/update_alimento';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
      return error;
    });
    return response.json().mesage;
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/alimento?id=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------------------------
  Função para adicionar ou atualizar um novo item com nome do alimento, caloria, proteina, lipideo, carboidrato e grupo
  --------------------------------------------------------------------------------------------------------
*/
const newItem = () => {  
  let inputId = document.getElementById("newid").value;
  let inputAlimento = document.getElementById("newNome").value;
  let inputCaloria = document.getElementById("newCaloria").value;
  let inputProteina = document.getElementById("newProteina").value;
  let inputLipideo = document.getElementById("newLipideo").value;
  let inputCarboidrato = document.getElementById("newCarboidrato").value;
  let inputGrupo = document.getElementById("newGrupo").value;
  let inputTipo = document.getElementById("newType").value;
  
  var msg = '';
  if (inputAlimento === '') {
    msg += "Escreva o nome do alimento!\n";    
  } 
  if (inputCaloria === '') {
    msg += "Escreva o valor da caloria!\n";    
  }else{
    if (isNaN(inputCaloria)) {
      msg += "Caloria precisa ser número!\n";
    }
  }
  if (inputProteina === '') {
    msg += "Escreva o valor da Proteína!\n";    
  }else{
    if (isNaN(inputProteina)) {
      msg += "Proteína precisa ser número!\n";
    }
  }
  if (inputLipideo === '') {
    msg += "Escreva o valor do Lipideo!\n";    
  }else{
    if (isNaN(inputLipideo)) {
      msg += "Lipideo precisa ser número!\n";
    }
  }
  if (inputCarboidrato === '') {
    msg += "Escreva o valor do Carboidrato!\n";    
  }else{
    if (isNaN(inputCarboidrato)) {
      msg += "Carboidrato precisa ser número!\n";
    }
  }
  if (inputGrupo==='') {
    msg += "Selecione um grupo!\n";
  }

  if(msg!=''){
    alert(msg);    
  }
  else
  { 
    if(inputTipo=='cadastrar'){
      postItem(inputAlimento, inputCaloria, inputProteina, inputLipideo, inputCarboidrato, inputGrupo);
      alert("Item adicionado!")
      location.reload();
    }else{ //atualizar
      updateItem(inputId,inputAlimento, inputCaloria, inputProteina, inputLipideo, inputCarboidrato, inputGrupo);
      alert("Item atualizado!")
      location.reload();
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (id,nome, caloria, proteina, lipideo, carboidrato, grupo) => {
  var item = [id, nome, caloria, proteina,lipideo,carboidrato,grupo]
  var table = document.getElementById('myTable');
  var row = table.insertRow();
  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newNome").value = "";
  document.getElementById("newCaloria").value = "";
  document.getElementById("newProteina").value = "";
  document.getElementById("newLipideo").value = "";
  document.getElementById("newCarboidrato").value = "";
  document.getElementById("newGrupo").value = "";
  removeElement()
}


/*
  --------------------------------------------------------------------------------------
  Bloco de funções feito em jQuery
  --------------------------------------------------------------------------------------
*/
jQuery(document).ready(function() {

  //variavel global para guardar o id do alimento que será excluido
  var idDel = 0;

  /*
  --------------------------------------------------------------------------------------
  Função para editar um item da lista de acordo com o click no botão update
  --------------------------------------------------------------------------------------
  */
  $('#myTable tbody').on('click', '.linkEdit', function () {
    var table = $('#myTable').DataTable();
    var tr = $(this).closest('tr');
    var data = table.row(tr).data();
    
    $("#newid").val(data.id);
    $("#newNome").val(data.nome);
    $("#newCaloria").val(data.energia);
    $("#newProteina").val(data.proteina);
    $("#newLipideo").val(data.lipideo);
    $("#newCarboidrato").val(data.carboidrato);        
    $('#newGrupo option:contains("'+data.grupo+'")').attr("selected", "selected");

    $("#butSubmit").text("atualizar");  
    $("#butSubmit").val("atualizar");    
    $("#newType").val("atualizar");    
    
    $("#divButCancelar").show();    
    
  });

  /*
  --------------------------------------------------------------------------------------
  Função para incluir ou atualizar um item de acordo com o click do mouse
  --------------------------------------------------------------------------------------
  */
  $('#butSubmit').click(function() {         
    newItem();      
  });

  /*
  --------------------------------------------------------------------------------------
  Função para cancelar o update
  --------------------------------------------------------------------------------------
  */
  $('#butCancelar').on('click', function () {	
    limparForm();
    $("#divButCancelar").hide(); 
    $("#butSubmit").text("cadastrar");  
    $("#newType").val("cadastrar");    
  });

  /*
  --------------------------------------------------------------------------------------
  Função para excluir 
  --------------------------------------------------------------------------------------
  */
  $('#myTable tbody').on('click', '.linkDelete', function () {				
    var table = $('#myTable').DataTable();
    var tr = $(this).closest('tr');
    var data = table.row(tr).data();
    idDel = data.id;   
    if (confirm("Você tem certeza que deseja excluir o alimento?")) {
      deleteItem(idDel);      
      alert("Alimento Removido!");            
      table.row( $(this).parents('tr') ).remove().draw();  
      idDel = 0;
    }
  });

  /*
  ----------------------------------------------------------------------------------------------
  Função para fazer uma requisição de alimentos por ajax via GET e preencher o objeto Datatable
  ----------------------------------------------------------------------------------------------
  */
  $.ajax({
    type: "GET",
    url: 'http://127.0.0.1:5000/alimentos',      
    success: function(result){
      $('#myTable').DataTable({       
          
        "ordering": true,
				"paging": true,
				"pagingType": "full_numbers",
				"pageLength": 10,
        "processing": true,				
        "aaData": result.alimentos,
        "columns": [                   
              { "data": 'id', title: "Id" },
              { "data": 'nome', title: "Nome" },
              { "data": 'energia', title: "Energia" },        
              { "data": 'proteina', title: "Proteina" },
              { "data": 'lipideo', title: "Lipideo" },
              { "data": 'carboidrato', title: "Carboidrato" },
              { "data": 'grupo', title: "Grupo" },

              {
                "data": "edit",						
                "bSearchable": false,
                "bSortable": false,
                "render": function (data, type, row) {							
                  return '<a href="#" class="linkEdit"><img src="img/pencil.png" width="15px" height="15px"></i></a>';
                  
                }
              },
              {
                "data": "delete",						
                "bSearchable": false,
                "bSortable": false,
                "render": function (data, type, row) {							
                  return '<a href="#" class="linkDelete"><img src="img/excluir.png" width="15px" height="15px"></i></a>';							
                }
              }              
        ]            
      });
    }
  });

});
