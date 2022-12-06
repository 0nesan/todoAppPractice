import { getData } from './fatchAPI'
import { render, dataType } from './render'
import { stateMsg } from './stateMsg'
import { loadingStart, loadingEnd } from './loading'
import Sortable from 'sortablejs';
import '../scss/index.scss'
import '../scss/loading.scss'

// 전체 TODO DATA 렌더
const Render = async (type?:HTMLButtonElement):Promise<void> => {
  let data = await getData();

  switch(type){
    case comBtn : 
      let comData = data.filter((v:dataType) => v.done === true);
      render(comData)
      break;
    case inComBtn :
      let inComData = data.filter((v:dataType) => v.done === false);
      render(inComData)
      break;
    case creTimeBtn :
      let creTimeData = data.sort((a:any, b:any) => a.createdAt.replace(/[^0-9]/g,'') - b.createdAt.replace(/[^0-9]/g,''))
      render(creTimeData)
      break;
    case editTimeBtn :
      let editTimeData = data.sort((a:any, b:any) => a.updatedAt.replace(/[^0-9]/g,'') - b.updatedAt.replace(/[^0-9]/g,''))
      render(editTimeData)
      break;
    default:
      render(data);
  }
  return
}

// 초기 랜더
Render();

// TODO LIST 추가
const createList = async ():Promise<void> => {
  const inputVal = (<HTMLInputElement>document.querySelector('.push_inp')).value;
  const body = JSON.stringify({ title: inputVal.trim() });

  if (inputVal !== '') {
    try {
      loadingStart();
      await getData('POST', body, '');
      Render();
      loadingEnd();
      stateMsg('create');
    } catch {
      loadingEnd();
      stateMsg('createErr')
    }
  };

  (<HTMLInputElement>document.querySelector('.push_inp')).value = '';
  return
};

// TODO LIST 삭제
const deleteList = async(e:any):Promise<void> => {
  try{
    loadingStart();
    const idVal:string = e.target.parentNode.parentNode.getAttribute('id');
    await getData('DELETE', '', idVal);
    Render();
    loadingEnd();
    stateMsg('delete')
  }catch(err){
    loadingEnd();
    stateMsg('deleteErr')
  }
  return
};

// COMPLETED TODO LIST 전체 삭제
const deleteCpmpList = async ():Promise<void> => {
  let data = await getData();
  let delData = data.filter((e:dataType) => e.done === true )

  if(delData.length !== 0 ){
    try{
      loadingStart();
      for(let x of delData){
          await getData('DELETE', '', x.id);
      }
      loadingEnd();
      stateMsg('deleteComp')
    }catch{
      loadingEnd();
      stateMsg('deleteCompErr')
    }

    allSlectBtn.checked = false;
    Render(); 
  }
  return
}

// TODO LIST 수정 
const editList = async (e:any):Promise<void> => {
  const idVal:string = e.target.parentNode.parentNode.getAttribute('id');
  const todoTitle = (<HTMLInputElement>document.getElementById(`${'inp'+idVal}`)).value;
  const todoDone = (<HTMLInputElement>document.getElementById(`${'crk'+idVal}`)).checked;
  const body = JSON.stringify({ 
    title: todoTitle.trim(),
    done : todoDone
  });
  try{
    loadingStart();
    await getData('PUT', body, idVal);
    Render();
    loadingEnd();
    stateMsg('update')
  }catch{
    loadingEnd();
    stateMsg('updateErr')
  }
  return
}

// TODO LIST 전체 완료/미완료 변경
const eidtDone = async ():Promise<void> => {
  let data = await getData();
  const checkBtn = document.querySelectorAll('.check_inp');

  try{
    loadingStart();
    for(let x of data){
      const body = JSON.stringify({ 
        title: x.title,
        done : allSlectBtn.checked
      });
      await getData('PUT', body, x.id);
    }
    Render();
    loadingEnd();
    stateMsg('compEditAll')
  }catch{
    loadingEnd();
    stateMsg('compEditAllErr')
  }

  checkBtn.forEach((e) =>{
    allSlectBtn.checked ? e.setAttribute('checked','') : e.removeAttribute('checked');
  })
  return 
}

// DRAG & DROP 및 순서 변경
const listWrap = <HTMLDivElement>document.querySelector('.todo_list_wrap');
new Sortable (listWrap, {
  animation:100,
  handle:'.drag_handler'
});

const todoOrderChg = async(e:any):Promise<void> =>{
  let idList:any = [];

  e.forEach((e : any) => {
    idList.push(e.parentNode.parentNode.getAttribute('id'))
  })

  const body = JSON.stringify({ 
    todoIds : idList
  });
  
  try{
    loadingStart();
    await getData('PUT', body, 'reorder');
    loadingEnd();
    stateMsg('orderChg')
  }catch{
    loadingEnd();
    stateMsg('orderChgErr')
  }
  return
}

// 추가 버튼, 인풋
const crtBtn = <HTMLButtonElement>document.querySelector('header button');
const input = <HTMLInputElement>document.querySelector('.push_inp');

// 정렬 관련 버튼
const allSlectBtn = <HTMLInputElement>document.querySelector('#all_select');
const allDelBtn = <HTMLButtonElement>document.querySelector('.all_del_btn');
const defBtn = <HTMLButtonElement>document.querySelector('.dafalt_btn');
const comBtn = <HTMLButtonElement>document.querySelector('.completed_btn');
const inComBtn = <HTMLButtonElement>document.querySelector('.incompleted_btn');
const creTimeBtn = <HTMLButtonElement>document.querySelector('.cre_time_btn');
const editTimeBtn = <HTMLButtonElement>document.querySelector('.edit_time_btn');
const btnGroup = [defBtn, comBtn, inComBtn, creTimeBtn, editTimeBtn]

// 이벤트 리스너
crtBtn.addEventListener('click', createList)
input.addEventListener('keydown', (e:KeyboardEvent) => {
  if(e.key === 'Enter') createList()
});
allSlectBtn.addEventListener('click', eidtDone);
allDelBtn.addEventListener('click', deleteCpmpList);
btnGroup.forEach((e:HTMLButtonElement) => {
  e.addEventListener('click', () => {
    btnGroup.forEach((e:HTMLButtonElement) => {
      e.classList.remove('chk')
    });
    Render(e);
    e.classList.add('chk');
  })
})

// 랜더 후 추가 이벤트 리스너
const addEvent = () => {
  // 요소
  let delBtn = document.querySelectorAll('.del_btn');
  const todoTitle = document.querySelectorAll('.title_inp');
  const todoCheckBox = document.querySelectorAll('.check_inp');
  let todoList = document.querySelectorAll('.todo_list')

  // 이벤트 리스너
  delBtn.forEach(e => {
    e.addEventListener('click', deleteList)
  });
  todoTitle.forEach(e => {
    e.addEventListener('change', editList)
  })
  todoCheckBox.forEach(e => {
    e.addEventListener('click', editList)
  })
  todoList.forEach((e:Element) => {
    e.addEventListener('dragend', () =>{
      let todoListId = document.querySelectorAll('.title_inp');
      todoOrderChg(todoListId);
    })
  })
}

export { Render, editList, deleteList, todoOrderChg, addEvent }