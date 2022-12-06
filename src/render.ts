import { addEvent } from './index'

export interface dataType {
  createdAt: string;
  updatedAt: string;
  id: string;
  done: boolean;
  title: string;
}

export const render = (data : dataType[]) => {
  // rootElement
  const listWrap = <HTMLDivElement>document.querySelector('.todo_list_wrap');
  
  const time:number = 3240 * 10000;
  if(data){
    listWrap.innerHTML = (
      data.map((e: dataType) => {
        let createDate:string = new Date(+ new Date(e.createdAt) + time).toISOString().replace('T', ' ').replace(/\..*/, '');
        let updateDate:string = new Date(+ new Date(e.updatedAt) + time).toISOString().replace('T', ' ').replace(/\..*/, '');
        return (
          `
            <ul class="todo_list ${e.done === true ? 'chk' : ''}" id="${e.id}" >
                <li class="check_list"><input class="check_inp" id="${'crk'+e.id}" type="checkbox" ${e.done === true ? 'checked' : ''}></li>
                <li class="drag_handler_list"><div class="drag_handler"></div></li>
                <li class="title_inp_list"><input class="title_inp" id="${'inp'+e.id}" type="text" value="${e.title}" ${e.done === true ? 'readonly' : ''} /></li>
                <li class="date_list">${createDate === updateDate ? createDate + `<span class="cre_date">작성</span>` : updateDate + `<span class=${e.done === true ? "comp_date" : "udt_date"}>${e.done === true ? '완료' : '수정'}</span>`} </li>
                <li class="del_btn_list"><button class="del_btn"></button></li>
            </ul>
          `
        )
      }).join('')
    )
  }
  
  addEvent()
}