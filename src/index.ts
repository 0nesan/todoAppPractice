import { Render, createList, eidtDone, deleteCpmpList  } from './main' 
import '../scss/index.scss'
import '../scss/loading.scss'

const firstRender = () => {
  const root = <HTMLDivElement>document.querySelector('.app');
  root.innerHTML = `
    <header>
      <h1>ToDoooo !!</h1>

      <div>
        <input class="push_inp" type="text" placeholder="일정을 입력해주세요.">
        <button></button>
      </div>
    </header>

    <main>
      <ul class="sort_btns">
        <li>
          <input type="checkbox" id="all_select">
        </li>
        <li class="dafalt_list">
          <button class="dafalt_btn btns chk">지정 순서</button>
        </li>
        <li class="completed_list">
          <button class="completed_btn btns">완료</button>
        </li>
        <li class="incompleted_list">
          <button class="incompleted_btn btns">미완료</button>
        </li>
        <li class="cre_time_list">
          <button class="cre_time_btn btns">작성일</button>
        </li>
        <li class="edit_time_list">
          <button class="edit_time_btn btns">수정일</button>
        </li>
        <li class="all_del_list">
          <button class="all_del_btn btns">완료 TODO 전체삭제</button>
        </li>
      </ul>

      <div class="todo_list_wrap"></div>
    </main>
  `

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

  crtBtn.addEventListener('click', createList)
  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') createList()
  });
  allSlectBtn.addEventListener('click', eidtDone);
  allDelBtn.addEventListener('click', deleteCpmpList);
  btnGroup.forEach((e: HTMLButtonElement) => {
    e.addEventListener('click', () => {
      btnGroup.forEach((e: HTMLButtonElement) => {
        e.classList.remove('chk')
      });
      Render(e);
      e.classList.add('chk');
    })
  })

  Render();
}
firstRender();